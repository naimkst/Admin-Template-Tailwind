import { useMutation } from "@tanstack/react-query";
import request from "../../lib/request";

export const homeHeroUpdate = async (data: any) => {
  return request.post("/home/hero-update/1", data);
};

export const useHomeUpdate = (): any => {
  const { isLoading, data, isSuccess, mutate, mutateAsync } =
    useMutation(homeHeroUpdate);
  return {
    isLoading,
    data,
    isSuccess,
    mutate,
    mutateAsync,
  };
};

export const homePhilosophyUpdate = async (data: any) => {
  return request.post("/home/philosophy-update/1", data);
};

export const usePhiloshopyUpdate = (): any => {
  const { isLoading, data, isSuccess, mutate, mutateAsync } =
    useMutation(homePhilosophyUpdate);
  return {
    isLoading,
    data,
    isSuccess,
    mutate,
    mutateAsync,
  };
};

export const testimonialCreate = async (data: any) => {
  return request.post("/home/testimonial", data);
};

export const homeTestimonialCreate = (): any => {
  const { isLoading, data, isSuccess, mutate, mutateAsync } =
    useMutation(testimonialCreate);
  return {
    isLoading,
    data,
    isSuccess,
    mutate,
    mutateAsync,
  };
};

export const testimonialUpdate = async (data: any) => {
  return request.post(`/home/update-testimonial/${data?.id}`, data);
};

export const homeTestimonialSectionUpdate = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) =>
      request.post(`/home/update-testimonial-section/1`, data)
    );
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const homeTestimonialUpdate = (id: any): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/home/update-testimonial/${id}`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const crativeMindCreate = async (data: any) => {
  return request.post("/home/creative-mind", data);
};

export const homeCreattiveMindAdd = (): any => {
  const { isLoading, data, isSuccess, mutate, mutateAsync } =
    useMutation(crativeMindCreate);
  return {
    isLoading,
    data,
    isSuccess,
    mutate,
    mutateAsync,
  };
};

export const homeCreativeMindUpdate = (id: any): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) =>
      request.post(`/home/update-creative-mind/${id}`, data)
    );
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const homeCounterAdd = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/home/counter-create`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const homeCounterUpdate = (id: any): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/home/update-counter/${id}`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const homeAmazonSellerSectionUpdate = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/home/update-amazon-section/1`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const homeAmazonSellerAdd = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/home/amazon-create`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};
export const homeAmazonSellerUpdate = (id: any): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/home/update-amazon/${id}`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};
export const homePortfolioSectionUpdate = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/home/update-portfolio/1`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};
export const homeProjectUpdate = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/home/update-project/1`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};
export const homeBrandCreate = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/home/create-brand`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};
export const homeBrandUpdate = (id: any): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/home/update-brand/${id}`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};
// export const postFormData = async (payload: any) => {
//   const { data } = await request.post("/posts", payload);
//   return data;
// };

// export const getAlltData: any = async (
//   skip: number,
//   take: number,
//   search: string
// ) => {
//   const { data } = await request.get(
//     `/posts/paginate?skip=${skip}&take=${take}&search=${search}`
//   );
//   return data;
// };

// export const deleteById = async (id: any) => {
//   const { data } = await request.delete("/posts/" + id);
//   return data;
// };

// export const getContentData = async (id: any) => {
//   const { data } = await request.get("/posts/post/" + id);
//   return data;
// };
// export const editContent = async (id: any, payload: any) => {
//   const { data } = await request.post("/posts/update/" + id, payload);
//   return data;
// };

// const { mutate, isLoading, isError, isSuccess, mutateAsync } = useMutation(
//   (data) =>
//     axios.post(
//       `http://localhost:3000/home/update-testimonial/${currentRoute}`,
//       data
//     )
// );
