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

const todos = [];
server.addService(todoPackage.Todo.service, {
  createTodo(call, callback) {
    const todoLength = todos.push({
      id: todos.length + 1,
      text: call.request.text,
    });

    callback(null, todos[todoLength - 1]);
  },
  readTodos(call, callback) {
    console.log(call);

    callback(null, { todos });
  },
});

// bypass http2 credentials
server.bindAsync(
  '0.0.0.0:40000',
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
    console.log('SERVER STARTED');
  }
);
