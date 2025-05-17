import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminStats, Activity, Landlord, Tenant, AdminDashboardData, PendingApproval, ActivityLogItem } from '@/types/admin.types';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);
  const [pendingItems, setPendingItems] = useState<PendingApproval[]>([]);

  useEffect(() => {
    // Verificar si el usuario es admin
    if (!user?.user_metadata?.isAdmin) {
      navigate('/');
      return;
    }

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
        toast.error("Error loading admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleApproval = async (itemId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('pending_approvals')
        .update({ status })
        .eq('id', itemId);

      if (error) throw error;

      toast.success(`Item ${status} successfully`);
      setPendingItems(pendingItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error updating approval:", error);
      toast.error("Error updating approval status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rent-blue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalProperties}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalBookings}</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Review and manage pending approvals</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="capitalize">{item.type}</TableCell>
                  <TableCell>{item.userId}</TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      item.status === 'approved' ? 'success' :
                      item.status === 'rejected' ? 'destructive' :
                      'warning'
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApproval(item.id, 'approved')}
                        disabled={item.status !== 'pending'}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleApproval(item.id, 'rejected')}
                        disabled={item.status !== 'pending'}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest system activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map(activity => (
                <TableRow key={activity.id}>
                  <TableCell className="capitalize">{activity.type}</TableCell>
                  <TableCell>{activity.user_id}</TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>{new Date(activity.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
