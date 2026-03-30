export interface ApiResponseType<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
}

export const ApiResponse = <T>(
  statusCode: number,
  message: string,
  data: T,
  meta?: Record<string, unknown>,
): ApiResponseType<T> => {
  return {
    success: true,
    statusCode,
    message,
    data,
    ...(meta && { meta }),
  };
};
