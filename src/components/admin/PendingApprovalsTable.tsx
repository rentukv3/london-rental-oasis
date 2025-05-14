import { PendingApproval } from "@/lib/admin.service";
import { Button } from "@/components/ui/button";

interface PendingApprovalsTableProps {
  approvals: PendingApproval[];
  onAction: () => void;
}

export function PendingApprovalsTable({ approvals, onAction }: PendingApprovalsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Usuario</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {approvals.map((approval) => (
            <tr key={approval.id}>
              <td>{new Date(approval.created_at).toLocaleString()}</td>
              <td>{approval.type}</td>
              <td>{approval.user_id}</td>
              <td>{approval.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 