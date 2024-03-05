"use client";

import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import userSlice from "./users/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import pageCtxSlice from "./pages/pageCtxSlice";
import globalSlice from "./global/globalSlice";
// ...
const userConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userSlice),
    pageCtx: pageCtxSlice,
    globalState: globalSlice,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
