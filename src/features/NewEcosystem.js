import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/creatorApis";

// Define an initial state for newCreator
const initialState = {
  creatorId: null,
  businessName: "",
  websiteAddress: "",
  country: "",
  state: "",
  localGovernment: "",
  loading: false,
  error: null,
};

export const newCreatorCreateEcosystem = createAsyncThunk(
  "auth/newCreatorCreateEcosystem",
  async (
    {
      creatorId,
      businessName,
      websiteAddress,
      country,
      state,
      localGovernment,
      accessToken,
      refreshToken,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.newCreatorCreateEcosystem({
        creatorId,
        businessName,
        websiteAddress,
        country,
        state,
        localGovernment,
        accessToken,
        refreshToken,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const newCreatorSlice = createSlice({
  name: "newCreator",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setCreatorId: (state, action) => {
      state.creatorId = action.payload;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(newCreatorCreateEcosystem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newCreatorCreateEcosystem.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(newCreatorCreateEcosystem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateField, setCreatorId, resetState } = newCreatorSlice.actions;

export default newCreatorSlice.reducer;