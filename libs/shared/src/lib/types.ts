export interface ApiResponse<T = any> {
  data: T;
  message: string;
  status: 'success' | 'error';
}

export interface User {
  id: string;
  name: string;
  email: string;
}