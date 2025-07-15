import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm {
  mode: 'create' | 'update' = 'create';
  productId: number | null = null;

  product: Partial<Product> = {
    name: '',
    price: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? +idParam : null;
    this.mode = this.productId ? 'update' : 'create';

    if (this.mode === 'update' && this.productId) {
      this.productService.getProductById(this.productId).subscribe((res) => {
        this.product = res;
      });
    }
  }

  onSubmit() {
    if (this.mode === 'create') {
      this.productService.createProduct(this.product).subscribe(() => {
        this.router.navigate(['/backoffice/products']);
      });
    } else if (this.productId) {
      this.productService.updateProduct(this.productId, this.product).subscribe(() => {
        this.router.navigate(['/backoffice/products']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/backoffice/products']);
  }

}
