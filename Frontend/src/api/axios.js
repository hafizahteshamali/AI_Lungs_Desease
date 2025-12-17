import apiClient from "./Request";

const getReq = async (path)=>{
    try {
        const response = await apiClient.get(path)
        return response;
    } catch (error) {
        return error.message;
    }
}


const postReq = async (path, data)=>{
    try {
        const response = await apiClient.post(path, data)
        return response;
    } catch (error) {
        return error.message;
    }
}

const deleteReq = async (path)=>{
    try {
        const response = await apiClient.delete(path)
        return response;
    } catch (error) {
        return error.message;
    }
}

const putReq = async (path, data)=>{
    try {
        const response = await apiClient.put(path, data)
        return response;
    } catch (error) {
        return error.message;
    }
}

export {getReq, postReq, deleteReq, putReq}