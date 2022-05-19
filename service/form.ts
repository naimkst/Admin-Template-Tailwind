import request from "../lib/request";

export const postFormData = async (payload: any) => {
  const { data } = await request.post("/posts", payload);
  return data;
};

export const getContentData = async (id: any) => {
  const { data } = await request.get("/posts/" + id);
  return data;
};
export const editContent = async (id: any, payload: any) => {
  const { data } = await request.patch("/posts/" + id, payload);
  return data;
};