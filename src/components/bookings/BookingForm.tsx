import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { DatePicker } from '@/components/ui/date-picker';

interface BookingFormProps {
  propertyId: string;
  propertyTitle: string;
}

export const BookingForm = ({ propertyId, propertyTitle }: BookingFormProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Must be logged in to book');

      const { error } = await supabase.from('bookings').insert({
        property_id: propertyId,
        user_id: user.id,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        status: 'pending',
      });

      if (error) throw error;

      toast({
        title: 'Booking Request Sent',
        description: 'The property owner will review your request',
      });
      navigate('/bookings');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Property</Label>
        <Input value={propertyTitle} disabled />
      </div>
      <div>
        <Label>Start Date</Label>
        <DatePicker
          selected={startDate}
          onSelect={setStartDate}
          disabled={loading}
        />
      </div>
      <div>
        <Label>End Date</Label>
        <DatePicker
          selected={endDate}
          onSelect={setEndDate}
          disabled={loading}
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Request Booking'}
      </Button>
    </form>
  );
}; 