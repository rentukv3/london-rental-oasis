import Header from '../../shared/Header'
import Sidebar from '../../shared/Sidebar'
import LandlordOverview from './LandlordOverview'
import PropertyManagement from './PropertyManagement'

const LandlordDashboardLayout = () => (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8FF' }}>
    <Sidebar navigation={["Overview", "Properties", "Tenants", "Bookings", "Financial", "Documents", "Settings"]} />
    <div style={{ flex: 1 }}>
      <Header title="Property Management Dashboard" notifications userProfile />
      <main style={{ padding: 32 }}>
        <LandlordOverview />
        <PropertyManagement />
      </main>
    </div>
  </div>
)
export default LandlordDashboardLayout 