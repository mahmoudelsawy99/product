import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  currentPage = 1;
  totalPages = 0;
  searchQuery = '';
  selectedCategory: string = 'All';
  allProducts: any[] = [];
  constructor(private productService: ProductService,private cartService: CartService) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts(this.currentPage, 10).subscribe(data => {
      this.products = data.products;
      this.allProducts = data.products;
      this.totalPages = Math.ceil(data.total / 10);
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe(data => {
      this.categories = data;
      
      this.categories = ['All', ...data];
      
    });
  }

  searchProducts() {
    this.productService.searchProducts(this.searchQuery).subscribe(data => {
      this.products = data.products;
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.products = this.allProducts; 
    } else {
      this.products = this.allProducts.filter(product => product.category === category);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  getRatingIcon(rating: number): string {
     if (rating >= 4.5) return 'path-to-high-rating-icon';
    if (rating >= 3.0) return 'path-to-medium-rating-icon';
    return 'path-to-low-rating-icon';
  }

  getCategoryCount(category: string): number {
     return this.products.filter(p => p.category === category).length;
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  addToCart(productId: number) {
    this.cartService.addToCart(productId);
  }
}
