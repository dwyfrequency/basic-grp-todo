const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('protos/todo.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();

server.addService(todoPackage.Todo.service, {
  createTodo(call, callback) {
    console.log(call);
  },
  readTodos(call, callback) {
    console.log(call);
  },
});

// bypass http2 credentials
server.bindAsync(
  '0.0.0.0:40000',
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
