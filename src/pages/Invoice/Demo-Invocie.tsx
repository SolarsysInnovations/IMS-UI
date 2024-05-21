import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextFieldUi from '../../components/ui/TextField';
import SelectDropdown from '../../components/ui/SelectDropdown';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import { useGetServiceQuery } from '../../redux-store/service/serviceApi';
import { useAddCustomerMutation, useGetCustomersQuery } from '../../redux-store/customer/customerApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { ToastContainer, toast } from 'react-toastify';
import { customerFields, invoiceFields } from '../../constants/form-data/form-data-json';
import { customerInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { customerValidationSchema, invoiceValidationSchema } from '../../constants/forms/validations/validationSchema';
import useSuccessToast from '../../hooks/useToast';
import { generateOptions } from '../../services/utils/dropdownOptions';
import { updateFieldOptions } from '../../services/utils/formFieldoptions';

interface Service {
    id: string; // Ensure id is mandatory
    serviceAccountingCode: string;
    serviceDescription: string;
    serviceAmount: number;
}



export default function DemoInvoice() {
    const [addCustomer, { isLoading, isSuccess, isError, error }] = useAddCustomerMutation();
    const { data: serviceList } = useGetServiceQuery();
    const [modifiedServiceList, setModifiedServiceList] = React.useState<Service[]>([]);
    const [selectedAccountingCode, setSelectedAccountingCode] = React.useState<string | null>(null);
    const [rows, setRows] = React.useState<any[]>([]); // Initialize rows as an empty array

    const rowIdCounter = React.useRef<number>(0); // Ref for keeping track of row IDs


    React.useEffect(() => {
        if (serviceList) {
            const mappedServiceList = serviceList.map((s: any) => ({
                id: `${rowIdCounter.current++}`, // Manually assign unique ID
                serviceAccountingCode: s.serviceAccountingCode,
                serviceDescription: s.serviceDescription,
                quantity: 0,
                serviceAmount: s.serviceAmount,
                amount: 0,
            }));
            setModifiedServiceList(mappedServiceList);
        }
    }, [serviceList]);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
        const updatedRows = [...rows];
        const quantity = parseInt(value); // Parse the value to an integer
        const serviceAmount = updatedRows[index].serviceAmount; // Get the service amount from the row
        const amount = quantity * serviceAmount; // Calculate the amount
        updatedRows[index] = {
            ...updatedRows[index],
            quantity,
            amount // Update the amount in the row
        };
        setRows(updatedRows);
    };

    const handleAddRow = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const newRow = {
            id: `row_${Date.now()}`,
            serviceAccountingCode: "",
            quantity: 0,
            serviceAmount: 0,
            amount: 0
        };
        setRows([...rows, newRow]);
    };

    const handleRemoveRow = (id: string) => {
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
    };
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Service Accounting Code</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="left">Service Amount</TableCell>
                            <TableCell align="left">Amount</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="row">
                                    <SelectDropdown
                                        onMouseDown={() => {
                                            // navigate("/customer/create")
                                            console.log("Add new");
                                        }}
                                        button={true}
                                        options={modifiedServiceList.map((service) => ({
                                            label: service.serviceAccountingCode,
                                            value: service.serviceAccountingCode
                                        }))}
                                        value={item.serviceAccountingCode ? { label: item.serviceAccountingCode, value: item.serviceAccountingCode } : null}
                                        onChange={(e: any) => {
                                            if (e) {
                                                setSelectedAccountingCode(e.value);
                                                const selectedService = modifiedServiceList.find(service => service.serviceAccountingCode === e.value);
                                                if (selectedService) {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index] = { ...selectedService, id: item.id }; // Update the existing row with the selected service
                                                    setRows(updatedRows);
                                                }
                                            } else {
                                                const updatedRows = [...rows];
                                                updatedRows[index] = {
                                                    ...updatedRows[index],
                                                    serviceAccountingCode: "",
                                                    quantity: 0,
                                                    amount: 0
                                                };
                                                setRows(updatedRows);
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextFieldUi
                                        type='number'
                                        value={item?.quantity}
                                        label='INout sample'
                                        onChange={(e) => handleQuantityChange(e, index)}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextFieldUi type='number' value={item?.serviceAmount} label='INout sample' />
                                </TableCell>
                                <TableCell align="right">{item?.amount}</TableCell>
                                <TableCell align="right">
                                    <ButtonSmallUi type='button' onClick={() => handleRemoveRow(item.id)} label='Remove' />
                                </TableCell>
                            </TableRow>
                        ))}
                        <ButtonSmallUi type='button' onClick={handleAddRow} label='Add' />
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};


