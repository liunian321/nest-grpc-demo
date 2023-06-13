import { Logger } from "@nest-boot/logger";
import { Controller } from "@nestjs/common";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import {
  USER_SERVICE_NAME,
  UserRequest,
  type UserResponse,
  UserServiceControllerMethods,
  type UsersRequest,
} from "@user-management/common";
import { type Observable, Subject } from "rxjs";

import { UserService } from "../services/user.service";

@Controller()
@UserServiceControllerMethods()
export class UserController {
  constructor(
    private readonly logger: Logger,
    private readonly userService: UserService
  ) {
    this.logger.setContext(UserController.name);
  }

  @GrpcMethod(USER_SERVICE_NAME)
  getUser(request: UserRequest): UserResponse {
    try {
      return this.userService.getUser(request);
    } catch (e) {
      this.logger.error("error", e);
      return { name: "", age: 0 };
    }
  }

  @GrpcStreamMethod(USER_SERVICE_NAME)
  getUsers(request: Observable<UsersRequest>): Observable<UserResponse> {
    try {
      return this.userService.getUsers(request);
    } catch (e) {
      this.logger.error("error", e);
      return new Subject<UserResponse>().asObservable();
    }
  }
}
