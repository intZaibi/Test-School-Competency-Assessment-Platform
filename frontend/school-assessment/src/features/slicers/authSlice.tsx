import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        user: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user } = action.payload;
            state.user = user;
        },
        clearUser: (state) => {
            state.user = null;
        }
    },
})

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;