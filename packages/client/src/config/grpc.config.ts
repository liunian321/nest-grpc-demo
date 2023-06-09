import { type GrpcOptions, Transport } from "@nestjs/microservices";
import { protobufPackage } from "@user-management/common";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config();

export const grpcOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: protobufPackage,
    url: process.env.GRPC_URL,
    protoPath: join(__dirname, "../../../common/dist/user.proto"),
  },
};
