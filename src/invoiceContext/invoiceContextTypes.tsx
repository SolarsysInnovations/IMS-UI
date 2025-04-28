type RoleType = "ADMIN" | "STANDARDUSER" | "GUEST" | "APPROVER" | "SUPERADMIN";

export interface InvoiceContextType {
    userId: string;
    userName: string;
    userEmail: string | null;
    userRole: RoleType;
    comPanyName: string | null;
    comPanyId: string | null;
}