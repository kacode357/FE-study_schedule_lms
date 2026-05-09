// Wrapper cho tất cả response từ BE
export interface ApiResponse<T> {
  success: boolean;
  message?: string | null;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: { field: string; message: string }[];
}
