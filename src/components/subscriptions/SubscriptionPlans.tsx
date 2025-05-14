
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { SubscriptionPlan } from '@/types';
import { getSubscriptionPlans } from '@/lib/subscription.service';
import { useAuth } from '@/components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPlans() {
      const plans = await getSubscriptionPlans();
      setPlans(plans);
      setLoading(false);
    }
    
    loadPlans();
  }, []);
  
  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in before selecting a subscription plan.",
      });
      navigate('/auth');
      return;
    }
    
    // If free plan, just create the subscription
    if (plan.interval === 'free') {
      // This would be handled by an API endpoint in a real implementation
      toast({
        title: "Basic plan activated",
        description: "You're now on the Basic plan. Start listing your properties!",
      });
      return;
    }
    
    // For paid plans, redirect to checkout (this would be implemented later)
    toast({
      title: "Coming Soon",
      description: `The ${plan.name} plan will be available soon!`,
    });
  };
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground mt-2">Select the plan that best fits your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={
            plan.name === 'Pro' 
              ? 'border-primary shadow-lg relative' 
              : 'relative'
          }>
            {plan.name === 'Pro' && (
              <div className="absolute -top-3 left-0 right-0 mx-auto w-fit">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}
            
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                {plan.interval === 'free' 
                  ? 'Free forever' 
                  : `$${plan.price.toFixed(2)} / month`}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <FeatureItem checked={true}>
                {plan.features?.listingsIncluded === null 
                  ? 'Unlimited listings' 
                  : `${plan.features?.listingsIncluded} listings included`}
              </FeatureItem>
              
              <FeatureItem checked={plan.features?.featuredIncluded! > 0}>
                {plan.features?.featuredIncluded! > 0 
                  ? `${plan.features?.featuredIncluded} featured listings` 
                  : 'No featured listings'}
              </FeatureItem>
              
              <FeatureItem checked={true}>
                {plan.listingDuration} day listing duration
              </FeatureItem>
              
              <FeatureItem checked={plan.features?.listingPriority !== 'standard'}>
                {capitalizeFirstLetter(plan.features?.listingPriority || 'standard')} listing priority
              </FeatureItem>
              
              <FeatureItem checked={plan.features?.analytics !== 'none'}>
                {capitalizeFirstLetter(plan.features?.analytics || 'none')} analytics
              </FeatureItem>
              
              <FeatureItem checked={plan.features?.marketingTools || false}>
                Marketing tools
              </FeatureItem>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={() => handleSelectPlan(plan)} 
                className="w-full"
                variant={plan.name === 'Pro' ? 'default' : 'outline'}
              >
                {plan.interval === 'free' ? 'Start Free' : 'Subscribe'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FeatureItem({ checked, children }: { checked: boolean, children: React.ReactNode }) {
  return (
    <div className={`flex items-center gap-2 ${!checked ? 'text-muted-foreground' : ''}`}>
      <Check className={`h-4 w-4 ${checked ? 'text-primary' : 'text-muted-foreground'}`} />
      <span className="text-sm">{children}</span>
    </div>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
