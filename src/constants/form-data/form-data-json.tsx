import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { FieldProps } from "../../types/types";
import { useGetCustomersQuery } from "../../redux-store/customer/customerApi";
import { generateOptions } from "../../services/utils/dropdownOptions";


const countries = [
    { value: "afghanistan", label: "Afghanistan" },
    { value: "albania", label: "Albania" },
    { value: "algeria", label: "Algeria" },
    { value: "andorra", label: "Andorra" },
    { value: "angola", label: "Angola" },
    { value: "antigua-and-barbuda", label: "Antigua and Barbuda" },
    { value: "argentina", label: "Argentina" },
    { value: "armenia", label: "Armenia" },
    { value: "australia", label: "Australia" },
    { value: "austria", label: "Austria" },
    { value: "azerbaijan", label: "Azerbaijan" },
    { value: "bahamas", label: "Bahamas" },
    { value: "bahrain", label: "Bahrain" },
    { value: "bangladesh", label: "Bangladesh" },
    { value: "barbados", label: "Barbados" },
    { value: "belarus", label: "Belarus" },
    { value: "belgium", label: "Belgium" },
    { value: "belize", label: "Belize" },
    { value: "benin", label: "Benin" },
    { value: "bhutan", label: "Bhutan" },
    { value: "bolivia", label: "Bolivia" },
    { value: "bosnia-and-herzegovina", label: "Bosnia and Herzegovina" },
    { value: "botswana", label: "Botswana" },
    { value: "brazil", label: "Brazil" },
    { value: "brunei", label: "Brunei" },
    { value: "bulgaria", label: "Bulgaria" },
    { value: "burkina-faso", label: "Burkina Faso" },
    { value: "burundi", label: "Burundi" },
    { value: "cabo-verde", label: "Cabo Verde" },
    { value: "cambodia", label: "Cambodia" },
    { value: "cameroon", label: "Cameroon" },
    { value: "canada", label: "Canada" },
    { value: "central-african-republic", label: "Central African Republic" },
    { value: "chad", label: "Chad" },
    { value: "chile", label: "Chile" },
    { value: "china", label: "China" },
    { value: "colombia", label: "Colombia" },
    { value: "comoros", label: "Comoros" },
    { value: "congo-brazzaville", label: "Congo (Brazzaville)" },
    { value: "congo-kinshasa", label: "Congo (Kinshasa)" },
    { value: "costa-rica", label: "Costa Rica" },
    { value: "croatia", label: "Croatia" },
    { value: "cuba", label: "Cuba" },
    { value: "cyprus", label: "Cyprus" },
    { value: "czechia", label: "Czechia" },
    { value: "denmark", label: "Denmark" },
    { value: "djibouti", label: "Djibouti" },
    { value: "dominica", label: "Dominica" },
    { value: "dominican-republic", label: "Dominican Republic" },
    { value: "ecuador", label: "Ecuador" },
    { value: "egypt", label: "Egypt" },
    { value: "el-salvador", label: "El Salvador" },
    { value: "equatorial-guinea", label: "Equatorial Guinea" },
    { value: "eritrea", label: "Eritrea" },
    { value: "estonia", label: "Estonia" },
    { value: "eswatini", label: "Eswatini" },
    { value: "ethiopia", label: "Ethiopia" },
    { value: "fiji", label: "Fiji" },
    { value: "finland", label: "Finland" },
    { value: "france", label: "France" },
    { value: "gabon", label: "Gabon" },
    { value: "gambia", label: "Gambia" },
    { value: "georgia", label: "Georgia" },
    { value: "germany", label: "Germany" },
    { value: "ghana", label: "Ghana" },
    { value: "greece", label: "Greece" },
    { value: "grenada", label: "Grenada" },
    { value: "guatemala", label: "Guatemala" },
    { value: "guinea", label: "Guinea" },
    { value: "guinea-bissau", label: "Guinea-Bissau" },
    { value: "guyana", label: "Guyana" },
    { value: "haiti", label: "Haiti" },
    { value: "honduras", label: "Honduras" },
    { value: "hungary", label: "Hungary" },
    { value: "iceland", label: "Iceland" },
    { value: "india", label: "India" },
    { value: "indonesia", label: "Indonesia" },
    { value: "iran", label: "Iran" },
    { value: "iraq", label: "Iraq" },
    { value: "ireland", label: "Ireland" },
    { value: "israel", label: "Israel" },
    { value: "italy", label: "Italy" },
    { value: "jamaica", label: "Jamaica" },
    { value: "japan", label: "Japan" },
    { value: "jordan", label: "Jordan" },
    { value: "kazakhstan", label: "Kazakhstan" },
    { value: "kenya", label: "Kenya" },
    { value: "kiribati", label: "Kiribati" },
    { value: "north-korea", label: "North Korea" },
    { value: "south-korea", label: "South Korea" },
    { value: "kosovo", label: "Kosovo" },
    { value: "kuwait", label: "Kuwait" },
    { value: "kyrgyzstan", label: "Kyrgyzstan" },
    { value: "laos", label: "Laos" },
    { value: "latvia", label: "Latvia" },
    { value: "lebanon", label: "Lebanon" },
    { value: "lesotho", label: "Lesotho" },
    { value: "liberia", label: "Liberia" },
    { value: "libya", label: "Libya" },
    { value: "liechtenstein", label: "Liechtenstein" },
    { value: "lithuania", label: "Lithuania" },
    { value: "luxembourg", label: "Luxembourg" },
    { value: "madagascar", label: "Madagascar" },
    { value: "malawi", label: "Malawi" },
    { value: "malaysia", label: "Malaysia" },
    { value: "maldives", label: "Maldives" },
    { value: "mali", label: "Mali" },
    { value: "malta", label: "Malta" },
    { value: "marshall-islands", label: "Marshall Islands" },
    { value: "mauritania", label: "Mauritania" },
    { value: "mauritius", label: "Mauritius" },
    { value: "mexico", label: "Mexico" },
    { value: "micronesia", label: "Micronesia" },
    { value: "moldova", label: "Moldova" },
    { value: "monaco", label: "Monaco" },
    { value: "mongolia", label: "Mongolia" },
    { value: "montenegro", label: "Montenegro" },
    { value: "morocco", label: "Morocco" },
    { value: "mozambique", label: "Mozambique" },
    { value: "myanmar", label: "Myanmar" },
    { value: "namibia", label: "Namibia" },
    { value: "nauru", label: "Nauru" },
    { value: "nepal", label: "Nepal" },
    { value: "netherlands", label: "Netherlands" },
    { value: "new-zealand", label: "New Zealand" },
    { value: "nicaragua", label: "Nicaragua" },
    { value: "niger", label: "Niger" },
    { value: "nigeria", label: "Nigeria" },
    { value: "north-macedonia", label: "North Macedonia" },
    { value: "norway", label: "Norway" },
    { value: "oman", label: "Oman" },
    { value: "pakistan", label: "Pakistan" },
    { value: "palau", label: "Palau" },
    { value: "palestine", label: "Palestine" },
    { value: "panama", label: "Panama" },
    { value: "papua-new-guinea", label: "Papua New Guinea" },
    { value: "paraguay", label: "Paraguay" },
    { value: "peru", label: "Peru" },
    { value: "philippines", label: "Philippines" },
    { value: "poland", label: "Poland" },
    { value: "portugal", label: "Portugal" },
    { value: "qatar", label: "Qatar" },
    { value: "romania", label: "Romania" },
    { value: "russia", label: "Russia" },
    { value: "rwanda", label: "Rwanda" },
    { value: "saint-kitts-and-nevis", label: "Saint Kitts and Nevis" },
    { value: "saint-lucia", label: "Saint Lucia" },
    { value: "saint-vincent-and-the-grenadines", label: "Saint Vincent and the Grenadines" },
    { value: "samoa", label: "Samoa" },
    { value: "san-marino", label: "San Marino" },
    { value: "sao-tome-and-principe", label: "Sao Tome and Principe" },
    { value: "saudi-arabia", label: "Saudi Arabia" },
    { value: "senegal", label: "Senegal" },
    { value: "serbia", label: "Serbia" },
    { value: "seychelles", label: "Seychelles" },
    { value: "sierra-leone", label: "Sierra Leone" },
    { value: "singapore", label: "Singapore" },
    { value: "slovakia", label: "Slovakia" },
    { value: "slovenia", label: "Slovenia" },
    { value: "solomon-islands", label: "Solomon Islands" },
    { value: "somalia", label: "Somalia" },
    { value: "south-africa", label: "South Africa" },
    { value: "south-sudan", label: "South Sudan" },
    { value: "spain", label: "Spain" },
    { value: "sri-lanka", label: "Sri Lanka" },
    { value: "sudan", label: "Sudan" },
    { value: "suriname", label: "Suriname" },
    { value: "sweden", label: "Sweden" },
    { value: "switzerland", label: "Switzerland" },
    { value: "syria", label: "Syria" },
    { value: "taiwan", label: "Taiwan" },
    { value: "tajikistan", label: "Tajikistan" },
    { value: "tanzania", label: "Tanzania" },
    { value: "thailand", label: "Thailand" },
    { value: "timor-leste", label: "Timor-Leste" },
    { value: "togo", label: "Togo" },
    { value: "tonga", label: "Tonga" },
    { value: "trinidad-and-tobago", label: "Trinidad and Tobago" },
    { value: "tunisia", label: "Tunisia" },
    { value: "turkey", label: "Turkey" },
    { value: "turkmenistan", label: "Turkmenistan" },
    { value: "tuvalu", label: "Tuvalu" },
    { value: "uganda", label: "Uganda" },
    { value: "ukraine", label: "Ukraine" },
    { value: "united-arab-emirates", label: "United Arab Emirates" },
    { value: "united-kingdom", label: "United Kingdom" },
    { value: "united-states", label: "United States" },
    { value: "uruguay", label: "Uruguay" },
    { value: "uzbekistan", label: "Uzbekistan" },
    { value: "vanuatu", label: "Vanuatu" },
    { value: "vatican-city", label: "Vatican City" },
    { value: "venezuela", label: "Venezuela" },
    { value: "vietnam", label: "Vietnam" },
    { value: "yemen", label: "Yemen" },
    { value: "zambia", label: "Zambia" },
    { value: "zimbabwe", label: "Zimbabwe" },
];

const indianStates = [
    { value: "andhra-pradesh", label: "Andhra Pradesh" },
    { value: "arunachal-pradesh", label: "Arunachal Pradesh" },
    { value: "assam", label: "Assam" },
    { value: "bihar", label: "Bihar" },
    { value: "chhattisgarh", label: "Chhattisgarh" },
    { value: "goa", label: "Goa" },
    { value: "gujarat", label: "Gujarat" },
    { value: "haryana", label: "Haryana" },
    { value: "himachal-pradesh", label: "Himachal Pradesh" },
    { value: "jharkhand", label: "Jharkhand" },
    { value: "karnataka", label: "Karnataka" },
    { value: "kerala", label: "Kerala" },
    { value: "madhya-pradesh", label: "Madhya Pradesh" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "manipur", label: "Manipur" },
    { value: "meghalaya", label: "Meghalaya" },
    { value: "mizoram", label: "Mizoram" },
    { value: "nagaland", label: "Nagaland" },
    { value: "odisha", label: "Odisha" },
    { value: "punjab", label: "Punjab" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "sikkim", label: "Sikkim" },
    { value: "tamil-nadu", label: "Tamil Nadu" },
    { value: "telangana", label: "Telangana" },
    { value: "tripura", label: "Tripura" },
    { value: "uttar-pradesh", label: "Uttar Pradesh" },
    { value: "uttarakhand", label: "Uttarakhand" },
    { value: "west-bengal", label: "West Bengal" },
    { value: "andaman-and-nicobar-islands", label: "Andaman and Nicobar Islands" },
    { value: "chandigarh", label: "Chandigarh" },
    { value: "dadra-and-nagar-haveli-and-daman-and-diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
    { value: "delhi", label: "Delhi" },
    { value: "jammu-and-kashmir", label: "Jammu and Kashmir" },
    { value: "ladakh", label: "Ladakh" },
    { value: "lakshadweep", label: "Lakshadweep" },
    { value: "puducherry", label: "Puducherry" }
];

const Cities = [
    { value: "Chennai", label: "Chennai" },
    { value: "Coimbatore", label: "Coimbatore" },
    { value: "Madurai", label: "Madurai" },
    { value: "Tiruchirappalli", label: "Tiruchirappalli" },
    { value: "Salem", label: "Salem" },
    { value: "Tirunelveli", label: "Tirunelveli" },
    { value: "Vellore", label: "Vellore" },
    { value: "Erode", label: "Erode" },
    { value: "Tiruppur", label: "Tiruppur" },
    { value: "Thoothukudi", label: "Thoothukudi" },
    { value: "Nagercoil", label: "Nagercoil" },
    { value: "Thanjavur", label: "Thanjavur" },
    { value: "Dindigul", label: "Dindigul" },
    { value: "Kanchipuram", label: "Kanchipuram" },
    { value: "Hosur", label: "Hosur" },
    { value: "Kumarapalayam", label: "Kumarapalayam" },
    { value: "Karur", label: "Karur" },
    { value: "Neyveli", label: "Neyveli" },
    { value: "Cuddalore", label: "Cuddalore" },
    { value: "Karaikudi", label: "Karaikudi" },
    { value: "Udhagamandalam", label: "Udhagamandalam" },
    { value: "Rajapalayam", label: "Rajapalayam" },
    { value: "Sivakasi", label: "Sivakasi" },
    { value: "Pudukkottai", label: "Pudukkottai" },
    { value: "Tiruvannamalai", label: "Tiruvannamalai" },
    { value: "Pollachi", label: "Pollachi" },
    { value: "Ambur", label: "Ambur" },
    { value: "Nagapattinam", label: "Nagapattinam" },
    { value: "Viluppuram", label: "Viluppuram" },
    { value: "Chengalpattu", label: "Chengalpattu" }
];

export const customerFields: FieldProps[] = [
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        subFields: [
            {
                name: 'customerType', required: true, disabled: false, label: 'Customer Type', type: 'radio', gridSize: 3, options: [{ value: "Business", label: "Business" },
                { value: "Individual", label: "Individual" }], validation: Yup.string().required('customerName is required',)
            },
        ]
    },
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        label: 'Address Information',
        subFields: [
            { name: 'customerName', required: true, disabled: false, label: 'Customer Name', type: 'text', gridSize: 3, validation: Yup.string().required('customerName is required',) },
            { name: 'companyName', required: true, disabled: false, label: 'Company Name', type: 'text', gridSize: 3, validation: Yup.string().required('companyName is required') },
            { name: 'customerEmail', required: true, disabled: false, label: 'Customer Email', type: 'email', gridSize: 3, validation: Yup.string().required('customerEmail is required') },
            { name: 'customerPhone', required: true, disabled: false, label: 'Customer Phone', type: 'number', gridSize: 3, validation: Yup.string().required('customerPhone is required') },
        ]
    },
    {
        name: 'otherDetails',
        label: 'Other Details',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'paymentTerms', required: true, disabled: false, label: 'Payment Terms', type: 'select', gridSize: 3, options: [{ value: "Monthly", label: "Monthly" },
                { value: "Annual", label: "Annual" },
                { value: "Quarterly", label: "Quarterly" },
                { value: "Due on receipt", label: "Due on receipt" },
                { value: "Net 30", label: "Net 30" },
                { value: "Net 45", label: "Net 45" },
                ], validation: Yup.string().required('paymentTerms is required')
            },

        ]
    },
    {
        name: 'country',
        label: 'Country / region',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'country', required: true, disabled: false, label: 'country/region', type: 'select', gridSize: 3, options: countries, validation: Yup.string().required('paymentTerms is required')
            },
            { name: 'address', required: true, disabled: false, label: 'Address', type: 'text', gridSize: 3, validation: Yup.string().required('address is required') },
            {
                name: 'city', required: true, disabled: false, label: 'City', type: 'select', gridSize: 3, options: Cities, validation: Yup.string().required('companyName is required')
            },
            {
                name: 'state', required: true, disabled: false, label: 'State', type: 'select', gridSize: 3, options: indianStates, validation: Yup.string().required('companyName is required')
            },
            { name: 'pinCode', required: true, disabled: false, label: 'PinCode', type: 'number', gridSize: 3, validation: Yup.string().required('pinCode is required') },
        ]
    },
    {
        name: 'contactPersons',
        label: 'Contact Persons',
        type: 'array',
        titleGridSize: 12,
        subFields: [
            { name: 'contactName', required: true, disabled: false, label: 'Contact Name', type: 'text', gridSize: 3, validation: Yup.string().required('contactName is required') },
            { name: 'contactEmail', required: true, disabled: false, label: 'Contact Email', type: 'email', gridSize: 3, validation: Yup.string().required('contactEmail is required') },
            { name: 'contactPhone', required: true, disabled: false, label: 'Contact Phone', type: 'number', gridSize: 3, validation: Yup.string().required('contactPhone is required') },
        ]
    },
];


export const serviceFields: FieldProps[] = [
    {
        name: 'Service Accounting Code',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'serviceAccountingCode', required: true, disabled: false, label: 'Service AccountingCode', type: 'text', gridSize: 5, validation: Yup.string().required('Service Accounting Code is required',) },
            { name: 'serviceDescription', required: true, disabled: false, label: 'Service Description', type: 'text', gridSize: 5, validation: Yup.string().required('Description is required') },
            { name: 'serviceAmount', required: true, disabled: false, label: 'Service Amount', type: 'number', gridSize: 5, validation: Yup.string().required('Amount is required') },
        ]
    },
];

export const linkFields: FieldProps[] = [
    {
        name: 'New Link',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'label', required: true, disabled: false, label: 'Label', type: 'text', gridSize: 5, validation: Yup.string().required('Label is required',) },
            { name: 'url', required: true, disabled: false, label: 'URL', type: 'text', gridSize: 5, validation: Yup.string().required('URL is required') },
            { name: 'description', required: true, disabled: false, label: 'Description', type: 'text', gridSize: 10, validation: Yup.string().required('Description is required') },
        ]
    },
];


export const companyFields: FieldProps[] = [
    {
        name: 'Company Name',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyName', required: true, disabled: false, label: 'Company Name', type: 'text', gridSize: 4, validation: Yup.string().required('Company Name is required',) },
            { name: 'companyAddress', required: true, disabled: false, label: 'Company Address', type: 'text', gridSize: 4, validation: Yup.string().required('Company Address is required') },
            { name: 'companyState', required: true, disabled: false, label: 'Company State', type: 'text', gridSize: 4, validation: Yup.string().required('Company State is required') },
            { name: 'companyCountry', required: true, disabled: false, label: 'Company Country', type: 'text', gridSize: 4, validation: Yup.string().required('Amount is required') },
            { name: 'companyEmail', required: true, disabled: false, label: 'Company Email', type: 'text', gridSize: 4, validation: Yup.string().required('Amount is required') },
            { name: 'companyPhone', required: true, disabled: false, label: 'Company Phone', type: 'text', gridSize: 4, validation: Yup.string().required('Amount is required') },
            { name: 'companyCell', required: true, disabled: false, label: 'Company Cell', type: 'text', gridSize: 4, validation: Yup.string().required('Amount is required') },
            { name: 'companyWebsite', required: true, disabled: false, label: 'Company Website', type: 'text', gridSize: 4, validation: Yup.string().required('Amount is required') },
            { name: 'companyTaxNumber', required: true, disabled: false, label: 'Company TaxNumber', type: 'text', gridSize: 4, validation: Yup.string().required('Amount is required') },
            { name: 'companyRegNumber', required: true, disabled: false, label: 'Company RegNumber', type: 'text', gridSize: 4, validation: Yup.string().required('Amount is required') },
        ]
    },

];

export const GstTypeFields: FieldProps[] = [
    {
        name: 'GstType',
        label: '',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'gstName', required: true, disabled: false, label: 'Gst Name', type: 'text', gridSize: 3, validation: Yup.string().required('gstName is required') },
            { name: 'gstPercentage', required: true, disabled: false, label: 'Gst', type: 'number', gridSize: 2, validation: Yup.string().required('gstPercentage is required'), endAdornment: "%" },
        ]
    },
];

export const TdsTaxFields: FieldProps[] = [
    {
        name: 'tdsTax',
        label: '',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'taxName', required: true, disabled: false, label: 'Tax Name', type: 'text', gridSize: 3, validation: Yup.string().required('taxName is required') },
            { name: 'taxPercentage', required: true, disabled: false, label: 'Tax', type: 'number', gridSize: 2, validation: Yup.string().required('taxPercentage is required'), endAdornment: "%" },
        ]
    },
];

export const paymentTermsFields: FieldProps[] = [
    {
        name: 'paymentTerms',
        label: '',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'termName', required: true, disabled: false, label: 'Term Name', type: 'text', gridSize: 4, validation: Yup.string().required('termName is required'), helperText: " Eg : Net 30 as 30 days" },
            { name: 'totalDays', required: true, disabled: false, label: '', type: 'number', gridSize: 3, validation: Yup.string().required('termName is required'), endAdornment: "Days", helperText: " Eg : No of days" },
        ]
    },
];

export const invoiceFields: FieldProps[] = [
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        subFields: [
            {
                name: 'invoiceType', required: true, disabled: false, label: 'invoiceType', type: 'radio', gridSize: 3, options: [{ value: "Onetime", label: "Onetime" },
                { value: "Retainer", label: "Retainer" }], validation: Yup.string().required('invoiceType is required',)
            },
            { name: 'invoiceNumber', required: true, disabled: false, label: 'invoiceNumber', type: 'number', gridSize: 3, validation: Yup.string().required('invoiceNumber is required') },
            {
                name: 'customerName', required: true, disabled: false, label: 'Customer Name', type: 'select', gridSize: 3, options: [], validation: Yup.string().required('companyName is required')
            },
            {
                name: 'gstType', required: true, disabled: false, label: 'Gst Type', type: 'select', gridSize: 3, options: [
                    { value: "Local", label: "Local" },
                    { value: "Interstate", label: "Interstate" }
                ], validation: Yup.string().required('gstType is required')
            },
            { name: 'gstPercentage', required: true, disabled: false, label: 'gstPercentage', type: 'number', gridSize: 3, validation: Yup.string().required('gstPercentage is required') },
            { name: 'Gst In Number', required: true, disabled: false, label: 'gstInNumber', type: 'number', gridSize: 3, validation: Yup.string().required('gstInNumber is required') },
            {
                name: 'paymentTerms', required: true, disabled: false, label: 'paymentTerms', type: 'select', gridSize: 3, options: [
                    { value: "Net30", label: "Net30" },
                    { value: "Net45", label: "Net45" }
                ]
            },
        ]
    },
]



// !  --------------------------
