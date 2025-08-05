
import { API_URL } from "./utils";

export const createTasks = async (taskObj) => {
  try {
    const result = await fetch(`${API_URL}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskObj),
    });
    const data = await result.json();
    return data;
  } catch (err) {
    console.error("Error in createTasks:", err);
    throw err;
  }
};

// GET /task
export const getalltasks = async () => {
  try {
    const result = await fetch(`${API_URL}/task`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await result.json();
    return data.tasks;
  } catch (err) {
    console.error("Error in getAllTasks:", err);
    throw err;
  }
};

export const deletetask = async (id) => {
  try {
    const result = await fetch(`${API_URL}/task/${id}`, {
      method: "Delete",
      headers: { "Content-Type": "application/json" },
    });
    const data = await result.json();
    return data;
  } catch (err) {
    console.error("Error in DeleteTaskbyID:", err);
    throw err;
  }
};

export const donetask = async (id,taskObj) => {
  try {
    const result = await fetch(`${API_URL}/task/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskObj),
    });
    const data = await result.json();
    return data;
  } catch (err) {
    console.error("Error in DeleteTaskbyID:", err);
    throw err;
  }
};