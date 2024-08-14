export interface WrapperData<T> {
  data: T | null;
  error: null | Error;
}
export const data = <T>(data: T): WrapperData<T> => ({
  error: null,
  data,
});

export interface PaginationMeta {
  meta: {
    totalData: number;
    totalView: number;
    maxView: number;
    currentPage: number;
    totalPage: number;
  };
}

export interface WrapperPaginationData<T>
  extends WrapperData<T>,
    PaginationMeta {}
export const paginationData = <T>(data: T, meta: PaginationMeta) => ({
  error: null,
  data,
  meta,
});

export interface WrapperError {
  data: null;
  error: Error;
}
export const error = (error: Error): WrapperError => ({
  error,
  data: null,
});
