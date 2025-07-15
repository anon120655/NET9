import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('สินค้าทั้งหมด');

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('เกิดข้อผิดพลาดในการโหลดสินค้า', err);
      }
    });
  }
}
