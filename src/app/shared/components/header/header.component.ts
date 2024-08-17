import { Component } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Store } from '@ngrx/store';
import { selectCartCount } from 'src/app/Store/selectors/cart.selectors';
import { addToCart } from 'src/app/Store/actions/cart.actions';
import { Subject } from 'rxjs';
 @Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartCount$ = this.store.select(selectCartCount);
  searchQuery = new Subject<string>();

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private productService: ProductService,
    private store: Store
  ) {}

 
  addToCart(productId: number) {
    this.store.dispatch(addToCart({ productId }));
  }
  searchProducts(event: any) {
     
    let query = event.target.value;
    this.productService.setSearchQuery(query); 
   
  }
}