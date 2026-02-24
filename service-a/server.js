import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

// Load A’s proto
const packageDefA = protoLoader.loadSync('service-a.proto');
const grpcObjectA = grpc.loadPackageDefinition(packageDefA);
const demoA = grpcObjectA.demo;

// Load B’s proto for client
const packageDefB = protoLoader.loadSync('../service-b/service-b.proto');
const grpcObjectB = grpc.loadPackageDefinition(packageDefB);
const demoB = grpcObjectB.demo;

// Client for Service B
const clientB = new demoB.ServiceB('localhost:50052', grpc.credentials.createInsecure());

const server = new grpc.Server();

server.addService(demoA.ServiceA.service, {
  GetData: (call, callback) => {
    const query = call.request.query;
    console.log(`[Service A] GetData called with: ${query}`);
    callback(null, { result: `Service A responding with data for: ${query}` });
  },
  GetProcessedData: (call, callback) => {
    const query = call.request.query;
    console.log(`[Service A] Forwarding request to Service B: ${query}`);

    clientB.ProcessData({ input: query }, (err, response) => {
      if (err) {
        console.error("Error from Service B:", err);
        return callback(err, null);
      }
      callback(null, { result: `Service A got this from B: ${response.output}` });
    });
  }
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log("🚀 Service A running on port 50051");
  server.start();
});
