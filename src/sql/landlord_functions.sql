
-- Function to get all landlords
CREATE OR REPLACE FUNCTION get_landlords()
RETURNS SETOF landlords AS $$
BEGIN
  RETURN QUERY SELECT * FROM landlords ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create a landlord
CREATE OR REPLACE FUNCTION create_landlord(
  user_id UUID,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT DEFAULT NULL,
  company_name TEXT DEFAULT NULL,
  company_registration TEXT DEFAULT NULL,
  address TEXT DEFAULT NULL,
  city TEXT DEFAULT NULL,
  country TEXT DEFAULT NULL,
  status TEXT DEFAULT 'active',
  verification_status TEXT DEFAULT 'unverified',
  subscription_status TEXT DEFAULT 'free',
  subscription_id UUID DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  documents JSONB DEFAULT NULL
) RETURNS landlords AS $$
DECLARE
  new_landlord landlords;
BEGIN
  INSERT INTO landlords (
    user_id, first_name, last_name, email, phone, company_name,
    company_registration, address, city, country, status,
    verification_status, subscription_status, subscription_id, notes, documents
  ) VALUES (
    user_id, first_name, last_name, email, phone, company_name,
    company_registration, address, city, country, status,
    verification_status, subscription_status, subscription_id, notes, documents
  )
  RETURNING * INTO new_landlord;
  
  RETURN new_landlord;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update a landlord
CREATE OR REPLACE FUNCTION update_landlord(
  landlord_id UUID,
  first_name TEXT DEFAULT NULL,
  last_name TEXT DEFAULT NULL,
  email TEXT DEFAULT NULL,
  phone TEXT DEFAULT NULL,
  company_name TEXT DEFAULT NULL,
  company_registration TEXT DEFAULT NULL,
  address TEXT DEFAULT NULL,
  city TEXT DEFAULT NULL,
  country TEXT DEFAULT NULL,
  status TEXT DEFAULT NULL,
  verification_status TEXT DEFAULT NULL,
  subscription_status TEXT DEFAULT NULL,
  subscription_id UUID DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  documents JSONB DEFAULT NULL
) RETURNS landlords AS $$
DECLARE
  updated_landlord landlords;
BEGIN
  UPDATE landlords
  SET 
    first_name = COALESCE(update_landlord.first_name, landlords.first_name),
    last_name = COALESCE(update_landlord.last_name, landlords.last_name),
    email = COALESCE(update_landlord.email, landlords.email),
    phone = COALESCE(update_landlord.phone, landlords.phone),
    company_name = COALESCE(update_landlord.company_name, landlords.company_name),
    company_registration = COALESCE(update_landlord.company_registration, landlords.company_registration),
    address = COALESCE(update_landlord.address, landlords.address),
    city = COALESCE(update_landlord.city, landlords.city),
    country = COALESCE(update_landlord.country, landlords.country),
    status = COALESCE(update_landlord.status, landlords.status),
    verification_status = COALESCE(update_landlord.verification_status, landlords.verification_status),
    subscription_status = COALESCE(update_landlord.subscription_status, landlords.subscription_status),
    subscription_id = COALESCE(update_landlord.subscription_id, landlords.subscription_id),
    notes = COALESCE(update_landlord.notes, landlords.notes),
    documents = COALESCE(update_landlord.documents, landlords.documents),
    updated_at = NOW()
  WHERE id = landlord_id
  RETURNING * INTO updated_landlord;
  
  RETURN updated_landlord;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to delete a landlord
CREATE OR REPLACE FUNCTION delete_landlord(landlord_id UUID)
RETURNS VOID AS $$
BEGIN
  DELETE FROM landlords WHERE id = landlord_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
