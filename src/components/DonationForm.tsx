
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useCrowdfunding } from '@/context/CrowdfundingContext';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface DonationFormProps {
  campaignId: string;
  onSuccess?: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ campaignId, onSuccess }) => {
  const { addDonation, getCampaignById } = useCrowdfunding();
  const { toast } = useToast();
  const campaign = getCampaignById(campaignId);
  
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donorName || !amount) {
      toast({
        title: "Error",
        description: "Please provide your name and donation amount",
        variant: "destructive"
      });
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid donation amount",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      addDonation({
        campaignId,
        name: donorName,
        amount: amountNumber,
        message: message.trim() || undefined,
      });

      toast({
        title: "Success!",
        description: `Thank you for your donation of ${formatCurrency(amountNumber)}!`,
      });

      // Reset form
      setDonorName('');
      setAmount('');
      setMessage('');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Support this campaign</h3>
      
      <div>
        <Input
          placeholder="Your name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          required
        />
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">$</span>
        </div>
        <Input
          type="number"
          placeholder="0.00"
          min="1"
          step="0.01"
          className="pl-7"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Textarea
          placeholder="Add a message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Donate Now'}
      </Button>
    </form>
  );
};

export default DonationForm;
