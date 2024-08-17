import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from '../reducers/cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => Array.from(state.items)
);

export const selectCartCount = createSelector(
  selectCartState,
  (state: CartState) => state.items.size
);