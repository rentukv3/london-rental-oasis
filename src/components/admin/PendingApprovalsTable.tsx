
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PendingApproval } from "@/types/admin.types";

interface PendingApprovalsTableProps {
  approvals: PendingApproval[];
  onAction: () => void;
}

export function PendingApprovalsTable({ approvals, onAction }: PendingApprovalsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-foreground">Tipo</TableHead>
          <TableHead className="text-foreground">Estado</TableHead>
          <TableHead className="text-foreground">Fecha</TableHead>
          <TableHead className="text-foreground">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {approvals.map((approval) => (
          <TableRow key={approval.id}>
            <TableCell className="text-foreground">{approval.type}</TableCell>
            <TableCell className="text-foreground">{approval.status}</TableCell>
            <TableCell className="text-foreground">
              {new Date(approval.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button 
                onClick={onAction}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Aprobar
              </Button>
              <Button 
                onClick={onAction}
                size="sm"
                variant="destructive"
                className="ml-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Rechazar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
