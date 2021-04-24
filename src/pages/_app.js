import { DeckContextProvider } from "../contexts/DeckContext";
import { ModalContextProvider } from "../contexts/ModalContext";
import { CardContextProvider } from "../contexts/CardContext";
import "../styles/globals.css";

import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <DeckContextProvider>
        <ModalContextProvider>
          <CardContextProvider>
            <Component {...pageProps} />
          </CardContextProvider>
        </ModalContextProvider>
      </DeckContextProvider>
    </Provider>
  );
}

export default MyApp;
