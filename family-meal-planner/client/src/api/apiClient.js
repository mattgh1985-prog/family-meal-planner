import axios from "axios";

const api = axios.create({
  baseURL: "/api"
});

export const fetchMembers = async () => {
  const res = await api.get("/members");
  return res.data;
};

export const createMember = async (payload) => {
  const res = await api.post("/members", payload);
  return res.data;
};

export const fetchMeals = async () => {
  const res = await api.get("/meals");
  return res.data;
};

export const fetchPlansForWeek = async (weekStart) => {
  const res = await api.get("/plans", { params: { weekStart } });
  return res.data;
};

export const savePlan = async (payload) => {
  const res = await api.post("/plans", payload);
  return res.data;
};

export const fetchShoppingList = async (weekStart) => {
  const res = await api.get("/shopping", { params: { weekStart } });
  return res.data;
};
