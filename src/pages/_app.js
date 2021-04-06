import { DeckContextProvider } from "../contexts/DeckContext";
import { ModalContextProvider } from "../contexts/ModalContext";
import "../styles/globals.css";
import "../styles/utils.css";

import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <DeckContextProvider>
        <ModalContextProvider>
          <Component {...pageProps} />
        </ModalContextProvider>
      </DeckContextProvider>
    </Provider>
  );
}

export default MyApp;
