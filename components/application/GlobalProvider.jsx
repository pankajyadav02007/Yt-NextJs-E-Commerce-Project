import { persistor, store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const GlobalProvider = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading=""></PersistGate>
    </Provider>
  );
};

export default GlobalProvider;
