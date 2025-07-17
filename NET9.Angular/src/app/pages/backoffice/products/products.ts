import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
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

    this.productService
      .getPagedProducts(this.currentPage, this.pageSize)
      .pipe(delay(300)) // หน่วง 1000 ms = 1 วินาที
      .subscribe({
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
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการลบสินค้านี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ลบเลย',
      cancelButtonText: 'ยกเลิก',
      customClass: {
        confirmButton: 'swal2-confirm-btn',
        cancelButton: 'swal2-cancel-btn'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== id);
            Swal.fire('ลบแล้ว!', 'สินค้าถูกลบเรียบร้อยแล้ว', 'success');
          },
          error: err => {
            console.error('ลบสินค้าไม่สำเร็จ', err);
            Swal.fire('ผิดพลาด', 'ลบสินค้าไม่สำเร็จ', 'error');
          }
        });
      }
    });
  }


}
