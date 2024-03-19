import React, { ChangeEvent } from 'react';
import TextFieldUi from '../ui/TextField';

interface FieldInfo {
    type?: string;
    value?: string | number;
    error?: any;
    helperText?: string;
}

interface InputObject {
    [fieldName: string]: FieldInfo;
}

interface DynamicFormProps {
    inputObject?: InputObject;
    handleInputChange?: (fieldName: string, value: string | number) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ inputObject = {}, handleInputChange }) => {
    const handleChange = (fieldName: string, value: string | number) => {
        if (handleInputChange) {
            handleInputChange(fieldName, value);
        }
    };

    return (
        <div>
            {Object.entries(inputObject).map(([fieldName, fieldInfo]) => {
                switch (fieldInfo.type) {
                    case 'text':
                        return (
                            <TextFieldUi
                                key={fieldName}
                                label={fieldName}
                                value={fieldInfo.value as string}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(fieldName, e.target.value)}
                                error={fieldInfo.error}
                                helperText={fieldInfo.helperText}
                            />
                        );
                    case 'number':
                        return (
                            <TextFieldUi
                                key={fieldName}
                                label={fieldName}
                                type="number"
                                value={fieldInfo.value as number}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(fieldName, Number(e.target.value))}
                                error={fieldInfo.error}
                                helperText={fieldInfo.helperText}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default DynamicForm;
