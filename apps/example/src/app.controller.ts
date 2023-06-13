import { Logger } from "@nest-boot/logger";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "@user-management/client";
import { type UserResponse } from "@user-management/common";

@Controller("user")
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger
  ) {
    this.logger.setContext(AppController.name);
  }

  @Get(":id")
  async getUser(@Param("id") id: string): Promise<UserResponse> {
    let userId;
    try {
      userId = parseInt(id);
    } catch (e) {
      this.logger.error("parseInt error");
    }

    try {
      return await this.userService.getUser({ id: userId });
    } catch (e) {
      this.logger.error("getUser error", e);
    }
  }

  @Post()
  async getUsers(@Body() data: { ids: number[] }): Promise<UserResponse[]> {
    try {
      return await this.userService.getUsers({ ids: data.ids });
    } catch (e) {
      this.logger.error("getUsers error", e);
    }
  }
}
