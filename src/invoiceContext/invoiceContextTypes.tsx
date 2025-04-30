type RoleType = "ADMIN" | "STANDARDUSER" | "GUEST" | "APPROVER" | "SUPERADMIN";


interface UserDetailsInterface {
  userId: string;
  userName: string;
  userEmail: string | null;
  userRole: RoleType;
}

interface CompanyDetailsInterface {
  comPanyName: string | null;
  comPanyId: string | null;
}
export interface InvoiceContextType {
  userDetails: UserDetailsInterface;
  companyDetails: CompanyDetailsInterface;
}