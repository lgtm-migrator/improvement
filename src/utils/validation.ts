export const isObjectWithUnknownProperties = (
    item: unknown
): item is Record<PropertyKey, unknown> =>
    typeof item === 'object' && item !== null
