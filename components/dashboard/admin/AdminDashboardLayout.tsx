import Header from '../../shared/Header'
import Sidebar from '../../shared/Sidebar'
import AdminOverview from './AdminOverview'
import UserManagement from './UserManagement'

const AdminDashboardLayout = () => (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8FF' }}>
    <Sidebar navigation={["Overview", "Users", "Properties", "Bookings", "Reports", "Settings", "System Health"]} />
    <div style={{ flex: 1 }}>
      <Header title="System Administration" notifications userProfile />
      <main style={{ padding: 32 }}>
        <AdminOverview />
        <UserManagement />
      </main>
    </div>
  </div>
)
export default AdminDashboardLayout 