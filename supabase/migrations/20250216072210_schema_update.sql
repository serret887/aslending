-- Add professional details table
CREATE TABLE professional_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    company_name TEXT,
    license_number TEXT,
    license_state TEXT,
    license_expiry DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create relationship status enum
CREATE TYPE relationship_status AS ENUM ('active', 'pending', 'inactive', 'terminated');

-- Create client relationships table (unified approach)
CREATE TABLE client_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    professional_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    professional_role user_role NOT NULL,
    status relationship_status DEFAULT 'pending',
    is_primary BOOLEAN DEFAULT false,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    end_date TIMESTAMP WITH TIME ZONE,
    termination_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT valid_professional_role CHECK (professional_role IN ('realtor', 'broker')),
    UNIQUE(client_id, professional_id)
);

-- Modify mortgage_applications table
ALTER TABLE mortgage_applications 
    ADD COLUMN client_relationship_id UUID REFERENCES client_relationships(id),
    ADD COLUMN assigned_realtor_id UUID REFERENCES profiles(id),
    ADD COLUMN assigned_broker_id UUID REFERENCES profiles(id),
    ADD COLUMN application_type TEXT NOT NULL DEFAULT 'purchase', -- purchase, refinance
    ADD COLUMN referral_source TEXT;

-- Create application timeline table
CREATE TABLE application_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES mortgage_applications(id) ON DELETE CASCADE,
    status application_status NOT NULL,
    changed_by UUID REFERENCES profiles(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add RLS policies
ALTER TABLE professional_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_timeline ENABLE ROW LEVEL SECURITY;

-- Professional details policies
CREATE POLICY "Professionals can view and edit their own details"
    ON professional_details FOR ALL
    USING (auth.uid() = profile_id);

-- Client relationships policies
CREATE POLICY "View relationships for involved parties"
    ON client_relationships FOR SELECT
    USING (auth.uid() IN (client_id, professional_id));

CREATE POLICY "Create relationships as professional"
    ON client_relationships FOR INSERT
    WITH CHECK (auth.uid() = professional_id);

-- Timeline policies
CREATE POLICY "View timeline entries for involved parties"
    ON application_timeline FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM mortgage_applications ma
        WHERE ma.id = application_id
        AND (ma.assigned_broker_id = auth.uid() 
             OR ma.assigned_realtor_id = auth.uid()
             OR ma.profile_id = auth.uid())
    ));

-- Function to ensure single primary relationship per type
CREATE OR REPLACE FUNCTION ensure_single_primary_relationship()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_primary THEN
        UPDATE client_relationships
        SET is_primary = false
        WHERE client_id = NEW.client_id
        AND professional_role = NEW.professional_role
        AND id != NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER single_primary_relationship
    BEFORE INSERT OR UPDATE ON client_relationships
    FOR EACH ROW
    EXECUTE FUNCTION ensure_single_primary_relationship();

-- Function to create application timeline entry
CREATE OR REPLACE FUNCTION create_timeline_entry()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS NULL OR NEW.status != OLD.status THEN
        INSERT INTO application_timeline (application_id, status, changed_by)
        VALUES (NEW.id, NEW.status, auth.uid());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER application_status_change
    AFTER INSERT OR UPDATE ON mortgage_applications
    FOR EACH ROW
    EXECUTE FUNCTION create_timeline_entry(); 