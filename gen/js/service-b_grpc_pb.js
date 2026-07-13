// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var service$b_pb = require('./service-b_pb.js');

function serialize_demo_ProcessRequest(arg) {
  if (!(arg instanceof service$b_pb.ProcessRequest)) {
    throw new Error('Expected argument of type demo.ProcessRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_demo_ProcessRequest(buffer_arg) {
  return service$b_pb.ProcessRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_demo_ProcessResponse(arg) {
  if (!(arg instanceof service$b_pb.ProcessResponse)) {
    throw new Error('Expected argument of type demo.ProcessResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_demo_ProcessResponse(buffer_arg) {
  return service$b_pb.ProcessResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ServiceBService = exports.ServiceBService = {
  processData: {
    path: '/demo.ServiceB/ProcessData',
    requestStream: false,
    responseStream: false,
    requestType: service$b_pb.ProcessRequest,
    responseType: service$b_pb.ProcessResponse,
    requestSerialize: serialize_demo_ProcessRequest,
    requestDeserialize: deserialize_demo_ProcessRequest,
    responseSerialize: serialize_demo_ProcessResponse,
    responseDeserialize: deserialize_demo_ProcessResponse,
  },
};

exports.ServiceBClient = grpc.makeGenericClientConstructor(ServiceBService, 'ServiceB');
