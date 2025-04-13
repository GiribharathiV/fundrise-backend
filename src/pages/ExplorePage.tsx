
import React, { useState } from 'react';
import { useCrowdfunding } from '@/context/CrowdfundingContext';
import CampaignCard from '@/components/CampaignCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ExplorePage = () => {
  const { campaigns, loading } = useCrowdfunding();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCampaigns = campaigns.filter((campaign) => 
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.creatorName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Explore Campaigns</h1>
      
      <div className="mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-muted-foreground" />
        </div>
        <Input
          className="pl-10"
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-lg overflow-hidden h-96 animate-shimmer" />
          ))}
        </div>
      ) : filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No campaigns found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
