import { type GrpcOptions } from "@nestjs/microservices";

type BaseGrpcOptions = Pick<GrpcOptions["options"], "url" | "keepalive">;

export interface UserModuleOptions extends BaseGrpcOptions {}
