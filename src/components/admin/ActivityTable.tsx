
import { Activity } from "@/types/admin.types";

interface ActivityTableProps {
  activities: Activity[];
}

export function ActivityTable({ activities }: ActivityTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{new Date(activity.created_at).toLocaleString()}</td>
              <td>{activity.user_id}</td>
              <td>{activity.action}</td>
              <td>{activity.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
