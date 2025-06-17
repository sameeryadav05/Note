import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './paste'
export const store  = configureStore(
    {
          reducer: {
            paste:pasteReducer,
          },
    }
)