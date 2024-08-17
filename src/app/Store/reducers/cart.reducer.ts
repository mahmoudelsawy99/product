import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart } from '../actions/cart.actions';

export interface CartState {
  items: Set<number>;
}

export const initialState: CartState = {
  items: new Set<number>()
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { productId }) => ({
    ...state,
    items: new Set(state.items).add(productId)
  })),
  on(removeFromCart, (state, { productId }) => {
    const updatedItems = new Set(state.items);
    updatedItems.delete(productId);
    return { ...state, items: updatedItems };
  })
);