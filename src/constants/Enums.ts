export enum Roles {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  APPROVER = 'APPROVER',
  STANDARDUSER = 'STANDARDUSER',
  GUEST = 'GUEST',
}

// src/constants/invoiceEnums.ts

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  RETURNED = 'RETURNED',
  PAID = 'PAID',
  MAILED = 'MAILED',
}

export enum InvoiceOptions {
  APPROVE = 'APPROVE',
  RETURN = 'RETURN',
  PAID = 'PAID',
  SENT_TO_APPROVER = 'Send for Approver',
  MAILED = 'Mail To Customer',
}
