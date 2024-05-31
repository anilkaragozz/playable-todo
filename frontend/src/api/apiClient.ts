import { Todos, Tag } from "@/pages/todo/TodoTableColumn";
import { getAccessToken } from "@/lib/helper";
import axios from "axios";
import { toast } from "react-toastify";

export const accessToken = getAccessToken();
const baseURL = "http://localhost:8000";

export const axiosClient = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

export const loginInstance = async (email: string, password: string) => {
  try {
    const response = await axiosClient.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("accessToken", response.data?.access_token);
    return response.data;
  } catch (error) {
    toast.error("Registration failed");
    return error;
  }
};

export const registerInstance = async (email: string, password: string) => {
  try {
    const response = await axiosClient.post("/auth/register", {
      email,
      password,
    });

    toast.success("Registration successful");
    return response.data;
  } catch (error) {
    toast.error("Registration failed");
    return error;
  }
};

export const createTodoInstance = async (
  title: string,
  description: string,
  tags: Array<Tag>
) => {
  try {
    const response = await axiosClient.post("/todo/", {
      title,
      description,
      tags,
    });
    toast.success("Todo created successful");
    return response.data;
  } catch (error) {
    toast.error("Failed to create todo");
    return error;
  }
};

export const getTodosInstance = async (): Promise<Todos[]> => {
  try {
    const response = await axiosClient.get("/todo/");
    return response.data.docs;
  } catch (error) {
    toast.error("Failed to fetch todos");
    return [];
  }
};

export const getPaginatedTodosInstance = async () => {
  try {
    const response = await axiosClient.get("/todo/");
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch todos");
    return error;
  }
};

export const getTodosByKeyInstance = async (
  search?: string,
  tags?: string
): Promise<Todos[]> => {
  try {
    const response = await axiosClient.get(
      `/todo/?search=${search}&tags=${tags}`
    );
    return response.data.docs;
  } catch (error) {
    toast.error("Failed to fetch todos");
    return [];
  }
};

export const uploadTodoImageInstance = async (id: string, file: string) => {
  try {
    const formData = new FormData();
    formData.append("thumbnail", file);
    const response = await axiosClient.post(
      `/todo/${id}/uploadImage`,
      formData
    );
    toast.success("Image uploaded successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to upload image");
    return error;
  }
};

export const uploadTodoAttachmentsInstance = async (
  id: string,
  file: string
) => {
  try {
    const formData = new FormData();
    formData.append("attachments", file);
    const response = await axiosClient.post(
      `/todo/${id}/uploadAttachment`,
      formData
    );
    toast.success("Attachments uploaded successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to upload attachments");
    return error;
  }
};

export const updateTodoInstance = async (
  id: string,
  title?: string,
  description?: string,
  is_completed?: boolean,
  tags?: Array<Tag>
) => {
  try {
    const req = { title, description, is_completed, tags };
    const response = await axiosClient.put(`/todo/${id}`, req);
    toast.success("Todo updated successfully");
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("Failed to update todo");
    return error;
  }
};

export const deleteTodoInstance = async (id: string) => {
  try {
    const response = await axiosClient.delete(`/todo/${id}`);
    toast.success("Todo deleted successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete todo");
    return error;
  }
};
