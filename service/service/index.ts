import { useMutation } from "@tanstack/react-query";
import request from "../../lib/request";

export const serviceHeroUpdate = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/hero-update/1`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const amazonSellerCreate = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/about-create`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const amazonSellerUpdate = (id: any): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/about-update/${id}`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const amazonSellerUpdateImage = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/about-update-image/1`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const createServices = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/service-create`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const serviceUpdtate = (id: any): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/update-service/${id}`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const pricingCreate = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/packages-create`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const pricingUpdate = (id: any): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/update-package/${id}`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const pricingUpdateSection = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) =>
      request.post(`/service/update-package-section/1`, data)
    );
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const askQuestionUpdate = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/update-askquestion/1`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const ecommerceCreate = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/ecommerce-create`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const ecommerceUpdate = (id: any): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) =>
      request.post(`/service/update-ecommerce/${id}`, data)
    );
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const branSectionUpdate = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/update-brand/1`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const brandCreate = (): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/create-brand`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};

export const brandUpdate = (id: any): any => {
  const { mutate, isLoading, isError, isSuccess, mutateAsync, data } =
    useMutation((data) => request.post(`/service/update-brand/${id}`, data));
  return {
    isLoading,
    isSuccess,
    data,
    mutate,
    mutateAsync,
  };
};
