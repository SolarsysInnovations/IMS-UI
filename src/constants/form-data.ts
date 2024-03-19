interface TextField {
    type: 'text' | 'number'; // Update type to include 'number'
    value: any; // Update value type to string or number
    error: string;
    fullWidth: boolean;
    label: string;
    onChange: (value: string) => void; // Adjust the onChange function type
    helperText: string;
}

interface DropdownField {
    type: 'dropdown';
    value: string;
    options: string[]; // Add options property for dropdown fields
    error: string;
    fullWidth: boolean;
    label: string;
    onChange: (value: string) => void; // Adjust the onChange function type
    helperText: string;
}

// Define the InputObject type using union type
type InputObject = {
    [key: string]: TextField | DropdownField; // Use union type to allow different field structures
};

// Define inputObject with proper structure
const inputObjects: InputObject = {
    email: {
        type: 'text',
        value: '',
        error: '',
        fullWidth: false,
        label: 'email',
        onChange: (value: string) => { }, // Provide a valid function here if needed
        helperText: ''
    },
    phoneNumber: {
        type: 'number',
        value: '',
        error: '',
        fullWidth: false,
        label: 'phoneNumber',
        onChange: (value: string) => { }, // Provide a valid function here if needed
        helperText: ''
    },
    movies: {
        type: 'dropdown',
        options: ['Option 1', 'Option 2'], // Include options for dropdown field
        value: '',
        error: '',
        fullWidth: false,
        label: 'movies',
        onChange: (value: string) => { }, // Provide a valid function here if needed
        helperText: ''
    },
};

export default inputObjects;
