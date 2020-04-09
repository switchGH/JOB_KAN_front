import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, TableBody } from '@material-ui/core';

export function Body(props) {
    const { list, page, rowsPerPage, columns } = props.data;
    return (
        <TableBody>
            {list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((work) => {
                    return (
                        <TableRow hover role="checkbox" key={work.date}>
                            {columns.map((column) => {
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

Body.propTypes = {
    data: PropTypes.object.isRequired,
};
