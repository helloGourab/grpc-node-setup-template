// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var service$a_pb = require('./service-a_pb.js');

function serialize_demo_DataRequest(arg) {
  if (!(arg instanceof service$a_pb.DataRequest)) {
    throw new Error('Expected argument of type demo.DataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_demo_DataRequest(buffer_arg) {
  return service$a_pb.DataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_demo_DataResponse(arg) {
  if (!(arg instanceof service$a_pb.DataResponse)) {
    throw new Error('Expected argument of type demo.DataResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_demo_DataResponse(buffer_arg) {
  return service$a_pb.DataResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ServiceAService = exports.ServiceAService = {
  getData: {
    path: '/demo.ServiceA/GetData',
    requestStream: false,
    responseStream: false,
    requestType: service$a_pb.DataRequest,
    responseType: service$a_pb.DataResponse,
    requestSerialize: serialize_demo_DataRequest,
    requestDeserialize: deserialize_demo_DataRequest,
    responseSerialize: serialize_demo_DataResponse,
    responseDeserialize: deserialize_demo_DataResponse,
  },
  getProcessedData: {
    path: '/demo.ServiceA/GetProcessedData',
    requestStream: false,
    responseStream: false,
    requestType: service$a_pb.DataRequest,
    responseType: service$a_pb.DataResponse,
    requestSerialize: serialize_demo_DataRequest,
    requestDeserialize: deserialize_demo_DataRequest,
    responseSerialize: serialize_demo_DataResponse,
    responseDeserialize: deserialize_demo_DataResponse,
  },
  // calls ServiceB internally
};

exports.ServiceAClient = grpc.makeGenericClientConstructor(ServiceAService, 'ServiceA');
