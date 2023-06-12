import { type HelloRequest, type HelloResponse } from "@hello-world/common";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HelloProvider {
  static users = [
    { id: "1", name: "John" },
    { id: "2", name: "Doe" },
    { id: "3", name: "Smith" },
  ];

  /**
   * Get message
   * @param requestData
   */
  getMessage(requestData: HelloRequest): HelloResponse {
    const user = HelloProvider.users.find((user) => user.id === requestData.id);
    if (typeof user === "undefined") {
      throw new Error("UserName not found");
    }
    return { name: user.name };
  }
}
