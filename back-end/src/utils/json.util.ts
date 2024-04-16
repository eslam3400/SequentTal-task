import { JsonObject, JsonValue } from '@prisma/client/runtime/library'

export function toPrismaJsonObject(data: any): JsonObject {
  const result: JsonObject = {}
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key]
      result[key] = value as JsonValue
    }
  }
  return result
}
