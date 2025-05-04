import axios from "axios";

const API_URL = "http://localhost:5000/api"

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
} , (error) => {
    return Promise.reject(error);
})

export const login  = async (email , password) => {
    try {
        const response = await api.post("/auth/login" , {email , password});
        if(response.data.token){
            localStorage.setItem("token" , response.data.token);
            localStorage.setItem("user" , JSON.stringify(response.data.user))
        }

        return response.data;
    } catch(error){
        if(error.response){
            throw error.response.data
        }
        else {
            throw {message: "Some error occured"}
        }
    }
}

export const register = async (name , email , password) => {
    try {
        const response = await api.post("/auth/register" , {name , email, password});
        if(response.data.token){
            localStorage.setItem("token" , response.data.token);
            localStorage.setItem("user" , JSON.stringify(response.data.newUser));
        }
        return response.data;
    } catch(error){
        throw error.response ? error.response.data : {message: "Some error occured"}
    }
}

export const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
}

export const getProfile = async () => {
    try {
        const response = await api.get("/auth/profile");
        return response.data;
    } catch(error){
        throw error.response ? error.response.data : {message: "An error occured"}
    }
}

export const getAllPost = async () => {
    try {
        const response  = await api.get("/posts");
        return response.data;
    } catch(error){
        throw error.response ? error.response.data : {message: "Error fetching posts"}
    }
}

export const createPost = async(postData) => {
    try {
        const response = await api.post("/posts" , postData);
        return response.data;
    } catch(error){
        throw error.response ? error.response.data : {message: "Error creating post"}
    }
}

export const likePost = async(postId) => {
    try {
        const response  = await api.post(`/posts/${postid}/like`);
        return response.data;
    } catch(error){
        throw error.response ? error.response.data : {message: "Error liking posts"}
    }
}

export const addComment = async (postId , content) => {
    try{
        const response = await api.post(`/posts/${postId}/comment` , {content});
        return response.data;
    } catch(error){
        throw error.response ? error.response.data : {message: "Error Commenting"}
    }
}

export default api;