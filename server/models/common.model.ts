export interface BaseResponse<T> {
  status: 'success' | 'failure';
  message?: string;
  data?: T;
}