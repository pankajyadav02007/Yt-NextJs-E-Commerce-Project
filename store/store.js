"use client";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "./reducer/authReducer";
import storage from "redux-persist/lib/storage";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");
const { default: persistReducer } = require("redux-persist/es/persistReducer");

const rootReducer = combineReducers({
  authStore: authReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
