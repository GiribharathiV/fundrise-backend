import api from './api';
import { Campaign } from '@/context/CrowdfundingContext';

export interface CreateCampaignData {
  title: string;
  description: string;
  goalAmount: number;
  deadline: string;
  imageUrl?: string;
}

const CampaignService = {
  // Get all campaigns
  getAllCampaigns: async (): Promise<Campaign[]> => {
    const response = await api.get('/campaigns');
    return response.data;
  },
  
  // Get a single campaign by ID
  getCampaignById: async (id: string): Promise<Campaign> => {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  },
  
  // Create a new campaign
  createCampaign: async (campaignData: CreateCampaignData): Promise<Campaign> => {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  },
  
  // Update a campaign
  updateCampaign: async (id: string, campaignData: Partial<CreateCampaignData>): Promise<Campaign> => {
    const response = await api.put(`/campaigns/${id}`, campaignData);
    return response.data;
  },
  
  // Delete a campaign
  deleteCampaign: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  },
  
  // Get campaigns created by the logged-in user
  getMyCampaigns: async (): Promise<Campaign[]> => {
    const response = await api.get('/campaigns/user/mycampaigns');
    return response.data;
  }
};

export default CampaignService; 