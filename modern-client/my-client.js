import { createClient } from "@connectrpc/connect";
import { createGrpcTransport } from "@connectrpc/connect-node";

// Cleanly import each service from its own generated file
import { ServiceA } from "./gen/js/service-a_pb.js";
import { ServiceB } from "./gen/js/service-b_pb.js";

async function main() {
  // 1. Setup transports to talk to your running legacy gRPC servers
  const transportA = createGrpcTransport({ baseUrl: "http://localhost:50051" });
  const transportB = createGrpcTransport({ baseUrl: "http://localhost:50052" });

  // 2. Instantiate clients
  const clientA = createClient(ServiceA, transportA);
  const clientB = createClient(ServiceB, transportB);

  console.log("🚀 Launching modern Connect v2 clients...");

  try {
    // --- CALL SERVICE A ---
    console.log("\nCalling Service A...");
    const responseA = await clientA.getData({ query: "Hello Service A!" });
    console.log("✅ Service A Response:", responseA.result);

    // --- CALL SERVICE B ---
    console.log("\nCalling Service B...");
    const responseB = await clientB.processData({ input: "hello service b!" });
    console.log("✅ Service B Response:", responseB.output);

  } catch (error) {
    console.error("❌ Modern gRPC Call Failed:", error);
  }
}

main();
