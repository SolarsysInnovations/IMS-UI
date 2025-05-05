type RoleType = "ADMIN" | "STANDARDUSER" | "GUEST" | "APPROVER" | "SUPERADMIN" | "";


interface UserDetailsInterface {
  userId: string;
  userName: string;
  userEmail: string | null;
  userMobile: string | null;
  description: string | null;
  userRole: RoleType;
}

interface CompanyDetailsInterface {
  companyName: string | null;
  companyId: string | null;
}
export interface InvoiceContextType {
  userDetails: UserDetailsInterface;
  companyDetails: CompanyDetailsInterface;
}