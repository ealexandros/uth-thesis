import { AxiosResponse } from "axios";
import { QueryClient, UseMutationOptions, UseQueryOptions } from "react-query";
import { PromiseValue } from "type-fest";

export type ExtractFnReturnType<FnType extends (...args: any) => any> =
  PromiseValue<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn" | "mutationFn"
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosResponse["data"],
    Parameters<MutationFnType>[0]
  >;

export const queryClient = new QueryClient();
