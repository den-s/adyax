import { configureStore } from '@reduxjs/toolkit'

import rootReducer from '../redux/reducers'

const store = configureStore({
  reducer: rootReducer
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('../redux/reducers', () => {
    const newRootReducer = require('../redux/reducers').default
    store.replaceReducer(newRootReducer)
  })
}

export default store

export const { dispatch } = store
