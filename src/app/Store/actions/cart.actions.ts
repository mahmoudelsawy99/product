import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ productId: number }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ productId: number }>()
);