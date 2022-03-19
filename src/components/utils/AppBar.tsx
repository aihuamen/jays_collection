import React, { useContext } from 'react';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HideOnScroll from './HideOnScroll';
import { ColorModeContext } from '../../context/ColorModeContext';
import Button from '@mui/material/Button';

interface IAppBar {
  title: string;
  includeSearch?: boolean;
}

const AppBar: React.FC<IAppBar> = ({
  title,
  includeSearch = false,
  children: searchComponent,
}) => {
  const { toggleColorMode } = useContext(ColorModeContext);

  return (
    <HideOnScroll>
      <MuiAppBar>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'primary.dark',
          }}
        >
          <Link href="/" passHref>
            <IconButton edge="start" size="large">
              <ArrowBackIosIcon style={{ color: 'white' }} />
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                sm: 'block',
              },
              color: 'primary.contrastText',
            }}
          >
            {title}
          </Typography>
          <Button
            onClick={toggleColorMode}
            variant="contained"
            color="secondary"
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
          >
            Light/Dark
          </Button>
          {includeSearch && searchComponent}
        </Toolbar>
      </MuiAppBar>
    </HideOnScroll>
  );
};

export default AppBar;
