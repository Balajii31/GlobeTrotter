-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  phone_number TEXT,
  city TEXT,
  country TEXT,
  profile_photo_url TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cities table
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  image_url TEXT,
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  popularity_score INTEGER DEFAULT 0,
  best_time_to_visit TEXT, -- e.g., 'June to August'
  seasonal_tag TEXT, -- e.g., 'Summer', 'Winter', 'Spring', 'Autumn'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Activities table
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  estimated_duration TEXT,
  estimated_cost DECIMAL(10,2),
  popularity_score INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Trips table
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  city_id UUID REFERENCES cities(id),
  title TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'planned', -- planned, completed, cancelled
  total_budget DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Trip Sections (Itinerary sections)
CREATE TABLE trip_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  title TEXT,
  start_date DATE,
  end_date DATE,
  budget DECIMAL(10,2),
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Trip Activities (activities added to trip sections)
CREATE TABLE trip_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_section_id UUID REFERENCES trip_sections(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id),
  custom_activity_name TEXT,
  notes TEXT,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Analytics tracking
CREATE TABLE user_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  activity_type TEXT, -- search, view_city, view_activity, create_trip, etc.
  entity_id UUID,
  entity_type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Trips policies
CREATE POLICY "Users can view their own trips" ON trips
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own trips" ON trips
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips" ON trips
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips" ON trips
  FOR DELETE USING (auth.uid() = user_id);

-- Trip sections policies
CREATE POLICY "Users can view trip sections for their trips" ON trip_sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM trips
      WHERE trips.id = trip_sections.trip_id
      AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create trip sections for their trips" ON trip_sections
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM trips
      WHERE trips.id = trip_sections.trip_id
      AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update trip sections for their trips" ON trip_sections
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM trips
      WHERE trips.id = trip_sections.trip_id
      AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete trip sections for their trips" ON trip_sections
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM trips
      WHERE trips.id = trip_sections.trip_id
      AND trips.user_id = auth.uid()
    )
  );

-- Cities and Activities are public (read-only for regular users)
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cities are viewable by everyone" ON cities
  FOR SELECT USING (true);

CREATE POLICY "Activities are viewable by everyone" ON activities
  FOR SELECT USING (true);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to trips table
CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON trips
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample cities
INSERT INTO cities (name, country, region, image_url, description, is_featured, popularity_score, best_time_to_visit, seasonal_tag) VALUES
  ('Paris', 'France', 'Europe', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', 'The city of lights and romance', true, 95, 'June to August', 'Summer'),
  ('Tokyo', 'Japan', 'Asia', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf', 'Modern metropolis meets ancient tradition', true, 92, 'March to May', 'Spring'),
  ('New York', 'USA', 'Americas', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9', 'The city that never sleeps', true, 90, 'September to November', 'Autumn'),
  ('Barcelona', 'Spain', 'Europe', 'https://images.unsplash.com/photo-1583422409516-2895a77efded', 'Gaudí architecture and Mediterranean beaches', true, 88, 'May to June', 'Spring'),
  ('Dubai', 'UAE', 'Asia', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c', 'Luxury and innovation in the desert', true, 87, 'November to March', 'Winter'),
  ('London', 'UK', 'Europe', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad', 'Historical landmarks and royal heritage', true, 89, 'June to August', 'Summer'),
  ('Sydney', 'Australia', 'Oceania', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9', 'Iconic opera house and stunning harbor', true, 85, 'December to February', 'Summer'),
  ('Rome', 'Italy', 'Europe', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', 'Ancient history and Italian cuisine', true, 91, 'April to June', 'Spring');

-- Insert sample activities for Paris
INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Eiffel Tower Visit', 'Visit the iconic Eiffel Tower and enjoy panoramic views of Paris', 'Sightseeing', 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f', '2-3 hours', 25.00, 98 FROM cities WHERE name = 'Paris' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Louvre Museum', 'Explore the world''s largest art museum', 'Culture', 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a', '3-4 hours', 17.00, 95 FROM cities WHERE name = 'Paris' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Seine River Cruise', 'Relaxing boat tour along the heart of Paris', 'Sightseeing', 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995', '1 hour', 15.00, 90 FROM cities WHERE name = 'Paris' LIMIT 1;

-- Insert sample activities for Tokyo
INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Shibuya Crossing Walk', 'Experience the world''s busiest pedestrian crossing', 'Sightseeing', 'https://images.unsplash.com/photo-1542051841857-5f90071e7989', '30 mins', 0.00, 99 FROM cities WHERE name = 'Tokyo' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Senso-ji Temple', 'Visit Tokyo''s oldest and most significant Buddhist temple', 'Culture', 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9', '2 hours', 0.00, 96 FROM cities WHERE name = 'Tokyo' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Tsukiji Direct Food Tour', 'Taste fresh seafood at the world''s most famous fish market', 'Food', 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da', '3 hours', 45.00, 94 FROM cities WHERE name = 'Tokyo' LIMIT 1;

-- Insert sample activities for New York
INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Central Park Bike Tour', 'Cycle through the iconic heart of Manhattan', 'Adventure', 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee', '2 hours', 35.00, 97 FROM cities WHERE name = 'New York' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Empire State Building', 'Breathtaking 86th-floor views of the NYC skyline', 'Sightseeing', 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25', '2 hours', 44.00, 98 FROM cities WHERE name = 'New York' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Metropolitan Museum of Art', 'Explore 5,000 years of art from around the world', 'Culture', 'https://images.unsplash.com/photo-1561571210-9174094a4e98', '4 hours', 25.00, 95 FROM cities WHERE name = 'New York' LIMIT 1;

-- Insert sample activities for Barcelona
INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Sagrada Família', 'Marvel at Gaudí''s unfinished architectural masterpiece', 'Culture', 'https://images.unsplash.com/photo-1583422409516-2895a77efded', '2 hours', 26.00, 99 FROM cities WHERE name = 'Barcelona' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Park Güell', 'Stroll through a whimsical mosaic-covered public park', 'Sightseeing', 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216', '2 hours', 13.50, 97 FROM cities WHERE name = 'Barcelona' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Tapas Tasting tour', 'Explore the Gothic Quarter while tasting authentic Catalan flavors', 'Food', 'https://images.unsplash.com/photo-1515443961218-152367831d0d', '3 hours', 65.00, 94 FROM cities WHERE name = 'Barcelona' LIMIT 1;

-- Insert sample activities for London
INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Tower of London', 'Discover 1000 years of history and the Crown Jewels', 'History', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad', '3 hours', 39.00, 96 FROM cities WHERE name = 'London' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'London Eye Flight', 'Panoramic views of London from the giants observation wheel', 'Sightseeing', 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad', '45 mins', 35.00, 95 FROM cities WHERE name = 'London' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'British Museum', 'World-class collection of human history, art and culture', 'Culture', 'https://images.unsplash.com/photo-1518905593085-3de23048ecae', '3 hours', 0.00, 93 FROM cities WHERE name = 'London' LIMIT 1;

-- Insert sample activities for Rome
INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Colosseum & Roman Forum', 'Step back into the Roman Empire in this iconic stadium', 'History', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', '4 hours', 24.00, 99 FROM cities WHERE name = 'Rome' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Vatican Museums', 'Home to the Sistine Chapel and incredible Renaissance art', 'Art', 'https://images.unsplash.com/photo-1525874684015-58379d421a52', '4 hours', 35.00, 98 FROM cities WHERE name = 'Rome' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Trastevere Dinner', 'Authentic Roman pasta and wine in the charming Trastevere district', 'Food', 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7', '2 hours', 50.00, 96 FROM cities WHERE name = 'Rome' LIMIT 1;

-- Insert sample activities for Dubai
INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Burj Khalifa Top View', 'Visit the world''s tallest building for stunning views', 'Sightseeing', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c', '2 hours', 52.00, 98 FROM cities WHERE name = 'Dubai' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Desert Safari', 'Dune bashing, camel riding, and a traditional BBQ dinner', 'Adventure', 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3', '6 hours', 85.00, 97 FROM cities WHERE name = 'Dubai' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Dubai Fountain Show', 'Watch the world''s largest choreographed fountain system', 'Sightseeing', 'https://images.unsplash.com/photo-1580674285054-bed31e145f59', '30 mins', 0.00, 94 FROM cities WHERE name = 'Dubai' LIMIT 1;

-- Insert sample activities for Sydney
INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Sydney Opera House Tour', 'Go inside one of the 20th century''s most famous buildings', 'Culture', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9', '1 hour', 32.00, 97 FROM cities WHERE name = 'Sydney' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Bondi to Coogee Walk', 'Stunning coastal trail with incredible ocean views', 'Nature', 'https://images.unsplash.com/photo-1524820197278-540916411e20', '3 hours', 0.00, 95 FROM cities WHERE name = 'Sydney' LIMIT 1;

INSERT INTO activities (city_id, name, description, category, image_url, estimated_duration, estimated_cost, popularity_score)
SELECT id, 'Taronga Zoo Sydney', 'Meet Australian wildlife with a backdrop of the Sydney Harbour', 'Family', 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3', '4 hours', 44.00, 92 FROM cities WHERE name = 'Sydney' LIMIT 1;

