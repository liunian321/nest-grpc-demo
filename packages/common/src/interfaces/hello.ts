/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "helloProto";

export interface HelloRequest {
  id: string;
}

export interface HelloResponse {
  name: string;
}

export const HELLO_PROTO_PACKAGE_NAME = "helloProto";

export interface HelloServiceClient {
  hello(request: HelloRequest): Observable<HelloResponse>;
}

export interface HelloServiceController {
  hello(request: HelloRequest): Promise<HelloResponse> | Observable<HelloResponse> | HelloResponse;
}

export function HelloServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["hello"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HelloService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HelloService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HELLO_SERVICE_NAME = "HelloService";
