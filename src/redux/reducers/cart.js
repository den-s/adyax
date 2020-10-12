import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../helpers/apiClient'

const initialState = {
  loading: false,
  loaded: false,
  items: [],
  error: false
}

export const loadCart = createAsyncThunk(
  'cart/load',
  async () => {
    const response = await api.get('/cart/')
    return response
  }
)

export const syncCart = createAsyncThunk(
  'cart/sync',
  async (id, state) => {
    const response = await api.put(`/cart/${id}`, state.getState()?.cart?.items.find(item => item.id === id))
    return response
  }
)

export const removeCartItem = createAsyncThunk(
  'cart/remove',
  async (id) => {
    const response = await api.delete(`/cart/${id}`)
    return response
  }
)

const updateItemById = (list, item) => list.map(listItem => {
  if (listItem.id === item.id) return Object.assign({}, listItem, item)
  return listItem
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCount (state, action) {
      state.items = updateItemById(state.items, action.payload)
    },
    setType (state, action) {
      state.items = updateItemById(state.items, action.payload)
    }
  },
  extraReducers: {
    [loadCart.fulfilled]: (state, action) => {
      state.items = action.payload
    },
    [syncCart.fulfilled]: (state, action) => {
      state.items = updateItemById(state.items, action.payload)
    },
    [removeCartItem.fulfilled]: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id)
    }
  }
})

export const { setCount, setType } = cartSlice.actions

export default cartSlice.reducer
