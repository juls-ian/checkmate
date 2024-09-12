import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH;
// resource name of API
const resource = apiPath + "/tasks";

// FETCHING ALL TASKS
export const allTask = () => api.get(resource);
export const createTask = (task) => api.post(resource, task); // task sent to server
export const updateTask = (id, task) => api.put(`${resource}/${id}`, task); //send task as payload
export const removeTask = (id) => api.delete(`${resource}/${id}`);
export const completeTask = (id, task) => api.patch(`${resource}/${id}/complete`, task);
