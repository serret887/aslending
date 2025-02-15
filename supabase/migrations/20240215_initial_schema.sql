-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('client', 'realtor');

-- Create enum for application status
CREATE TYPE application_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected');

-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    role user_role NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create financial information table
CREATE TABLE financial_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    annual_income DECIMAL(12,2),
    employment_status TEXT,
    employer_name TEXT,
    employment_length INTEGER, -- in months
    credit_score INTEGER,
    monthly_debt DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create mortgage applications table
CREATE TABLE mortgage_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status application_status DEFAULT 'draft',
    loan_amount DECIMAL(12,2),
    loan_term INTEGER, -- in years
    interest_rate DECIMAL(5,2),
    property_address TEXT,
    property_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE mortgage_applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" 
    ON profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON profiles FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Users can view own financial info" 
    ON financial_info FOR SELECT 
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can update own financial info" 
    ON financial_info FOR UPDATE 
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own financial info" 
    ON financial_info FOR INSERT 
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can view own documents" 
    ON documents FOR SELECT 
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own documents" 
    ON documents FOR INSERT 
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete own documents" 
    ON documents FOR DELETE 
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can view own mortgage applications" 
    ON mortgage_applications FOR SELECT 
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can update own mortgage applications" 
    ON mortgage_applications FOR UPDATE 
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own mortgage applications" 
    ON mortgage_applications FOR INSERT 
    WITH CHECK (auth.uid() = profile_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, role)
    VALUES (NEW.id, 'client');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user(); 