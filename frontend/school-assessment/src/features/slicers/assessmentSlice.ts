import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 0,
    level: 0,
    score: 0,
    questions: [],
    answers: [],
    certificate: { id: null, status: null, score: null, certificateUrl: null },
}

export const assessmentSlice = createSlice({
    name: "assessment",
    initialState,
    reducers: {
        setAssessment: (state, action) => {
            const { step, level, score, questions, answers, certificate } = action.payload;
            state.step = step;
            state.level = level;
            state.score = score;
            state.questions = questions;
            state.answers = answers;
            state.certificate = certificate;
        },
    },
})

export const { setAssessment } = assessmentSlice.actions;

export default assessmentSlice.reducer;