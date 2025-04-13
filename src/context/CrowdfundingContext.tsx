
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  creatorName: string;
  goalAmount: number;
  amountRaised: number;
  deadline: string;
  createdAt: string;
  imageUrl: string;
}

export interface Donation {
  id: string;
  campaignId: string;
  name: string;
  amount: number;
  message?: string;
  createdAt: string;
}

interface CrowdfundingContextType {
  campaigns: Campaign[];
  donations: Donation[];
  loading: boolean;
  addCampaign: (campaign: Omit<Campaign, 'id' | 'amountRaised' | 'createdAt'>) => void;
  addDonation: (donation: Omit<Donation, 'id' | 'createdAt'>) => void;
  getCampaignById: (id: string) => Campaign | undefined;
  getCampaignDonations: (campaignId: string) => Donation[];
}

const CrowdfundingContext = createContext<CrowdfundingContextType | undefined>(undefined);

// Sample campaigns data
const initialCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Community Garden Project',
    description: 'Help us build a sustainable community garden in the heart of the city. This project will provide fresh produce to local food banks and create a green space for everyone to enjoy.',
    creatorName: 'Green Thumbs Association',
    goalAmount: 5000,
    amountRaised: 2750,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    createdAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Educational Coding Workshops',
    description: 'We aim to provide free coding workshops for underprivileged youth. Your donation will help purchase laptops and educational materials.',
    creatorName: 'Future Coders Initiative',
    goalAmount: 10000,
    amountRaised: 4200,
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days from now
    createdAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Indie Documentary Film',
    description: 'Support our documentary film exploring the impact of climate change on coastal communities. We need funding for production equipment and travel expenses.',
    creatorName: 'Truth Lens Productions',
    goalAmount: 15000,
    amountRaised: 9800,
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
    createdAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1470&auto=format&fit=crop'
  }
];

const initialDonations: Donation[] = [
  {
    id: 'd1',
    campaignId: '1',
    name: 'Sarah Johnson',
    amount: 100,
    message: 'Great initiative! Hope this helps!',
    createdAt: new Date().toISOString()
  },
  {
    id: 'd2',
    campaignId: '1',
    name: 'Mike Peterson',
    amount: 250,
    message: 'I love community gardens!',
    createdAt: new Date().toISOString()
  },
  {
    id: 'd3',
    campaignId: '2',
    name: 'Emily Richards',
    amount: 500,
    message: 'Education is the future. Happy to support!',
    createdAt: new Date().toISOString()
  }
];

export const CrowdfundingProvider = ({ children }: { children: ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load campaigns and donations from localStorage or use initial data if not found
    const loadData = () => {
      const storedCampaigns = localStorage.getItem('campaigns');
      const storedDonations = localStorage.getItem('donations');
      
      setCampaigns(storedCampaigns ? JSON.parse(storedCampaigns) : initialCampaigns);
      setDonations(storedDonations ? JSON.parse(storedDonations) : initialDonations);
      setLoading(false);
    };

    loadData();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('campaigns', JSON.stringify(campaigns));
      localStorage.setItem('donations', JSON.stringify(donations));
    }
  }, [campaigns, donations, loading]);

  const addCampaign = (campaignData: Omit<Campaign, 'id' | 'amountRaised' | 'createdAt'>) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: `c${Date.now()}`,
      amountRaised: 0,
      createdAt: new Date().toISOString()
    };

    setCampaigns((prev) => [...prev, newCampaign]);
  };

  const addDonation = (donationData: Omit<Donation, 'id' | 'createdAt'>) => {
    const newDonation: Donation = {
      ...donationData,
      id: `d${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    setDonations((prev) => [...prev, newDonation]);

    // Update the campaign's amount raised
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === donationData.campaignId
          ? { ...campaign, amountRaised: campaign.amountRaised + donationData.amount }
          : campaign
      )
    );
  };

  const getCampaignById = (id: string) => {
    return campaigns.find((campaign) => campaign.id === id);
  };

  const getCampaignDonations = (campaignId: string) => {
    return donations.filter((donation) => donation.campaignId === campaignId);
  };

  return (
    <CrowdfundingContext.Provider
      value={{
        campaigns,
        donations,
        loading,
        addCampaign,
        addDonation,
        getCampaignById,
        getCampaignDonations,
      }}
    >
      {children}
    </CrowdfundingContext.Provider>
  );
};

export const useCrowdfunding = () => {
  const context = useContext(CrowdfundingContext);
  if (context === undefined) {
    throw new Error('useCrowdfunding must be used within a CrowdfundingProvider');
  }
  return context;
};
