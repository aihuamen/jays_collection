import { SEIYUU_SCORE } from '../src/graphql/query';
import { RankSortType, SCORE_DESC, SeiyuuInfo } from '../src/interfaces/seiyuu';
import { Theme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { initApollo } from '../src/graphql/client';
import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import AnimeGridList from '../src/components/seiyuu/AnimeGridList';
import Head from 'next/head';
import Skeleton from '@mui/material/Skeleton';
import SeiyuuProfile from '../src/components/seiyuu/SeiyuuProfile';
import AppBar from '../src/components/utils/AppBar';
import SeiyuuOption from '../src/components/seiyuu/SeiyuuOption';
import SeiyuuSearch from '../src/components/seiyuu/SeiyuuSearch';

type Props = {
  data?: SeiyuuInfo;
  // loading: boolean;
  error?: string;
};

const SeiyuuSSR: NextPage<Props> = ({ data, error }) => {
  const router = useRouter();
  const [load, setLoad] = useState(true);
  const rankType = (router.query.r as RankSortType) ?? SCORE_DESC;

  const matchMD = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));

  useEffect(() => {
    setLoad(false);
  }, [data]);

  return (
    <>
      <Head>
        <title>Seiyuu Anime Ranking (SSR)</title>
        <meta
          name="description"
          content="Finding the best anime your Seiyuu has voiced (Server Side Rendering)"
        />
        <meta name="application-name" content="Seiyuu Anime Ranking (SSR)" />
        <meta charSet="utf-8" />
      </Head>
      <Box
        sx={{
          backgroundColor: 'rgba(237,241,245,0.8)',
          minHeight: '100vh',
        }}
      >
        <AppBar title="Seiyuu Anime Ranking (SSR)" includeSearch>
          <SeiyuuSearch />
        </AppBar>
        <Toolbar />
        <Container style={{ paddingTop: 24 }}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h3" color="initial">
              {!load && data ? data.name.full : <Skeleton width={300} />}
            </Typography>
            <Typography variant="h4" color="initial">
              {!load && data ? data?.name?.native : <Skeleton width={200} />}
            </Typography>
            {error && (
              <Typography variant="h3" color="initial">
                {error}
              </Typography>
            )}
            <br />
            {!load && data ? (
              <SeiyuuProfile data={data} rankType={rankType} loading={load} />
            ) : (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={matchMD ? 560 : 880}
                style={{ borderRadius: 16 }}
              />
            )}
            <br />
            <SeiyuuOption setLoad={setLoad} />
          </Grid>
          <AnimeGridList
            load={load}
            data={data?.characterMedia?.edges}
            rankType={rankType}
          />
        </Container>
      </Box>
    </>
  );
};

export default SeiyuuSSR;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const apl = initApollo();
  try {
    const { data } = await apl.query<{ Staff: SeiyuuInfo }>({
      query: SEIYUU_SCORE,
      variables: {
        staffSearch: query.s ?? 'Ayane',
        top: Number(query.t ?? '10'),
        rankBy: query.r ?? [SCORE_DESC],
      },
    });

    return {
      props: {
        data: data.Staff,
      },
    };
  } catch (e) {
    return {
      props: {
        error: (e as Error).message,
      },
    };
  }
};
