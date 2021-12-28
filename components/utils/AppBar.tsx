import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import HideOnScroll from './HideOnScroll';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Input = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

interface IAppBar {
  title: string;
  includeSearch?: boolean;
  setLoad?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppBar: React.FC<IAppBar> = ({ title, includeSearch, setLoad }) => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);

  const params = new URLSearchParams(router.asPath.split('?')[1]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === '') return;
    searchInput.current?.blur();
    setLoad!!(true);
    params.set('s', search);
    router.push('?' + params.toString(), '?' + params.toString(), {
      scroll: false,
    });
  };

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
          {includeSearch && setLoad && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={search}
                  inputRef={searchInput}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </form>
            </Search>
          )}
        </Toolbar>
      </MuiAppBar>
    </HideOnScroll>
  );
};

export default AppBar;
