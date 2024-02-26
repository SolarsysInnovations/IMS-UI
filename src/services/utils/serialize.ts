
export const serializeFormValues = (values: any): any => {
    // If values are already serializable, return them as is
    if (typeof values === 'string' || typeof values === 'number' || typeof values === 'boolean' || values === null) {
        return values;
    }

    if (Array.isArray(values)) {
        return values.map((value) => serializeFormValues(value));
    }

    if (typeof values === 'object') {
        const serializedObject: any = {};
        for (const key in values) {
            serializedObject[key] = serializeFormValues(values[key]);
        }
        return serializedObject;
    }
    return null;
};
