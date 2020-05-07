import { createSlice } from "@reduxjs/toolkit";

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

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
      const maxIndex = indexOfMax(state.sheets)
      return {
        month: state.month + 1,
        seen: 0,
        sheets: generateSheets(),
        history: [
          {
            month: state.month,
            seen: state.seen,
            chosenNumber: state.seen > 0 ? state.sheets[state.seen - 1] : 0,
            maxIndex,
            maxNumber: state.sheets[maxIndex]
          },
          ...state.history,
        ],
      };
    },
  },
});

export const { pass, stop } = appSlice.actions;

export default appSlice.reducer;
