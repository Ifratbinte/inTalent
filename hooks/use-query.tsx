import API from "#helpers/axios";
import mutationToaster from "#helpers/toaster";
import {
  UseMutationOptions,
  useMutation,
  useQuery as useReactQuery,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

export function useQuery<T>(
  queryKey: string | (string | number)[],
  apiEndPoint: string,
  options?: any,
  config?: AxiosRequestConfig
) {
  return useReactQuery<T>(
    [...queryKey],
    async () => {
      const { data } = await API.get(apiEndPoint, config);
      return data;
    },
    {
      ...options,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
}

export const usePost = (
  apiEndPoint: string,
  options?: UseMutationOptions<unknown, unknown, any, unknown>,
  config?: AxiosRequestConfig
) =>
  useMutation({
    mutationFn: (payload) => {
      return mutationToaster(API.post(apiEndPoint, payload, config));
    },
    ...options,
  });

export const usePut = (
  apiEndPoint: string,
  options?: any,
  config?: AxiosRequestConfig
) =>
  useMutation(
    (payload) => mutationToaster(API.put(apiEndPoint, payload, config)),
    { ...options }
  );

export const usePatch = (
  apiEndPoint: string,
  options?: any,
  config?: AxiosRequestConfig
) =>
  useMutation(
    (payload) => mutationToaster(API.patch(apiEndPoint, payload, config)),
    { ...options }
  );

export const useDelete = (
  apiEndPoint: string,
  options?: any,
  config?: AxiosRequestConfig
) =>
  useMutation(
    (id) => mutationToaster(API.delete(`${apiEndPoint}/${id}`, config)),
    {
      ...options,
    }
  );
