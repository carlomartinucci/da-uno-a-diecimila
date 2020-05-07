import { createSlice } from "@reduxjs/toolkit";

const generateSheets = () => {
  let sheets = []
  while (sheets.length < 100) {
    const number = Math.floor((Math.random() * 10000) + 1);
    if (!sheets.includes(number)) {
      sheets.push(number)
    }
  }

  return sheets
}

const appSlice = createSlice({
  name: "app",
  initialState: {
    month: 1,
    sheets: generateSheets(),
    seen: 0,
    history: [],
  },
  reducers: {
    pass: state => {state.seen = state.seen === 100 ? 100 : state.seen + 1},
    stop: (state) => {
      return {
        month: state.month + 1,
        seen: 0,
        sheets: generateSheets(),
        history: [
          {
            month: state.month,
            seen: state.seen,
            won: state.seen > 0 ? state.sheets[state.seen - 1] : 0,
          },
          ...state.history,
        ],
      };
    },
  },
});

export const { pass, stop } = appSlice.actions;

export default appSlice.reducer;
