
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { reducer } from '.'
import { FC } from 'react'


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

/**
 * Wrapper for unit/snapshot testing
 * @param Component React children
 * @returns void
 */
export const withRedux: FC = (Component: unknown) => {
	// Weird validation error causes the app to crash, but it works fine
	// eslint-disable-next-line
	// @ts-ignore
	const { store } = configureStore()
	return (
		<Provider store={store}>
			{Component}
		</Provider>
	)
}