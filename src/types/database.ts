export type UserRole = 'client' | 'realtor';
export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  role: UserRole;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface FinancialInfo {
  id: string;
  profile_id: string;
  annual_income: number | null;
  employment_status: string | null;
  employer_name: string | null;
  employment_length: number | null;
  credit_score: number | null;
  monthly_debt: number | null;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  profile_id: string;
  name: string;
  type: string;
  url: string;
  created_at: string;
}

export interface MortgageApplication {
  id: string;
  profile_id: string;
  status: ApplicationStatus;
  loan_amount: number | null;
  loan_term: number | null;
  interest_rate: number | null;
  property_address: string | null;
  property_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  profiles: Profile;
  financial_info: FinancialInfo;
  documents: Document;
  mortgage_applications: MortgageApplication;
} 