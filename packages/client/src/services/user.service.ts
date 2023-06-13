import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import { ClientGrpc, RpcException } from "@nestjs/microservices";
import {
  USER_PROTO_PACKAGE_NAME,
  USER_SERVICE_NAME,
  type UserRequest,
  type UserResponse,
  type UserServiceClient,
  type UsersRequest,
} from "@user-management/common";
import { lastValueFrom, ReplaySubject } from "rxjs";
import { toArray } from "rxjs/operators";

@Injectable()
export class UserService implements OnModuleInit {
  private userServiceClient!: UserServiceClient;

  constructor(
    @Inject(USER_PROTO_PACKAGE_NAME) public readonly client: ClientGrpc
  ) {}

  onModuleInit(): void {
    this.userServiceClient =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  /**
   *
   * @param data
   */
  async getUser(data: UserRequest): Promise<UserResponse> {
    const userResponse = this.userServiceClient?.getUser(data);
    if (typeof userResponse === "undefined") {
      throw new RpcException("helloServiceClient is undefined");
    }
    // Convert Observable object to promise object
    return await lastValueFrom(userResponse);
  }

  /**
   *
   * @param data
   */
  async getUsers(data: UsersRequest): Promise<UserResponse[]> {
    const ids$ = new ReplaySubject<UsersRequest>();
    ids$.next({ ids: data.ids });

    ids$.complete();
    const stream = this.userServiceClient?.getUsers(ids$.asObservable());
    if (typeof stream === "undefined") {
      throw new RpcException("userServiceClient is undefined");
    }
    return await lastValueFrom(stream.pipe(toArray()));
  }
}
