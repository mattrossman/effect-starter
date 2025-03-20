import { test, expect } from "@effect/vitest"
import { Effect } from "effect"

test("minimal", () =>
  Effect.gen(function* () {
    const value = yield* Effect.succeed(1)
    expect(value).toBe(1)
  }))
