"use client";

import { AppDispatch, RootState } from "#stores/store";
import {
  AnyAction,
  Dispatch,
  PayloadAction,
  ThunkAction,
  createSlice,
} from "@reduxjs/toolkit";

interface GlobalSliceInterface {
  isLoading: boolean;
  isError: boolean;
  error?: string;
  isConfirmationModalOpen: boolean;
  confirmationModalMsg?: string;
  isPaymentSuccess: boolean;
}

type partialGlobalState = Partial<GlobalSliceInterface>;

const initialState: GlobalSliceInterface = {
  isLoading: false,
  isError: false,
  error: "",
  isConfirmationModalOpen: false,
  confirmationModalMsg: "",
  isPaymentSuccess: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeGlobalState: (state, action: PayloadAction<partialGlobalState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetGlobalState: (state, action) => {
      return initialState;
    },
    openConfirmationModal: (state, action: PayloadAction<string>) => {
      state.isConfirmationModalOpen = true;
      state.confirmationModalMsg = action.payload;
    },
    closeConfirmationModal: (state) => {
      state.isConfirmationModalOpen = false;
      state.confirmationModalMsg = "";
    },
    openPaymentSuccessModal: (state) => {
      state.isPaymentSuccess = true;
    },
    closePaymentSuccessModal: (state) => {
      state.isPaymentSuccess = false;
    },
  },
});

export default globalSlice.reducer;

export const {
  changeGlobalState,
  resetGlobalState,
  closeConfirmationModal,
  openConfirmationModal,
  openPaymentSuccessModal,
  closePaymentSuccessModal,
} = globalSlice.actions;

type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;

// Thunk to handle asynchronous action
export const callConfirmationModal =
  ({ content, time }: { content: string; time: number }): ThunkResult<void> =>
  (dispatch: AppDispatch) => {
    dispatch(openConfirmationModal(content));

    setTimeout(() => {
      dispatch(closeConfirmationModal());
    }, time);
  };
