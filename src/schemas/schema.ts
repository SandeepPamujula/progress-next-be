import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Address {
    street: String!
    city: String!
    state: String!
    zipCode: String!
  }

  type Images {
    exterior: [String!]
    interior: [String!]
  }

  type House {
    id: ID!
    title: String!
    description: String!
    price: Float!
    address: Address!
    bedrooms: Int!
    bathrooms: Float!
    squareFeet: Int!
    available: Boolean!
    images: Images
    amenities: [String!]
    createdAt: String
    updatedAt: String
  }

  type ApplicantInfo {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    dateOfBirth: String!
    ssn: String!
    currentAddress: Address!
  }

  type EmploymentInfo {
    employer: String!
    position: String!
    monthlyIncome: Float!
    employmentLength: Int!
    employerContact: String!
  }

  type RentalHistory {
    previousAddress: Address!
    landlordName: String!
    landlordContact: String!
    monthlyRent: Float!
    lengthOfStay: Int!
  }

  type AdditionalOccupant {
    name: String!
    relationship: String!
    age: Int!
  }

  type LeaseApplication {
    id: ID!
    userId: String
    houseId: ID!
    house: House
    applicantInfo: ApplicantInfo!
    employmentInfo: EmploymentInfo!
    rentalHistory: RentalHistory!
    additionalOccupants: [AdditionalOccupant!]
    status: String!
    paymentStatus: String!
    applicationFee: Float!
    createdAt: String
    updatedAt: String
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    zipCode: String!
  }

  input ApplicantInfoInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    dateOfBirth: String!
    ssn: String!
    currentAddress: AddressInput!
  }

  input EmploymentInfoInput {
    employer: String!
    position: String!
    monthlyIncome: Float!
    employmentLength: Int!
    employerContact: String!
  }

  input RentalHistoryInput {
    previousAddress: AddressInput!
    landlordName: String!
    landlordContact: String!
    monthlyRent: Float!
    lengthOfStay: Int!
  }

  input AdditionalOccupantInput {
    name: String!
    relationship: String!
    age: Int!
  }

  input LeaseApplicationInput {
    houseId: ID!
    applicantInfo: ApplicantInfoInput!
    employmentInfo: EmploymentInfoInput!
    rentalHistory: RentalHistoryInput!
    additionalOccupants: [AdditionalOccupantInput!]
  }

  input PaymentInput {
    leaseApplicationId: ID!
    paymentMethod: String!
    cardNumber: String
    expiryDate: String
    cvv: String
    billingZip: String
  }

  type PaymentResult {
    success: Boolean!
    message: String
    transactionId: String
  }

  type Query {
    houses: [House!]!
    house(id: ID!): House
    housesByState(state: String!): [House!]!
    housesByZipCode(zipCode: String!): [House!]!
    leaseApplication(id: ID!): LeaseApplication
    leaseApplications: [LeaseApplication!]!
  }

  type Mutation {
    submitLeaseApplication(application: LeaseApplicationInput!): LeaseApplication!
    processApplicationPayment(payment: PaymentInput!): PaymentResult!
  }
`;

export default typeDefs;
