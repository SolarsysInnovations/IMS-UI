import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    data: null,
    loading: false,
    error: null,
    companyLogo: null,
  },
  reducers: {
    setCompanyLogo: (state: any, action: PayloadAction<string>) => {
      state.companyLogo = action.payload;
    },
    clearCompanyLogo: (state) => {
      state.companyLogo = null;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    clearData(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },

    // -------------- country select ------------
    setCountry(state, action) {
      state.data = action.payload;
    },
    clearCountryData(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    setCountryError(state, action) {
      state.error = action.payload;
    },
    setCountryLoading(state, action) {
      state.loading = action.payload;
    },
  },
});
export const selectCompanyLogo = (state: any) => state.global.companyLogo;
export const {
  setData,
  clearData,
  setError,
  setLoading,
  setCountry,
  clearCountryData,
  setCountryError,
  setCountryLoading,
  setCompanyLogo,
  clearCompanyLogo,
} = globalSlice.actions;
