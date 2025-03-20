import { test, expect } from "@effect/vitest"
import { Effect } from "effect"

import { env } from "~/env"

test("minimal", () =>
  Effect.gen(function* () {
    const value = yield* Effect.succeed(env.MY_VARIABLE)
    expect(value).toBe(env.MY_VARIABLE)
  }))
