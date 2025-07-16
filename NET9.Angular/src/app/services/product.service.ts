import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  finalPrice: number;
}

export interface Pager {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  // ถ้ามี field อื่นก็เติมได้
}

export interface PagedResponse<T> {
  items: T[];
  pager: Pager;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://localhost:7024/api/product';

  constructor(private http: HttpClient) { }

  // ✅ Get All Products Page
  getPagedProducts(page: number, pageSize: number): Observable<PagedResponse<Product>> {
    const params = new HttpParams()
      .set('Page', page)
      .set('PageSize', pageSize);

    return this.http.get<PagedResponse<Product>>(`${this.apiUrl}/paged`, { params });
  }

  // ✅ Get All Products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
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
  // ✅ Delete Product
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
}
