
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useCrowdfunding } from '@/context/CrowdfundingContext';
import DonationForm from '@/components/DonationForm';
import DonationList from '@/components/DonationList';
import { formatCurrency, formatDate, formatDateDistance } from '@/lib/utils';
import { CalendarDays, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getCampaignById, loading } = useCrowdfunding();
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="animate-shimmer h-96 rounded-lg mb-8" />
        <div className="animate-shimmer h-12 w-2/3 rounded mb-4" />
        <div className="animate-shimmer h-8 w-1/3 rounded mb-8" />
        <div className="animate-shimmer h-32 rounded mb-8" />
      </div>
    );
  }
  
  const campaign = getCampaignById(id || '');
  
  if (!campaign) {
    return <Navigate to="/404" />;
  }
  
  const percentFunded = (campaign.amountRaised / campaign.goalAmount) * 100;
  const daysLeft = formatDateDistance(campaign.deadline);
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm">← Back to campaigns</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaign Details - Left 2/3 */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <img 
              src={campaign.imageUrl || '/placeholder.svg'} 
              alt={campaign.title} 
              className="w-full aspect-video object-cover rounded-lg"
            />
          </div>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{campaign.title}</h1>
            <div className="flex items-center text-muted-foreground mb-6">
              <User size={16} className="mr-1" />
              <span>By {campaign.creatorName}</span>
              <span className="mx-2">•</span>
              <CalendarDays size={16} className="mr-1" />
              <span>Created on {formatDate(campaign.createdAt)}</span>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${Math.min(percentFunded, 100)}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">{formatCurrency(campaign.amountRaised)}</div>
                    <div className="text-sm text-muted-foreground">
                      raised of {formatCurrency(campaign.goalAmount)} goal
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold">{percentFunded.toFixed(0)}%</div>
                    <div className="text-sm text-muted-foreground">funded</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold">{daysLeft}</div>
                    <div className="text-sm text-muted-foreground">remaining</div>
                  </div>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">About this project</h2>
                <p className="whitespace-pre-line">{campaign.description}</p>
              </div>
            </div>
          </div>
          
          {/* Donation List for mobile - will be hidden on larger screens */}
          <div className="lg:hidden mt-8">
            <DonationList campaignId={campaign.id} />
          </div>
        </div>
        
        {/* Right Sidebar - 1/3 */}
        <div className="space-y-8">
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <DonationForm campaignId={campaign.id} />
          </div>
          
          {/* Donation List - hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block">
            <DonationList campaignId={campaign.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
