import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Produto } from '../../types'

type CartState = {
  items: Produto[]
  favorites: Produto[]
}

const initialState: CartState = {
  items: [],
  favorites: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Produto>) {
      if (!state.items.some((item) => item.id === action.payload.id)) {
        state.items.push(action.payload)
      }
    },
    toggleFavorite(state, action: PayloadAction<Produto>) {
      const favoriteIndex = state.favorites.findIndex(
        (item) => item.id === action.payload.id
      )

      if (favoriteIndex >= 0) {
        state.favorites.splice(favoriteIndex, 1)
      } else {
        state.favorites.push(action.payload)
      }
    }
  }
})

export const { addToCart, toggleFavorite } = cartSlice.actions
export default cartSlice.reducer
