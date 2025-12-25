import apiClient from "./Request";


const postReq = async (url, data, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
const getReq = async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
const putReq = async (url, data, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
const deleteReq = async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return response;
    } catch (error) {
      throw error;
    }
  };
  

  export{postReq, getReq, deleteReq, putReq}