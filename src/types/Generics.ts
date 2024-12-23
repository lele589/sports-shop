export type ResultType<T> =
  | { success: true; data: T }
  | { success: false; error: { type: string; message: string } };
