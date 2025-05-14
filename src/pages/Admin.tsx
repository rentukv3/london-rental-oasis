import React, { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";
import { ActivityTable } from "@/components/admin/ActivityTable";
import { PendingApprovalsTable } from "@/components/admin/PendingApprovalsTable";
import { getAdminStats, getPendingApprovals, getRecentActivities } from "@/lib/admin.service";
import { getTenants, createTenant, updateTenant, deleteTenant } from "@/lib/tenant.service";
import { getLandlords, createLandlord, updateLandlord, deleteLandlord } from "@/lib/landlord.service";
import { getBookings, createBooking, updateBooking, deleteBooking } from "@/lib/booking.service";
import { AdminStats, PendingApproval, Activity } from "@/types/admin.types";
import { Tenant } from "@/types/admin.types";
import { Landlord } from "@/types/admin.types";
import { Booking } from "@/types/booking.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Componente de carga personalizado con los colores del proyecto
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newTenant, setNewTenant] = useState<Partial<Tenant>>({});
  const [newLandlord, setNewLandlord] = useState<Partial<Landlord>>({});
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({});
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [editingLandlord, setEditingLandlord] = useState<Landlord | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  async function fetchAll() {
    setLoading(true);
    try {
      // Use Promise.allSettled to prevent one failed request from blocking others
      const results = await Promise.allSettled([
        getAdminStats(),
        getPendingApprovals(),
        getRecentActivities(),
        getTenants(),
        getLandlords(),
        getBookings(),
      ]);
      
      // Process each result individually
      if (results[0].status === 'fulfilled') {
        setStats(results[0].value);
      }
      
      if (results[1].status === 'fulfilled') {
        setPendingApprovals(results[1].value);
      }
      
      if (results[2].status === 'fulfilled') {
        setActivities(results[2].value);
      }
      
      if (results[3].status === 'fulfilled') {
        setTenants(results[3].value);
      }
      
      if (results[4].status === 'fulfilled') {
        setLandlords(results[4].value);
      }
      
      if (results[5].status === 'fulfilled') {
        setBookings(results[5].value);
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  async function handleCreateTenant() {
    const tenant = await createTenant(newTenant as Tenant);
    if (tenant) {
      setTenants([...tenants, tenant]);
      setNewTenant({});
    }
  }

  async function handleUpdateTenant() {
    if (editingTenant) {
      const tenant = await updateTenant(editingTenant.id, editingTenant);
      if (tenant) {
        setTenants(tenants.map((t) => (t.id === tenant.id ? tenant : t)));
        setEditingTenant(null);
      }
    }
  }

  async function handleDeleteTenant(id: string) {
    const success = await deleteTenant(id);
    if (success) {
      setTenants(tenants.filter((t) => t.id !== id));
    }
  }

  async function handleCreateLandlord() {
    const landlord = await createLandlord(newLandlord as Landlord);
    if (landlord) {
      setLandlords([...landlords, landlord]);
      setNewLandlord({});
    }
  }

  async function handleUpdateLandlord() {
    if (editingLandlord) {
      const landlord = await updateLandlord(editingLandlord.id, editingLandlord);
      if (landlord) {
        setLandlords(landlords.map((l) => (l.id === landlord.id ? landlord : l)));
        setEditingLandlord(null);
      }
    }
  }

  async function handleDeleteLandlord(id: string) {
    const success = await deleteLandlord(id);
    if (success) {
      setLandlords(landlords.filter((l) => l.id !== id));
    }
  }

  async function handleCreateBooking() {
    const booking = await createBooking(newBooking as Booking);
    if (booking) {
      setBookings([...bookings, booking]);
      setNewBooking({});
    }
  }

  async function handleUpdateBooking() {
    if (editingBooking) {
      const booking = await updateBooking(editingBooking.id, editingBooking);
      if (booking) {
        setBookings(bookings.map((b) => (b.id === booking.id ? booking : b)));
        setEditingBooking(null);
      }
    }
  }

  async function handleDeleteBooking(id: string) {
    const success = await deleteBooking(id);
    if (success) {
      setBookings(bookings.filter((b) => b.id !== id));
    }
  }

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="container py-8 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Usuarios" value={stats?.totalUsers ?? 0} />
        <StatCard title="Propiedades" value={stats?.totalProperties ?? 0} />
        <StatCard title="Reservas" value={stats?.totalBookings ?? 0} />
      </div>
      <Tabs defaultValue="inquilinos" className="mb-8">
        <TabsList className="bg-muted">
          <TabsTrigger value="inquilinos">Inquilinos</TabsTrigger>
          <TabsTrigger value="propietarios">Propietarios</TabsTrigger>
          <TabsTrigger value="reservas">Reservas</TabsTrigger>
        </TabsList>
        <TabsContent value="inquilinos">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Gestión de Inquilinos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Agregar Inquilino
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Agregar Inquilino</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="first_name" className="text-right text-foreground">Nombre</Label>
                        <Input 
                          id="first_name" 
                          value={newTenant.first_name || ""} 
                          onChange={(e) => setNewTenant({ ...newTenant, first_name: e.target.value })} 
                          className="col-span-3 bg-background text-foreground" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="last_name" className="text-right text-foreground">Apellido</Label>
                        <Input 
                          id="last_name" 
                          value={newTenant.last_name || ""} 
                          onChange={(e) => setNewTenant({ ...newTenant, last_name: e.target.value })} 
                          className="col-span-3 bg-background text-foreground" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right text-foreground">Email</Label>
                        <Input 
                          id="email" 
                          value={newTenant.email || ""} 
                          onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })} 
                          className="col-span-3 bg-background text-foreground" 
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleCreateTenant}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Guardar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Nombre</TableHead>
                    <TableHead className="text-foreground">Email</TableHead>
                    <TableHead className="text-foreground">Estado</TableHead>
                    <TableHead className="text-foreground">Verificación</TableHead>
                    <TableHead className="text-foreground">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenants.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="text-foreground">{t.first_name} {t.last_name}</TableCell>
                      <TableCell className="text-foreground">{t.email}</TableCell>
                      <TableCell className="text-foreground">{t.status}</TableCell>
                      <TableCell className="text-foreground">{t.verification_status}</TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => setEditingTenant(t)} 
                          size="sm" 
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10"
                        >
                          Editar
                        </Button>
                        <Button 
                          onClick={() => handleDeleteTenant(t.id)} 
                          size="sm" 
                          variant="destructive"
                          className="ml-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="propietarios">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Gestión de Propietarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Agregar Propietario
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Agregar Propietario</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="first_name" className="text-right text-foreground">Nombre</Label>
                        <Input 
                          id="first_name" 
                          value={newLandlord.first_name || ""} 
                          onChange={(e) => setNewLandlord({ ...newLandlord, first_name: e.target.value })} 
                          className="col-span-3 bg-background text-foreground" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="last_name" className="text-right text-foreground">Apellido</Label>
                        <Input 
                          id="last_name" 
                          value={newLandlord.last_name || ""} 
                          onChange={(e) => setNewLandlord({ ...newLandlord, last_name: e.target.value })} 
                          className="col-span-3 bg-background text-foreground" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right text-foreground">Email</Label>
                        <Input 
                          id="email" 
                          value={newLandlord.email || ""} 
                          onChange={(e) => setNewLandlord({ ...newLandlord, email: e.target.value })} 
                          className="col-span-3 bg-background text-foreground" 
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleCreateLandlord}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Guardar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Nombre</TableHead>
                    <TableHead className="text-foreground">Email</TableHead>
                    <TableHead className="text-foreground">Estado</TableHead>
                    <TableHead className="text-foreground">Verificación</TableHead>
                    <TableHead className="text-foreground">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {landlords.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="text-foreground">{l.first_name} {l.last_name}</TableCell>
                      <TableCell className="text-foreground">{l.email}</TableCell>
                      <TableCell className="text-foreground">{l.status}</TableCell>
                      <TableCell className="text-foreground">{l.verification_status}</TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => setEditingLandlord(l)} 
                          size="sm" 
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10"
                        >
                          Editar
                        </Button>
                        <Button 
                          onClick={() => handleDeleteLandlord(l.id)} 
                          size="sm" 
                          variant="destructive"
                          className="ml-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reservas">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Gestión de Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Agregar Reserva
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Agregar Reserva</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="property_id" className="text-right text-foreground">Propiedad</Label>
                        <Input 
                          id="property_id" 
                          value={newBooking.property_id || ""} 
                          onChange={(e) => setNewBooking({ ...newBooking, property_id: e.target.value })} 
                          className="col-span-3 bg-background text-foreground" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tenant_id" className="text-right text-foreground">Inquilino</Label>
                        <Input 
                          id="tenant_id" 
                          value={newBooking.tenant_id || ""} 
                          onChange={(e) => setNewBooking({ ...newBooking, tenant_id: e.target.value })} 
                          className="col-span-3 bg-background text-foreground" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="start_date" className="text-right text-foreground">Fecha Inicio</Label>
                        <Input 
                          id="start_date" 
                          type="date" 
                          value={newBooking.start_date || ""} 
                          onChange={(e) => setNewBooking({ ...newBooking, start_date: e.target.value })} 
                          className="col-span-3 bg-background text-foreground" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="end_date" className="text-right text-foreground">Fecha Fin</Label>
                        <Input 
                          id="end_date" 
                          type="date" 
                          value={newBooking.end_date || ""} 
                          onChange={(e) => setNewBooking({ ...newBooking, end_date: e.target.value })} 
                          className="col-span-3 bg-background text-foreground" 
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleCreateBooking}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Guardar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Propiedad</TableHead>
                    <TableHead className="text-foreground">Inquilino</TableHead>
                    <TableHead className="text-foreground">Estado</TableHead>
                    <TableHead className="text-foreground">Fecha Inicio</TableHead>
                    <TableHead className="text-foreground">Fecha Fin</TableHead>
                    <TableHead className="text-foreground">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="text-foreground">{b.property_id}</TableCell>
                      <TableCell className="text-foreground">{b.tenant_id}</TableCell>
                      <TableCell className="text-foreground">{b.status}</TableCell>
                      <TableCell className="text-foreground">{b.start_date}</TableCell>
                      <TableCell className="text-foreground">{b.end_date}</TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => setEditingBooking(b)} 
                          size="sm" 
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10"
                        >
                          Editar
                        </Button>
                        <Button 
                          onClick={() => handleDeleteBooking(b.id)} 
                          size="sm" 
                          variant="destructive"
                          className="ml-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
