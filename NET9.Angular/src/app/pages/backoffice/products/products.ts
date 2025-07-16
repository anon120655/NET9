import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductService, Product, Pager } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: Product[] = [];
  pager: Pager | null = null;
  currentPage = 1;
  pageSize = 10;
  loading = false;

  constructor(private productService: ProductService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('สินค้าทั้งหมด');
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;

    this.productService.getPagedProducts(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.products = response.items;
        this.pager = response.pager;
        this.loading = false;
      },
      error: (err) => {
        console.error('เกิดข้อผิดพลาดในการโหลดสินค้า', err);
        this.loading = false;
      }
    });
  }

  // เปลี่ยนหน้า
  onPageChange(page: number): void {
    if (page >= 1 && page <= (this.pager?.totalPages || 1)) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  // สร้าง array ของหมายเลขหน้าสำหรับแสดงใน pagination
  getPageNumbers(): number[] {
    if (!this.pager) return [];

    const pages: number[] = [];
    for (let i = this.pager.startPage; i <= this.pager.endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // ตรวจสอบว่าสามารถไปหน้าก่อนหน้าได้หรือไม่
  canGoPrevious(): boolean {
    return this.pager ? this.pager.currentPage > 1 : false;
  }

  // ตรวจสอบว่าสามารถไปหน้าถัดไปได้หรือไม่
  canGoNext(): boolean {
    return this.pager ? this.pager.currentPage < this.pager.totalPages : false;
  }

  getDisplayRange(): string {
    if (!this.pager) return '';
    const start = ((this.pager.currentPage - 1) * this.pager.pageSize) + 1;
    const end = Math.min(this.pager.currentPage * this.pager.pageSize, this.pager.totalItems);
    return `แสดง ${start} - ${end} จาก ${this.pager.totalItems} รายการ`;
  }

  onDelete(id: number) {
    if (!confirm('ยืนยันลบสินค้านี้หรือไม่?')) {
      return;
    }
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        // กรองเอาเฉพาะสินค้าที่ไม่ใช่ id ที่ลบแล้ว
        this.products = this.products.filter(p => p.id !== id);
      },
      error: err => console.error('ลบสินค้าไม่สำเร็จ', err)
    });
  }

}
