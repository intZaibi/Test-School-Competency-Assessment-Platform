import { configureStore } from "@reduxjs/toolkit";
import { assessmentSlice } from "../features/slicers/assessmentSlice";

const store = configureStore({
    reducer: {
        assessment: assessmentSlice.reducer,
    },
})

export default store;