import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaseApplication extends Document {
  userId: string;
  houseId: string;
  applicantInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    ssn: string;
    currentAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  employmentInfo: {
    employer: string;
    position: string;
    monthlyIncome: number;
    employmentLength: number; // in months
    employerContact: string;
  };
  rentalHistory: {
    previousAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    landlordName: string;
    landlordContact: string;
    monthlyRent: number;
    lengthOfStay: number; // in months
  };
  additionalOccupants: [{
    name: string;
    relationship: string;
    age: number;
  }];
  status: string; // pending, approved, rejected
  paymentStatus: string; // pending, paid
  applicationFee: number;
  createdAt: Date;
  updatedAt: Date;
}

const LeaseApplicationSchema: Schema = new Schema(
  {
    userId: { type: String },
    houseId: { type: Schema.Types.ObjectId, ref: 'House', required: true },
    applicantInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      dateOfBirth: { type: Date, required: true },
      ssn: { type: String, required: true },
      currentAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
      },
    },
    employmentInfo: {
      employer: { type: String, required: true },
      position: { type: String, required: true },
      monthlyIncome: { type: Number, required: true },
      employmentLength: { type: Number, required: true },
      employerContact: { type: String, required: true },
    },
    rentalHistory: {
      previousAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
      },
      landlordName: { type: String, required: true },
      landlordContact: { type: String, required: true },
      monthlyRent: { type: Number, required: true },
      lengthOfStay: { type: Number, required: true },
    },
    additionalOccupants: [{
      name: { type: String },
      relationship: { type: String },
      age: { type: Number },
    }],
    status: { type: String, default: 'pending' },
    paymentStatus: { type: String, default: 'pending' },
    applicationFee: { type: Number, default: 50 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILeaseApplication>('LeaseApplication', LeaseApplicationSchema);
