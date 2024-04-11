import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormFieldRenderer from '../../components/Form-renderer/Form-field-renderer';
import { Add } from '@mui/icons-material';

interface DynamicFormProps {
    errors: any;
    touched: any;
    handleSubmit: () => void;
    values: any;
    handleChange: any;
    setFieldValue: any;
}

const DynamicForm = ({
    errors,
    touched,
    handleSubmit,
    values,
    handleChange,
    setFieldValue
}: DynamicFormProps) => {
    const navigate = useNavigate();
    const [customerContactFields, setCustomerContactFields] = useState([
        [
            {
                type: 'tableHeader',
                headerName: 'Contact person',
                gridSize: 12,
                buttons: [
                    { label: 'Add', icon: Add, onClick: "handleAdd" },
                ],
            },
        ],
        [
            {
                name: "contactName",
                type: "text",
                label: "contactName",
                gridSize: 3,
            },
            {
                name: "contactEmail",
                type: "text",
                label: "Contact Email",
                gridSize: 3,
            },
            {
                type: "gridBreak"
            },
        ],
    ]);
    const [numArraysAdded, setNumArraysAdded] = useState(1);

    const handleAddArray = () => {
        if (numArraysAdded < 2) {
            const newArray = [
                [
                    {
                        name: "contactName",
                        type: "text",
                        label: "contactName",
                        gridSize: 3,
                    },
                    {
                        name: "contactEmail",
                        type: "text",
                        label: "Contact Email",
                        gridSize: 3,
                    },
                    {
                        type: "gridBreak"
                    },
                ],
            ];
            setCustomerContactFields(prevFields => [...prevFields, ...newArray]);
            setNumArraysAdded(prevNum => prevNum + 1); // Incrementing the count
        }
    };

    return (
        <>
            {customerContactFields.map((fields, index) => (
                <React.Fragment key={index}>
                    {fields.map((field: any, subIndex: number) => (
                        <FormFieldRenderer
                            handleAdd={handleAddArray}
                            errors={errors}
                            touched={touched}
                            handleBack={() => navigate(-1)}
                            handleSave={handleSubmit}
                            key={subIndex}
                            field={field}
                            formData={values}
                            onChange={handleChange}
                            setFormData={(fieldName: string, value: any) => {
                                setFieldValue(fieldName, value);
                            }}
                        />
                    ))}
                </React.Fragment>
            ))}
        </>
    );
};

export default DynamicForm;
