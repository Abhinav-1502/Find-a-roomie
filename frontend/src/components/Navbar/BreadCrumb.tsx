// CustomBreadcrumb.tsx
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Link = (props: any) => <RouterLink {...props} />;

function CustomBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Hide breadcrumbs when there is only one link
  if (pathnames.length <= 1) {
    return null;
  }

  const breadcrumbs = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;

    const capitalizedName = name.toUpperCase();

    return isLast ? (
      <Typography key={capitalizedName} color="text.primary">
        {capitalizedName}
      </Typography>
    ) : (
      <Link
        key={capitalizedName}
        underline="hover"
        color="inherit"
        to={routeTo}
        onClick={(event: any) => {
          event.preventDefault();
          console.info('You clicked a breadcrumb.');
        }}
      >
        {capitalizedName}
      </Link>
    );
  });

  return (
    <Stack spacing={2} padding={2}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}

export default CustomBreadcrumb;
