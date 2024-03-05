"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PageCtxSliceInterface {
  title: string;
  isBackActive: boolean;
  isFavoriteBtnActive: boolean;
  isSearchActive: boolean;
  isActiveShare: boolean;
  isCreateButtonActive: boolean;
  isOpenSearchPanel: boolean;
  isOpenUserDrawer: boolean;
  isUpdateButtonActive: boolean;
}
type partialPageCtx = Partial<PageCtxSliceInterface>;

const initialState: PageCtxSliceInterface = {
  title: "",
  isActiveShare: false,
  isBackActive: false,
  isCreateButtonActive: false,
  isFavoriteBtnActive: false,
  isSearchActive: false,
  isOpenSearchPanel: false,
  isOpenUserDrawer: false,
  isUpdateButtonActive: false,
};

const pageCtxSlice = createSlice({
  name: "pageCtx",
  initialState,
  reducers: {
    changePageCtx: (state, action: PayloadAction<partialPageCtx>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetPageCtx: (state, action) => {
      return initialState;
    },
    openSearchPanel: (state) => {
      state.isOpenSearchPanel = true;
    },
    closeSearchPanel: (state) => {
      state.isOpenSearchPanel = false;
    },
    openUserDrawer: (state) => {
      state.isOpenUserDrawer = true;
    },
    closeUserDrawer: (state) => {
      state.isOpenUserDrawer = false;
    },
  },
});

export default pageCtxSlice.reducer;

export const {
  changePageCtx,
  resetPageCtx,
  openSearchPanel,
  closeSearchPanel,
  openUserDrawer,
  closeUserDrawer,
} = pageCtxSlice.actions;
