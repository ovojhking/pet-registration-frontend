export type Payload = {
    [key: string | number]: boolean | number | string | object | Payload;
};

type HttpResponseMessage = { message: string };
export type HttpSuccessfulResponse<T> = { status: number; body: T };
export type HttpFailingResponse = { status: number; body: HttpResponseMessage };
export type HttpResponse<T> = HttpSuccessfulResponse<T> | HttpFailingResponse;