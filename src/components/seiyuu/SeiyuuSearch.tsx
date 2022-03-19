import { useLazyQuery } from '@apollo/client';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { SEARCH_SEIYUU_PAGE } from '../../graphql/query';
import { SeiyuuSearchPageResult, VOICE_ACTOR } from '../../interfaces/seiyuu';
import {
  alpha,
  IconButton,
  InputAdornment,
  InputBase,
  styled,
  useAutocomplete,
} from '@mui/material';
import { useRouter } from 'next/router';

const SearchDiv = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  transition: theme.transitions.create('background-color'),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
}));

const Input = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30vw',
      '&:focus': {
        width: '35vw',
      },
    },
  },
}));

const SeiyuuSearch: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);
  const [getSeiyuu, { data, loading }] =
    useLazyQuery<SeiyuuSearchPageResult>(SEARCH_SEIYUU_PAGE);
  const {} = useAutocomplete({ options: data?.Page.staff ?? [] });

  const params = new URLSearchParams(router.asPath.split('?')[1]);

  const fetch = useCallback(
    debounce(
      (staffSearch: string) => getSeiyuu({ variables: { staffSearch } }),
      500
    ),
    []
  );

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (search === '') return;
    searchInput.current?.blur();
    params.set('s', search);
    router.push('?' + params.toString(), '?' + params.toString(), {
      scroll: false,
    });
  };

  return (
    <Autocomplete
      disablePortal
      freeSolo
      sx={{
        width: {
          xs: '100%',
          sm: 'auto',
        },
        marginLeft: {
          xs: 0,
          sm: 1,
        },
      }}
      options={data?.Page.staff ?? []}
      getOptionLabel={(o) =>
        typeof o === 'string' ? '' : `${o.name.full} (${o.name.native})`
      }
      filterOptions={(staffs) =>
        staffs.filter((s) =>
          s.primaryOccupations.some((o) => o === VOICE_ACTOR)
        )
      }
      onChange={(_, v) =>
        setSearch(typeof v === 'string' ? v : v?.name.full ?? '')
      }
      loading={loading}
      renderInput={(p) => (
        <SearchDiv ref={p.InputProps.ref}>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Search…"
              inputProps={p.inputProps}
              inputRef={searchInput}
              onChange={(e) => {
                setSearch(e.target.value);
                fetch(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleSubmit}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </form>
        </SearchDiv>
      )}
    />
  );
};

export default SeiyuuSearch;
