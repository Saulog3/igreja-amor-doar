-- Criação de enums
CREATE TYPE payment_status_enum AS ENUM ('pending', 'approved', 'rejected', 'cancelled', 'refunded');

-- Criação da tabela profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  email TEXT,
  username TEXT,
  is_institution BOOLEAN DEFAULT FALSE
);

-- Criação da tabela institutions
CREATE TABLE institutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  profile_id UUID REFERENCES profiles(id),
  verified BOOLEAN DEFAULT FALSE,
  address TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  website TEXT
);

-- Criação da tabela donations
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  institution_id UUID NOT NULL REFERENCES institutions(id),
  donor_name TEXT,
  donor_email TEXT,
  amount NUMERIC NOT NULL,
  payment_method TEXT,
  payment_status payment_status_enum DEFAULT 'pending',
  payment_id TEXT
);

-- Criação de índices para melhorar a performance
CREATE INDEX idx_donations_institution_id ON donations(institution_id);
CREATE INDEX idx_institutions_profile_id ON institutions(profile_id);

-- Criação de funções para atualização automática do campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicação dos triggers para atualização automática
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_institutions_updated_at
BEFORE UPDATE ON institutions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON donations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();