import axios from "axios";
const api = axios.create({
  baseURL: "https://test-school-competency-assessment-c1op.onrender.com/api",
  withCredentials: true,
});

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password }, {headers: {
      'Access-Control-Allow-Origin': '*',   // Usually set by the server, not needed on client
      'Access-Control-Allow-Headers': '*',   // Same as above
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Credentials': 'true', // Required for credentials-based requests
      'Sec-Fetch-Mode': 'no-cors',           // This can be used for fetch security mode
      'Sec-Fetch-Site': 'same-site'          // This is a browser security feature
    }});
    // const result = await response.json();
    return response.data
  } catch (error) {
    console.log("login failed!", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Login failed!" };
    }
    return { error: "Login failed!" };
  }
}

export const register = async (name: string, email: string, password: string, role: string) => {
  try {
    const response = await api.post("/auth/register", { name, email, password, role });
    return response.data;
  } catch (error) {
    console.log("register failed!", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Register failed!" };
    }
    return { error: "Register failed!" };
  }
}

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.log("logout failed!", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Logout failed!" };
    }
    return { error: "Logout failed!" };
  }
}

export const getUser = async () => {
  try {
    const response = await api.get("/auth/user");
    return response.data;
  } catch (error) {
    console.log("getUser failed!", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Get user failed!" };
    }
    return { error: "Get user failed!" };
  }
}

export const verifyOTP = async (email: string, otp: string, password?: string) => {
  try {
    const response = await api.post("/auth/verify-otp", { email, otp, password });
    return response.data;
  } catch (error) {
    console.log("verifyOTP failed!", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Verify OTP failed!" };
    }
    return { error: "Verify OTP failed!" };
  }
}

export const resendOTP = async (email: string) => {
  try {
    const response = await api.post("/auth/resend-otp", { email });
    return response.data;
  } catch (error) {
    console.log("resendOTP failed!", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Resend OTP failed!" };
    }
    return { error: "Resend OTP failed!" };
  }
}

export const sendReset = async (email: string) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.log("sendReset failed!", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Send reset link failed!" };
    }
    return { error: "Send reset link failed!" };
  }
}

export const changePassword = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/change-password", { email, password });
    return response.data;
  } catch (error) {
    console.log("changePassword failed!", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Change password failed!" };
    }
    return { error: "Change password failed!" };
  }
}

export const getUserInfo = async () => {
  try {
    const response = await api.get("/auth/get-user");
    return response.data.user;
  } catch (error) {
    console.log("getUserInfo failed!", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Get user info failed!" };
    }
    return { error: "Get user info failed!" };
  }
}

export const refreshToken = async () => {
  try {
    const response = await api.get("/auth/refresh");
    return response.data;
  } catch (error) {
    console.log("refreshToken failed!", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || error.message || "Refresh token failed!" };
    }
    return { error: "Refresh token failed!" };
  }
}

export default api;
