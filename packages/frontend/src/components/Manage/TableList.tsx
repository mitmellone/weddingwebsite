import {
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableContainerProps,
  TableHead,
  TableRow,
} from "@mui/material";
import { deleteTable, Table as SeatingTable } from "api";
import DeleteIcon from "@mui/icons-material/Delete";

interface TableListProps extends TableContainerProps {
  tableList: SeatingTable[];
  tableListLoading: boolean;
  onUpdateTable: () => void;
}

export default function TableList({
  tableList,
  onUpdateTable,
  tableListLoading,
  ...tableContainerProps
}: TableListProps) {
  if (tableListLoading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer {...tableContainerProps}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Table Number</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableList.map(({ _id, tableNumber, artist }) => (
            <TableRow key={_id}>
              <TableCell>{tableNumber}</TableCell>
              <TableCell>{artist}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={async () => {
                    await deleteTable(_id);
                    await onUpdateTable();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
