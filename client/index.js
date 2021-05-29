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

const client = new todoPackage.Todo(
  'localhost:40000',
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: -1,
    text: 'Do laundry!',
  },
  (err, response) => {
    if (err) console.error(err);
    else console.log(`Recieved from server ${JSON.stringify(response)}`);
  }
);
