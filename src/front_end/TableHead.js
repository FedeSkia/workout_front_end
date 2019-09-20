import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const headCells = [
    { id: 'Name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'Description', numeric: true, disablePadding: false, label: 'Description' }
];



function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell
                    key={1}
                    align={'left'}
                >
                    Select
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
export default EnhancedTableHead;
