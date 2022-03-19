import { RankSortType, SCORE_DESC } from '../src/interfaces/seiyuu';
import { SeiyuuInfo } from '../src/interfaces/seiyuu';
import { Theme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import AnimeGridList from '../src/components/seiyuu/AnimeGridList';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import Skeleton from '@mui/material/Skeleton';
import { useSpeed } from '../src/hooks/useSpeed';
import SeiyuuProfile from '../src/components/seiyuu/SeiyuuProfile';
import { SEIYUU_SCORE } from '../src/graphql/query';
import { useSnackbar } from 'notistack';
import AppBar from '../src/components/utils/AppBar';
import SeiyuuSelect from '../src/components/seiyuu/SeiyuuOption';
import { NextPage } from 'next';
import TwitterLink from '../src/components/metadata/TwiiterLink';
import OGLink from '../src/components/metadata/OGLink';
import SeiyuuSearch from '../src/components/seiyuu/SeiyuuSearch';
import AppleLink from '../src/components/metadata/AppleLink';

const Seiyuu: NextPage = () => {
  const router = useRouter();
  const speed = useSpeed();
  const [load, setLoad] = useState(true);
  const matchMD = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));
  const { enqueueSnackbar } = useSnackbar();
  const res = useQuery<{ Staff: SeiyuuInfo }>(SEIYUU_SCORE, {
    variables: {
      staffSearch: router.query.s ?? 'Ayane',
      top: Number(router.query.t ?? '10'),
      rankBy: router.query.r ?? [SCORE_DESC],
    },
  });

  const { loading, error, previousData } = res;

  const data = res.data?.Staff ?? previousData?.Staff;
  const rankType = (router.query.r as RankSortType) ?? SCORE_DESC;

  useEffect(() => {
    setLoad(loading);
    if (error && !loading) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  }, [res]);

  return (
    <>
      <Head>
        <title>Seiyuu Anime Ranking</title>
        <meta
          name="description"
          content="Finding the best anime your Seiyuu has voiced"
        />
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest_seiyuu.json" />
        <meta name="application-name" content="Seiyuu Anime Ranking" />
        <OGLink
          page="/seiyuu"
          title="Seiyuu Anime Ranking"
          description="Finding the best anime your Seiyuu has voiced"
        />
        <TwitterLink
          page="/seiyuu"
          title="Seiyuu Anime Ranking"
          description="Finding the best anime your Seiyuu has voiced"
        />
        <AppleLink title="Seiyuu Anime Ranking" />
      </Head>
      <Slide
        in={true}
        direction="left"
        timeout={speed}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100vh',
          }}
        >
          <AppBar title="Seiyuu Anime Ranking" includeSearch>
            <SeiyuuSearch />
          </AppBar>
          <Toolbar />
          {error ? (
            <Typography variant="h2">{error.message}</Typography>
          ) : (
            <Container sx={{ paddingTop: 3 }}>
              <Grid container direction="column" alignItems="center">
                <Typography variant="h3" color="textPrimary">
                  {!loading && data ? data.name.full : <Skeleton width={300} />}
                </Typography>
                <Typography variant="h4" color="textPrimary">
                  {!loading && data ? (
                    data?.name?.native
                  ) : (
                    <Skeleton width={200} />
                  )}
                </Typography>
                <br />
                {!loading && data ? (
                  <SeiyuuProfile
                    data={data}
                    rankType={rankType}
                    loading={loading}
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={matchMD ? 560 : 880}
                    style={{ borderRadius: 16 }}
                  />
                )}
                <br />
                <SeiyuuSelect setLoad={setLoad} />
              </Grid>

              <AnimeGridList
                load={load}
                data={data?.characterMedia?.edges}
                rankType={rankType}
              />
            </Container>
          )}
        </Box>
      </Slide>
    </>
  );
};

export default Seiyuu;
