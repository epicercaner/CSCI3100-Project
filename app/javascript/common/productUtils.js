import axios from "axios";

export const getProducts = async (params) => {
  try {
    const response = await axios.get("/products", { params });
    return response.data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error; 
  }
};