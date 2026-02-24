import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const packageDef = protoLoader.loadSync('service-b.proto');
const grpcObject = grpc.loadPackageDefinition(packageDef);
const demo = grpcObject.demo;

const server = new grpc.Server();

server.addService(demo.ServiceB.service, {
  ProcessData: (call, callback) => {
    const input = call.request.input;
    console.log(`[Service B] Received: ${input}`);
    callback(null, { output: `Processed: ${input.toUpperCase()}` });
  }
});

server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
  console.log("🚀 Service B running on port 50052");
  server.start();
});
