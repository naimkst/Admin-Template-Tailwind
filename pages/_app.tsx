import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "react-toastify/dist/ReactToastify.css";
<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />;
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import Loading from "../components/Loading";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <PersistGate loading={<Loading />} persistor={persistStore(store)}> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default MyApp;
