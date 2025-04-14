import api from './api';
import { Donation } from '@/context/CrowdfundingContext';

export interface CreateDonationData {
  name: string;
  amount: number;
  message?: string;
}

const DonationService = {
  // Get donations for a campaign
  getCampaignDonations: async (campaignId: string): Promise<Donation[]> => {
    const response = await api.get(`/campaigns/${campaignId}/donations`);
    return response.data;
  },
  
  // Create a new donation
  createDonation: async (campaignId: string, donationData: CreateDonationData): Promise<Donation> => {
    const response = await api.post(`/campaigns/${campaignId}/donations`, donationData);
    return response.data;
  },
  
  // Get donations made by the logged-in user
  getMyDonations: async (): Promise<Donation[]> => {
    const response = await api.get('/donations/mydonations');
    return response.data;
  }
};

export default DonationService; 