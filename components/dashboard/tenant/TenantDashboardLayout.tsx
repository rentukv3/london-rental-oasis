import Header from '../../shared/Header'
import Sidebar from '../../shared/Sidebar'
import TenantOverview from './TenantOverview'
import PropertyViewing from './PropertyViewing'

const TenantDashboardLayout = () => (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8FF' }}>
    <Sidebar navigation={["Overview", "My Rentals", "Bookings", "Messages", "Documents", "Payments"]} />
    <div style={{ flex: 1 }}>
      <Header title="My Rental Dashboard" notifications userProfile />
      <main style={{ padding: 32 }}>
        <TenantOverview />
        <PropertyViewing />
      </main>
    </div>
  </div>
)
export default TenantDashboardLayout 