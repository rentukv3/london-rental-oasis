import Card from '../../shared/Card'

const TenantOverview = () => (
  <section>
    <h2>Overview</h2>
    <div style={{ display: 'flex', gap: 16 }}>
      <Card title="Active Rentals" value={2} color="primary" />
      <Card title="Upcoming Viewings" value={1} color="secondary" />
      <Card title="Recent Payments" value="£1,200" color="success" />
    </div>
    {/* Aquí irían tablas y notificaciones */}
  </section>
)
export default TenantOverview 