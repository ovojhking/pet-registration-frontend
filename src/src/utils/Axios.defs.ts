export type Payload = {
    [key: string | number]: boolean | number | string | object | Payload;
};

type HttpResponseMessage = { message: string };
export type HttpSuccessfulResponse<T> = { status: number; body: T };
export type HttpFailingResponse = { status: number; body: HttpResponseMessage };
export type HttpResponse<T> = HttpSuccessfulResponse<T> | HttpFailingResponse;

export function isFailingResponse<T>(response: HttpResponse<T>): response is HttpFailingResponse {
    return (response.body as { message: string }).message !== undefined && [200, 201].indexOf(response.status) === -1;
}
