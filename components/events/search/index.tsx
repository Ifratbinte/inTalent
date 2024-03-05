"use client";
import { RootState } from "#stores/store";
import { Drawer } from "@mui/material";
import React from "react";
import { Control, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import SearchContent from "./searchContent";

interface Props {
  control: Control<FieldValues, any>;
}

const Search: React.FC<Props> = ({ control }) => {
  const pageCtx = useSelector((state: RootState) => state.pageCtx);
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={pageCtx.isOpenSearchPanel}
    >
      <SearchContent control={control} />
    </Drawer>
  );
};
export default Search;
