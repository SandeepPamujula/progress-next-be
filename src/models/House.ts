import mongoose, { Document, Schema } from 'mongoose';

export interface IHouse extends Document {
  title: string;
  description: string;
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  available: boolean;
  images: {
    exterior: string[];
    interior: string[];
  };
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}

const HouseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    squareFeet: { type: Number, required: true },
    available: { type: Boolean, default: true },
    images: {
      exterior: [{ type: String }],
      interior: [{ type: String }],
    },
    amenities: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Create index for search functionality
HouseSchema.index({ 'address.state': 1, 'address.zipCode': 1 });

export default mongoose.model<IHouse>('House', HouseSchema);
