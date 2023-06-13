import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { type Observable } from "rxjs";

export const protobufPackage = "userProto";

export interface UserRequest {
  id: number;
}

export interface UsersRequest {
  ids: number[];
}

export interface UserResponse {
  name: string;
  age: number;
}

export const USER_PROTO_PACKAGE_NAME = "userProto";

export interface UserServiceClient {
  getUser: (request: UserRequest) => Observable<UserResponse>;

  getUsers: (request: Observable<UsersRequest>) => Observable<UserResponse>;
}

export interface UserServiceController {
  getUser: (
    request: UserRequest
  ) => Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  getUsers: (request: Observable<UsersRequest>) => Observable<UserResponse>;
}

export function UserServiceControllerMethods() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("UserService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = ["getUsers"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("UserService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
