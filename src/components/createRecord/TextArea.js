import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextArea = () => {
    return (
        <TextField
            id="outlined-full-width"
            label="作業内容"
            style={{ margin: 8 }}
            placeholder="作業内容...."
            //helperText="Full width!"
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
        />
    );
};

export default TextArea;
