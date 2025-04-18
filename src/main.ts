import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { FetchHttpClient, PlatformConfigProvider } from "@effect/platform"
import * as Otlp from "@effect/opentelemetry/Otlp"
import { Effect, Layer } from "effect"

const Observability = Otlp.layer({
  baseUrl: "http://localhost:4318",
  resource: {
    serviceName: "effect",
  },
}).pipe(Layer.provide(FetchHttpClient.layer))

const program = Effect.gen(function* () {
  yield* Effect.log("Hello Effect!")
}).pipe(Effect.withSpan("program"))

const MainLayer = Layer.mergeAll(
  Observability,
  PlatformConfigProvider.layerDotEnvAdd(".env"),
).pipe(Layer.provideMerge(NodeContext.layer))

program.pipe(Effect.provide(MainLayer), NodeRuntime.runMain)
