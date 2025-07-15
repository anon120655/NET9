import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  finalPrice: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://localhost:7024/api/product';

  constructor(private http: HttpClient) { }

  // ✅ Get All Products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // ✅ Get Single Product
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // ✅ Create Product (ไม่ต้องใส่ id/discount/finalPrice)
  createProduct(data: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);
  }

  // ✅ Update Product
  updateProduct(id: number, data: Partial<Product>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }
}
