const grpc = require('@grpc/grpc-js');
const serviceB = require('../gen/js/service-b_grpc_pb.js');
const messagesB = require('../gen/js/service-b_pb.js');

const server = new grpc.Server();

server.addService(serviceB.ServiceBService, {
  processData: (call, callback) => {
    const input = call.request.getInput();
    console.log(`[Service B] Received: ${input}`);
    
    const response = new messagesB.ProcessResponse();
    response.setOutput(`Processed: ${input.toUpperCase()}`);
    callback(null, response);
  }
});

server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
  console.log("🚀 Service B running (Generated Types)");
});
