import { configureStore } from "@reduxjs/toolkit";
import assessmentReducer from "../features/slicers/assessmentSlice";
import authReducer from "../features/slicers/authSlice";

const store = configureStore({
    reducer: {
        assessment: assessmentReducer,
        auth: authReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;

export default store;