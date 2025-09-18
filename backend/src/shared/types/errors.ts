export type ErrorCondition = (error: Error) => boolean;
export type ErrorResponse = { status: number; message: string };
export type ErrorMaps = [ErrorCondition, ErrorResponse][];
