import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import 'react-toastify/dist/ReactToastify.css';
<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import Loading from '../components/Loading';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistStore(store)}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </PersistGate>
    </Provider>
  )
}

export default MyApp
