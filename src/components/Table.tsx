import * as React from "react";

import Box from "@mui/material/Box";
import MaterialUITable from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { Link as RouterLink } from "react-router-dom";
import { TPlayer } from "../types/players";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { getAge } from "../utils/methods";
import { playerTypeMap } from "../utils/constants";
import { visuallyHidden } from "@mui/utils";

function descendingComparator(a: TPlayer, b: TPlayer, orderBy: keyof TPlayer) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof TPlayer>(
  order: Order,
  orderBy: Key
): (a: TPlayer, b: TPlayer) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(
  array: readonly TPlayer[],
  comparator: (a: TPlayer, b: TPlayer) => number
) {
  const stabilizedThis = array.map(
    (el, index) => [el, index] as [TPlayer, number]
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface HeadCell {
  id: keyof TPlayer;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TPlayer
  ) => void;
  order: Order;
  orderBy: string;
  headCells: readonly HeadCell[];
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof TPlayer) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

interface ITable {
  rows: TPlayer[];
  headCells: readonly HeadCell[];
  selectRow?: (player: TPlayer) => void;
  defaultRowsPerPage?: number;
}

const Table: React.FC<ITable> = ({
  rows,
  headCells,
  selectRow,
  defaultRowsPerPage = 10,
}) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof TPlayer>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);

  const handleRequestSort = React.useCallback(
    (event: React.MouseEvent<unknown>, property: keyof TPlayer) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = React.useMemo(
    () => (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0),
    [page, rows.length, rowsPerPage]
  );

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rows, rowsPerPage]
  );

  const availableCells = new Set(headCells.map(({ id }) => id));

  return (
    <Box width="100%">
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <MaterialUITable
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {selectRow ? (
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        onClick={() => selectRow(row)}
                      >
                        <RouterLink to={`/players/${row.id}`}>
                          {row.name}
                        </RouterLink>
                      </TableCell>
                    ) : (
                      <TableCell component="th" id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                    )}

                    {availableCells.has("type") && (
                      <TableCell align="left">
                        {playerTypeMap[row.type]}
                      </TableCell>
                    )}
                    {availableCells.has("points") && (
                      <TableCell align="right">{row.points}</TableCell>
                    )}
                    {availableCells.has("rank") && (
                      <TableCell align="right">{row.rank}</TableCell>
                    )}
                    {availableCells.has("dob") && (
                      <TableCell align="right">{getAge(row.dob)}</TableCell>
                    )}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </MaterialUITable>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>
    </Box>
  );
};

export default Table;
