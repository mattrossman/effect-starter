import { it, expect } from "@effect/vitest"
import { Effect } from "effect"

import { env } from "~/env"

it.effect("minimal", () =>
  Effect.gen(function* () {
    const value = yield* Effect.succeed(env.MY_VARIABLE)
    expect(value).toBe(env.MY_VARIABLE)
  }),
)
