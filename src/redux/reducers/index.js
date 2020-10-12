import { combineReducers } from '@reduxjs/toolkit'
import cartReducer from './cart'

export default combineReducers({
  cart: cartReducer
})
