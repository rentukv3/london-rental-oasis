import Card from '../../shared/Card'

const AdminOverview = () => (
  <section>
    <h2>System Overview</h2>
    <div style={{ display: 'flex', gap: 16 }}>
      <Card title="Total Users" value={1200} color="primary" />
      <Card title="Active Listings" value={320} color="secondary" />
      <Card title="Pending Approvals" value={8} color="warning" />
      <Card title="System Health" value="Healthy" color="success" />
    </div>
    {/* Aquí irían métricas adicionales */}
  </section>
)
export default AdminOverview 