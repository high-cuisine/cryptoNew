export interface ErrorResponse {
    message: string | string[],
    code: number
}

export interface FormErrorResponseMessage {
    [key: string]: string[]
}

export interface FormErrorResponse {
    errors: FormErrorResponseMessage,
    code: number
}
