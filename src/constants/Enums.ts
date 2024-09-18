export enum FieldType {
    Heading = "heading",
    TableHeader = "tableHeader",
    GridBreak = "gridBreak",
    LargeText = "largeText",
    LargePassword = "largePassword",
    Text = "text",
    Email = "email",
    Password = "password",
    Number = "number",
    Date = "date",
    Radio = "radio",
    SelectDropdown = "selectDropdown",
    MultiSelect = "multiSelect",
}

export enum Roles {
    SUPERADMIN = "SUPERADMIN",
    ADMIN = "ADMIN",
    APPROVER = "APPROVER",
    STANDARDUSER = "STANDARDUSER"
};


// src/constants/invoiceEnums.ts

export enum InvoiceStatus {
    DRAFT = "DRAFT",
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    RETURNED = "RETURNED",
    PAID = "PAID",
    MAILED = "MAILED",
};

export enum InvoiceOptions {
    APPROVE = "APPROVE",
    RETURN = "RETURN",
    PAID = "PAID",
    SENT_TO_APPROVER = "Send for Approver",
    MAILED = "Mail To Customer",
};
