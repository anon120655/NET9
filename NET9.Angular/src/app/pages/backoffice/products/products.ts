import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductService, Product, Pager, PagedResponse } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: Product[] = [];
  pager!: Pager;
  pages: number[] = [];

  // กำหนด default page size
  pageSize = 10;

  constructor(private productService: ProductService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('สินค้าทั้งหมด');

    this.loadPage(1);
  }

  loadPage(page: number) {
    this.productService.getPagedProducts(page, this.pageSize)
      .subscribe({
        next: (res: PagedResponse<Product>) => {
          //console.log('API response:', res);           // ดูทั้ง object
          //console.log('Items:', res.items);            // ดูเฉพาะ array items
          this.products = res.items;
          this.pager = res.pager;
          // สร้าง array ของหมายเลขหน้า จาก startPage ถึง endPage
          this.pages = Array
            .from({ length: this.pager.endPage - this.pager.startPage + 1 })
            .map((_, i) => this.pager.startPage + i);
        },
        error: err => console.error('โหลดสินค้าไม่สำเร็จ', err)
      });
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
