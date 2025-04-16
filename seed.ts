import mongoose from 'mongoose';
import dotenv from 'dotenv';
import House from './src/models/House';

// Load environment variables
dotenv.config();

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/progressnext';

// Sample house data
const sampleHouses = [
  {
    title: 'Modern Suburban Home',
    description: 'Beautiful 3-bedroom home in a quiet suburban neighborhood with modern amenities and a spacious backyard.',
    price: 2200,
    address: {
      street: '123 Maple Avenue',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
    },
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    available: true,
    images: {
      exterior: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      ],
      interior: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      ],
    },
    amenities: ['Central AC', 'Dishwasher', 'Washer/Dryer', 'Garage', 'Patio', 'Fireplace'],
  },
  {
    title: 'Downtown Luxury Apartment',
    description: 'Upscale 2-bedroom apartment in the heart of downtown with stunning city views and premium finishes.',
    price: 3100,
    address: {
      street: '456 Main Street, Apt 12B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
    },
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    available: true,
    images: {
      exterior: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      ],
      interior: [
        'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      ],
    },
    amenities: ['Gym', 'Pool', 'Concierge', 'Parking', 'Balcony', 'Smart Home Features'],
  },
  {
    title: 'Cozy Beachfront Cottage',
    description: 'Charming 2-bedroom cottage just steps from the beach with panoramic ocean views and a private deck.',
    price: 2800,
    address: {
      street: '789 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      zipCode: '33139',
    },
    bedrooms: 2,
    bathrooms: 1.5,
    squareFeet: 1100,
    available: true,
    images: {
      exterior: [
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      ],
      interior: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      ],
    },
    amenities: ['Air Conditioning', 'Beach Access', 'Deck', 'Outdoor Shower', 'BBQ Grill'],
  },
  {
    title: 'Spacious Family Home',
    description: 'Large 4-bedroom family home in a great school district with a fenced yard and plenty of storage space.',
    price: 2500,
    address: {
      street: '101 Oak Street',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60611',
    },
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 2200,
    available: true,
    images: {
      exterior: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      ],
      interior: [
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1560185008-a33f5c7b1844?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      ],
    },
    amenities: ['Finished Basement', 'Fenced Yard', 'Central AC/Heat', 'Washer/Dryer', 'Dishwasher', 'Garage'],
  },
  {
    title: 'Mountain View Cabin',
    description: 'Rustic 3-bedroom cabin with stunning mountain views, a wood-burning fireplace, and hiking trails nearby.',
    price: 1900,
    address: {
      street: '222 Pine Road',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202',
    },
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1600,
    available: true,
    images: {
      exterior: [
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1520608760-eff2c38b06e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      ],
      interior: [
        'https://images.unsplash.com/photo-1595514535415-dae8970c1652?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1595514527107-8f3091515e96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      ],
    },
    amenities: ['Fireplace', 'Mountain Views', 'Deck', 'Hiking Trails', 'Wood Stove', 'Pet Friendly'],
  },
  {
    title: 'Urban Loft Apartment',
    description: 'Stylish 1-bedroom loft in a converted warehouse with high ceilings, exposed brick, and industrial finishes.',
    price: 2100,
    address: {
      street: '333 Industrial Blvd, Unit 5C',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 950,
    available: true,
    images: {
      exterior: [
        'https://images.unsplash.com/photo-1551361415-69c87624334f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      ],
      interior: [
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      ],
    },
    amenities: ['High Ceilings', 'Exposed Brick', 'Stainless Steel Appliances', 'In-unit Laundry', 'Rooftop Access'],
  },
];

// Connect to MongoDB and seed data
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing houses
    await House.deleteMany({});
    console.log('Cleared existing house data');

    // Insert sample houses
    const result = await House.insertMany(sampleHouses);
    console.log(`Successfully seeded ${result.length} houses`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
