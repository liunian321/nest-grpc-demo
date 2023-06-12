# Nest gRPC microservice demo
Since the official example is too simple, I wrote a more comprehensive nest gRPC example. This project is based on nest microservices, with server and client
## How to start the server?
```sh
pnpm run dev
```
## How to start the client?
```sh
npm run start -- --entryFile repl
```
See the official example for more information
https://docs.nestjs.com/recipes/repl
### How to build proto file?
Enter the common directory and execute the command:
```sh
pnpm run proto-generate
```
See the official example for more information
https://github.com/stephenh/ts-proto
## question
#### Does gRPC it support persistent connections?
Yes,gRPC is based on the http protocol, and http is based on the tcp protocol. So gRPC also supports long connections.
#### Will this project be updated in the future?
Yes,I'm planning to add permission checks to secure microservices.
