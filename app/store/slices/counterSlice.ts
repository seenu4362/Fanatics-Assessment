import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    /**
     * Increments the counter value by 1.
     * @param state - Current state of the counter slice.
     */
    increment: (state) => {
      state.value += 1;
    },
     /**
     * Decrements the counter value by 1.
     * @param state - Current state of the counter slice.
     */
    decrement: (state) => {
      state.value -= 1;
    },

    /**
     * Resets the counter value to its initial state.
     * @returns The initial state of the counter.
     */
    resetCount: () => initialState, // Resets count
  },
});

export const { increment, decrement, resetCount } = counterSlice.actions;
export default counterSlice.reducer;
