import { type GrpcOptions, Transport } from "@nestjs/microservices";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config();

export const grpcOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: "CancelLikePageProto",
    url: process.env.GRPC_URL,
    protoPath: join(
      __dirname,
      "../../node_modules/@hello-world/common/dist/hello.proto"
    ),
  },
};
