export const updateFieldOptions = (fields: any, fieldName: string, options: any) => {
    return fields.map((section: any) => {
        if (section.name === 'info') {
            const updatedSubFields = section.subFields.map((subField: any) => {
                if (subField.name === fieldName) {
                    return { ...subField, options: options };
                }
                return subField;
            });
            return { ...section, subFields: updatedSubFields };
        }
        return section;
    });
};