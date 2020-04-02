import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

export function Body(props) {
    const { list, page, rowsPerPage, columns } = props.children;
    return (
        <TableBody>
            {list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(work => {
                    return (
                        <TableRow hover role="checkbox" key={work.date}>
                            {columns.map(column => {
                                let value = work[column.id];
                                return (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {value}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
        </TableBody>
    );
}
