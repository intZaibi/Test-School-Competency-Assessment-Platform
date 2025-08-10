import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    assessments: [],
}

export const assessmentSlice = createSlice({
    name: "assessment",
    initialState,
    reducers: {
        addAssessment: (state, action) => {
            // state.assessments.push(action.payload);
        },
    },
})