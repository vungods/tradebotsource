import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OutputFilterOptionType } from "types/estimation";

const initialState: OutputFilterOptionType = {
    customerId: "",
    status: "",
    startDate: "",
    endDate: "",
    estimationName: "",
    technologyIds: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter(state, action: PayloadAction<Partial<OutputFilterOptionType>>) {
      return { ...state, ...action.payload };
    },
    clearFilter() {
      return { ...initialState };
    },
  },
});

export const { updateFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
