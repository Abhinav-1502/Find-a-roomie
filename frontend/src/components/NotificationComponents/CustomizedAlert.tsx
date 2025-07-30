import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState<AlertColor>('success');
  const [alertMessage, setAlertMessage] = React.useState('');

  const handleClick = (severity: AlertColor, message: string) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Button
        variant="outlined"
        onClick={() => handleClick('success', 'This is a success message!')}
      >
        Open success snackbar
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Button
        variant="outlined"
        onClick={() => handleClick('error', 'This is an error message!')}
      >
        Open error snackbar
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleClick('warning', 'This is a warning message!')}
      >
        Open warning snackbar
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleClick('info', 'This is an information message!')}
      >
        Open info snackbar
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleClick('success', 'This is another success message!')}
      >
        Open another success snackbar
      </Button>
    </Stack>
  );
}
