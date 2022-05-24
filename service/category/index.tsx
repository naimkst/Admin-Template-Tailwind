import request from "../../lib/request";

export const getCategory = async (skip: number, take: number, search: string) => {
  const { data } = await request.get(`categories/paginate?skip=${skip}&take=${take}&search=${search}`);
  return data;
};

export const createCategory = async (payload: any) => {
  console.log(payload)
  const { data } = await request.post("categories", payload);
  return data;
};

export const userLogin = async (payload: any) => {
  console.log(payload)
  const { data } = await request.post("auth/signin", payload);
  return data;
};

export const getCategoryData = async (id: any) => {
  const { data } = await request.get("categories/category/" + id );
  return data;
};

export const updateData = async (id: any, payload: any) => {
  const { data } = await request.put("auth/update/" + id, payload );
  return data;
};

export const deleteById = async (id: any) => {
  const { data } = await request.delete("auth/delete/" + id );
  return data;
};
