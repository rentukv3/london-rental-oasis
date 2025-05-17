import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminStats, Activity, Landlord, Tenant, AdminDashboardData, PendingApproval, ActivityLogItem } from '@/types/admin.types';
import { toast } from 'sonner';

const Admin = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);
  const [pendingItems, setPendingItems] = useState<PendingApproval[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.from('pending_approvals').select('*');
        const pendingItems = data ? data.map((item: any) => ({
          id: item.id,
          userId: item.user_id,
          type: item.type,
          createdAt: new Date(item.created_at),
          status: item.status,
          data: item.data
        })) : [];
        setPendingItems(pendingItems);

        const { data: activityData } = await supabase.from('activities').select('*');
        const activities = activityData ? activityData.map((item: any) => ({
          id: item.id,
          user_id: item.user_id,
          type: item.action,
          description: item.details,
          created_at: item.created_at
        })) : [];
        setActivities(activities);

        // Use the rpc function to get admin stats
        const { data: statsData } = await supabase.rpc('get_admin_stats');
        if (statsData) {
          setStats({
            totalUsers: statsData.totalUsers || 0,
            totalProperties: statsData.totalProperties || 0,
            totalBookings: statsData.totalBookings || 0,
          });
        }

      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {stats && (
        <div>
          <h2>Statistics</h2>
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Properties: {stats.totalProperties}</p>
          <p>Total Bookings: {stats.totalBookings}</p>
        </div>
      )}

      <div>
        <h2>Recent Activities</h2>
        {activities.map(activity => (
          <div key={activity.id}>
            <p>User ID: {activity.user_id}</p>
            <p>Type: {activity.type}</p>
            <p>Description: {activity.description}</p>
            <p>Created At: {activity.created_at}</p>
          </div>
        ))}
      </div>

      <div>
        <h2>Pending Approvals</h2>
        {pendingItems.map(item => (
          <div key={item.id}>
            <p>User ID: {item.userId}</p>
            <p>Type: {item.type}</p>
            <p>Created At: {item.createdAt.toString()}</p>
            <p>Status: {item.status}</p>
            {item.data && <pre>{JSON.stringify(item.data, null, 2)}</pre>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
