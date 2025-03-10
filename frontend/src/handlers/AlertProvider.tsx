import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

// Define the AlertContext to store and update alert information
type AlertContextType = {
  showAlert: (severity: AlertColor, message: string) => void;
  hideAlert: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Alert component that uses MuiAlert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// AlertProvider component to wrap the app and provide the alert context
type AlertProviderProps = {
  children: ReactNode;
};

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor | undefined>('success');
  const [message, setMessage] = useState('');

  const showAlert = (alertSeverity: AlertColor, alertMessage: string) => {
    setSeverity(alertSeverity);
    setMessage(alertMessage);
    setOpen(true);
  };

  const hideAlert = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={hideAlert} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

// Custom hook to access the AlertContext
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
