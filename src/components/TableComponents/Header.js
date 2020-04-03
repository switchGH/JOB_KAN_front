import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export function Header(props) {
    const { columns } = props.children;
    return (
        <TableHead style={{ backgroundColor: '#D9E5FF' }}>
            <TableRow>
                {columns.map(columns => (
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
