import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

export function Body(props) {
    return (
        <TableBody>
            {props.children.list
                .slice(
                    props.children.page * props.children.rowsPerPage,
                    props.children.page * props.children.rowsPerPage +
                        props.children.rowsPerPage
                )
                .map(work => {
                    return (
                        <TableRow hover role="checkbox" tableIndex={-1} key={work.date}>
                            {props.children.columns.map(column => {
                                let value = work[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
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
