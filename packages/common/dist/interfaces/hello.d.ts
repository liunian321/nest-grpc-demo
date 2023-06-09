import { Observable } from "rxjs";
export declare const protobufPackage = "helloProto";
export interface HelloRequest {
    id: string;
}
export interface HelloResponse {
    name: string;
}
export declare const HELLO_PROTO_PACKAGE_NAME = "helloProto";
export interface HelloServiceClient {
    hello(request: HelloRequest): Observable<HelloResponse>;
}
export interface HelloServiceController {
    hello(request: HelloRequest): Promise<HelloResponse> | Observable<HelloResponse> | HelloResponse;
}
export declare function HelloServiceControllerMethods(): (constructor: Function) => void;
export declare const HELLO_SERVICE_NAME = "HelloService";
