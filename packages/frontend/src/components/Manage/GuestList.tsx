import {
  TableContainerProps,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Guest, deleteGuest } from "api";

interface GuestListProps extends TableContainerProps {
  guestList: Guest[];
  guestListLoading: boolean;
  onUpdateGuest: () => void;
}

export default function GuestList({
  guestList,
  guestListLoading,
  onUpdateGuest,
  ...tableContainerProps
}: GuestListProps) {
  if (guestListLoading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer {...tableContainerProps}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Table Number</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guestList.map(({ _id, name, table, artist }) => (
            <TableRow key={_id}>
              <TableCell>{name}</TableCell>
              <TableCell>{table}</TableCell>
              <TableCell>{artist}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={async () => {
                    await deleteGuest(_id);
                    await onUpdateGuest();
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
