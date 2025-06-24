// ecosystemSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ecosystemStatusSlice = createSlice({
  name: 'ecosystemStatus',
  initialState: { status: null },
  reducers: {
    setEcosystemStatus(state, action) {
      state.status = action.payload;
    },
    clearEcosystemStatus(state) {
      state.status = null;
    },
  },
});

export const { setEcosystemStatus, clearEcosystemStatus } = ecosystemStatusSlice.actions;
export default ecosystemStatusSlice.reducer;
