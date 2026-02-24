import express from 'express';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load Service A proto
const protoPath = path.join('../service-a', 'service-a.proto');
const packageDef = protoLoader.loadSync(protoPath);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const demoA = grpcObject.demo;

// gRPC client for Service A
const clientA = new demoA.ServiceA('localhost:50051', grpc.credentials.createInsecure());

const app = express();

// Route 1: Simple data from Service A
app.get('/data', (req, res) => {
  const q = req.query.q || 'default';
  clientA.GetData({ query: q }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.send(response);
  });
});

// Route 2: Processed data (Service A → Service B)
app.get('/processed', (req, res) => {
  const q = req.query.q || 'default';
  clientA.GetProcessedData({ query: q }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.send(response);
  });
});

app.listen(3000, () => console.log('🚀 API Gateway running on http://localhost:3000'));
