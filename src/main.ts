import { NodeSdk } from "@effect/opentelemetry"
import { NodeRuntime } from "@effect/platform-node"
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { Effect } from "effect"

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "effect" },
  spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter()),
}))

const program = Effect.gen(function* () {
  yield* Effect.log("Hello Effect!")
}).pipe(Effect.withSpan("program"))

program.pipe(Effect.provide(NodeSdkLive), NodeRuntime.runMain)
