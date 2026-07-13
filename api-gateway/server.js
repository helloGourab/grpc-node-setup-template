const express = require('express');
const grpc = require('@grpc/grpc-js');
const serviceA = require('../gen/js/service-a_grpc_pb.js');
const messagesA = require('../gen/js/service-a_pb.js');

// gRPC client for Service A
const clientA = new serviceA.ServiceAClient('localhost:50051', grpc.credentials.createInsecure());

const app = express();

// Route 1: Simple data from Service A
app.get('/data', (req, res) => {
  const q = req.query.q || 'default';
  
  const request = new messagesA.DataRequest();
  request.setQuery(q);

  clientA.getData(request, (err, response) => {
    if (err) return res.status(500).send(err);
    res.send(response.toObject());
  });
});

// Route 2: Processed data (Service A → Service B)
app.get('/processed', (req, res) => {
  const q = req.query.q || 'default';
  
  const request = new messagesA.DataRequest();
  request.setQuery(q);

  clientA.getProcessedData(request, (err, response) => {
    if (err) return res.status(500).send(err);
    res.send(response.toObject());
  });
});

app.listen(3000, () => console.log('🚀 API Gateway running on http://localhost:3000'));
