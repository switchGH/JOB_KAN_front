import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, TableHead } from '@material-ui/core';

export function Header(props) {
    const { columns } = props;
    return (
        <TableHead style={{ backgroundColor: '#D9E5FF' }}>
            <TableRow>
                {columns.map((columns) => (
                    <TableCell
                        key={columns.id}
                        align={columns.align}
                        style={{
                            minWidth: columns.minWidth,
                        }}
                    >
                        {columns.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

Header.propTypes = {
    columns: PropTypes.array.isRequired,
};
