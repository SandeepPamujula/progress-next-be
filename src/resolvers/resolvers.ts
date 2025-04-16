import House from '../models/House';
import LeaseApplication from '../models/LeaseApplication';

const resolvers = {
  Query: {
    houses: async () => {
      try {
        return await House.find({});
      } catch (error) {
        throw new Error(`Failed to fetch houses: ${error}`);
      }
    },
    house: async (_: any, { id }: { id: string }) => {
      try {
        return await House.findById(id);
      } catch (error) {
        throw new Error(`Failed to fetch house: ${error}`);
      }
    },
    housesByState: async (_: any, { state }: { state: string }) => {
      try {
        return await House.find({ 'address.state': state });
      } catch (error) {
        throw new Error(`Failed to fetch houses by state: ${error}`);
      }
    },
    housesByZipCode: async (_: any, { zipCode }: { zipCode: string }) => {
      try {
        return await House.find({ 'address.zipCode': zipCode });
      } catch (error) {
        throw new Error(`Failed to fetch houses by zip code: ${error}`);
      }
    },
    leaseApplication: async (_: any, { id }: { id: string }) => {
      try {
        return await LeaseApplication.findById(id);
      } catch (error) {
        throw new Error(`Failed to fetch lease application: ${error}`);
      }
    },
    leaseApplications: async () => {
      try {
        return await LeaseApplication.find({});
      } catch (error) {
        throw new Error(`Failed to fetch lease applications: ${error}`);
      }
    },
  },
  LeaseApplication: {
    house: async (parent: any) => {
      try {
        return await House.findById(parent.houseId);
      } catch (error) {
        throw new Error(`Failed to fetch house for lease application: ${error}`);
      }
    },
  },
  Mutation: {
    submitLeaseApplication: async (_: any, { application }: { application: any }) => {
      try {
        const newApplication = new LeaseApplication({
          ...application,
          status: 'pending',
          paymentStatus: 'pending',
          applicationFee: 50,
        });
        
        await newApplication.save();
        return newApplication;
      } catch (error) {
        throw new Error(`Failed to submit lease application: ${error}`);
      }
    },
    processApplicationPayment: async (_: any, { payment }: { payment: any }) => {
      try {
        // In a real application, this would integrate with a payment processor
        // For this demo, we'll simulate a successful payment
        
        const leaseApplication = await LeaseApplication.findById(payment.leaseApplicationId);
        
        if (!leaseApplication) {
          throw new Error('Lease application not found');
        }
        
        // Update payment status
        leaseApplication.paymentStatus = 'paid';
        await leaseApplication.save();
        
        return {
          success: true,
          message: 'Payment processed successfully',
          transactionId: `txn_${Date.now()}`,
        };
      } catch (error) {
        return {
          success: false,
          message: `Payment processing failed: ${error}`,
          transactionId: null,
        };
      }
    },
  },
};

export default resolvers;
