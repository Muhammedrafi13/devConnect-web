import { createSlice } from "@reduxjs/toolkit";


const feed = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeedData: (state, action) => {
            return action.payload;
        },
      removeFeedData: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
    }
})

export const { addFeedData, removeFeedData } = feed.actions;
export default feed.reducer;