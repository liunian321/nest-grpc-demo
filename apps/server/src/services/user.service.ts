import { Injectable } from "@nestjs/common";
import {
  type UserRequest,
  type UserResponse,
  type UsersRequest,
} from "@user-management/common";
import { type Observable, Subject } from "rxjs";

const users = new Map<number, { id: number; name: string; age: number }>([
  [1, { id: 1, name: "John", age: 18 }],
  [2, { id: 2, name: "Doe", age: 19 }],
  [3, { id: 3, name: "Smith", age: 20 }],
]);

@Injectable()
export class UserService {
  /**
   * Get message
   * @param requestData
   */
  getUser(requestData: UserRequest): UserResponse {
    const user = users.get(requestData.id);
    if (typeof user === "undefined") {
      throw new Error("UserName not found");
    }
    return user;
  }

  getUsers(requestData$: Observable<UsersRequest>): Observable<UserResponse> {
    const user$ = new Subject<UserResponse>();

    const onNext = (requestData: UsersRequest): void => {
      for (const id of requestData.ids) {
        const user: { id: number; name: string; age: number } | undefined =
          users.get(id);

        if (typeof user !== "undefined") {
          user$.next(user);
        }
      }
    };

    const onComplete = (): void => {
      user$.complete();
    };

    requestData$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return user$.asObservable();
  }
}
