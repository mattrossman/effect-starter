import { PlatformConfigProvider } from "@effect/platform"
import { NodeContext } from "@effect/platform-node"
import { it, expect } from "@effect/vitest"
import { Effect, Layer } from "effect"

const TestLayer = PlatformConfigProvider.layerDotEnvAdd(".env").pipe(
  Layer.provide(NodeContext.layer),
)

it.effect("minimal", () =>
  Effect.gen(function* () {
    const foo = yield* Effect.succeed("foo")
    expect(foo).toBe("foo")
  }).pipe(Effect.provide(TestLayer)),
)
