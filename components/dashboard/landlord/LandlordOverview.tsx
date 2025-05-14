import Card from '../../shared/Card'

const LandlordOverview = () => (
  <section>
    <h2>Overview</h2>
    <div style={{ display: 'flex', gap: 16 }}>
      <Card title="Total Properties" value={5} color="primary" />
      <Card title="Occupied Units" value={4} color="success" />
      <Card title="Vacant Units" value={1} color="warning" />
      <Card title="Monthly Income" value="£4,500" color="secondary" />
    </div>
    {/* Aquí iría property performance y actividad reciente */}
  </section>
)
export default LandlordOverview 