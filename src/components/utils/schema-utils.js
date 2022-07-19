/**
 * Returns whether the given schema matches the target type. Handles single and multi-type expressions.
 * @param schema
 * @param target
 * @returns {boolean}
 */
export function schemaTypeContains(schema, target) {
    if (typeof(schema.type) === 'string') {
        return target === schema.type
    }
    else {
        // other valid schema type is an array
        return schema.type.includes(target)
    }
}