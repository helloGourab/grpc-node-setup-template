const grpc = require('@grpc/grpc-js');
const serviceA = require('../gen/js/service-a_grpc_pb.js');
const messagesA = require('../gen/js/service-a_pb.js');
const serviceB = require('../gen/js/service-b_grpc_pb.js'); 
const messagesB = require('../gen/js/service-b_pb.js');

// Setup Client for Service B using generated stubs
const clientB = new serviceB.ServiceBClient('localhost:50052', grpc.credentials.createInsecure());

const server = new grpc.Server();

server.addService(serviceA.ServiceAService, {
  // Lowercase 'g' to match the generated router schema
  getData: (call, callback) => {
    const query = call.request.getQuery();
    console.log(`[Service A] GetData called with: ${query}`);
    
    const response = new messagesA.DataResponse();
    response.setResult(`Service A responding with data for: ${query}`);
    callback(null, response);
  },
  
  // Lowercase 'g' to match the generated router schema
  getProcessedData: (call, callback) => {
    const query = call.request.getQuery();
    console.log(`[Service A] Forwarding to B: ${query}`);

    const reqB = new messagesB.ProcessRequest();
    reqB.setInput(query);

    clientB.processData(reqB, (err, response) => {
      if (err) return callback(err);
      
      const res = new messagesA.DataResponse();
      res.setResult(`Service A got from B: ${response.getOutput()}`);
      callback(null, res);
    });
  }
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log("🚀 Service A running (Generated Types)");
});
