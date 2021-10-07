
import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { reducer } from '.'


const persistConfig = {
	key: 'sudoku',
	storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

export function configureStore(): unknown {
    
	const store = createStore(
		persistedReducer,
		devToolsEnhancer({})
	)

	const persistor = persistStore(store)

	return { store, persistor }
}