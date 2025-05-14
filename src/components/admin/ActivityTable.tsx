import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity } from "@/lib/admin.service";

interface ActivityTableProps {
  activities: Activity[];
}

export function ActivityTable({ activities }: ActivityTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-foreground">Tipo</TableHead>
          <TableHead className="text-foreground">Descripción</TableHead>
          <TableHead className="text-foreground">Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell className="text-foreground">{activity.type}</TableCell>
            <TableCell className="text-foreground">{activity.description}</TableCell>
            <TableCell className="text-foreground">
              {new Date(activity.created_at).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
