import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000/api/assessments",
  withCredentials: true,
});

export const getAllAssessmentQuestions = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching all assessment questions:", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Get all assessment questions failed!" };
    }
    return { error: "Get all assessment questions failed!" };
  }
}

export const getQuestionsByLevel = async (step: string, level: string) => {
  try {
    const response = await api.get(`/${step}/${level}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions by level:", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Get questions by level failed!" };
    }
    return { error: "Get questions by level failed!" };
  }
}

export const submitAssessment = async (step: string, level: string, score: number) => {
  try {
    const response = await api.post("/submit", { step, level, score });
    return response.data;
  } catch (error) {
    console.error("Error submitting assessment:", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Submit assessment failed!" };
    }
    return { error: "Submit assessment failed!" };
  }
}

export const generateCertificate = async (id: string, status: string, score: number, certificateUrl: string) => {
  try {
    const response = await api.post("/certificate", { id, status, score, certificateUrl });
    return response.data;
  } catch (error) {
    console.error("Error generating certificate:", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Generate certificate failed!" };
    }
    return { error: "Generate certificate failed!" };
  }
}

export const getUserData = async () => {
  try {
    const response = await api.get("/user-data");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Get user data failed!" };
    }
    return { error: "Get user data failed!" };
  }
}