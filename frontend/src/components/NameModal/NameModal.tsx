import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'space-around'
};

interface Props {
    open: boolean
    onNameInput: (name: string) => void
}

function NameModal(props: Props) {
    const [name, setName] = React.useState('Cat in the Hat');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
    
    function onSubmit() {
        props.onNameInput(name)
    }

    return (
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField onChange={handleChange} id="outlined-basic" label="Name" variant="outlined" />
                <Button variant="contained" onClick={onSubmit}>Submit</Button>
            </Box>
        </Modal>
    )
}

export default NameModal