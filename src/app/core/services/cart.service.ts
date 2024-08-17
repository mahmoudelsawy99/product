import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new Set<number>();

  addToCart(productId: number) {
    this.cart.add(productId);
  }

  getCartCount(): number {
    return this.cart.size;
  }
}