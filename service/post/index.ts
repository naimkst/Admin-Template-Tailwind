import request from "../../lib/request";

export const postFormData = async (payload: any) => {
  const { data } = await request.post("/posts", payload);
  return data;
};

export const getAlltData: any = async (skip: number, take: number, search: string) => {
  const { data } = await request.get(`/posts/paginate?skip=${skip}&take=${take}&search=${search}`);
  return data;
};

export const deleteById = async (id: any) => {
  const { data } = await request.delete("/posts/" + id);
  return data;
};

export const getContentData = async (id: any) => {
  const { data } = await request.get("/posts/post/" + id);
  return data;
};
export const editContent = async (id: any, payload: any) => {
  const { data } = await request.post("/posts/update/" + id, payload);
  return data;
};