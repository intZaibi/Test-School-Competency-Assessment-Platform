import { configureStore } from "@reduxjs/toolkit";
import assessmentSlice from "../features/slicers/assessmentSlice";
import authSlice from "../features/slicers/authSlice";

const store = configureStore({
    reducer: {
        assessment: assessmentSlice,
        auth: authSlice,
    },
})

export default store;