import { SEIYUU_SCORE } from "../graphql/query";
import { RankSortType, SCORE_DESC, SeiyuuInfo } from "../interfaces/seiyuu";
import {
  Box,
  Container,
  Grid,
  Grow,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { initApollo } from "../graphql/client";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import HideOnScroll from "../components/utils/HideOnScroll";
import AnimeGridList from "../components/seiyuu/AnimeGridList";
import Head from "next/head";
import { Skeleton } from "@material-ui/lab";
import SeiyuuProfile from "../components/seiyuu/SeiyuuProfile";
import AppBar from "../components/utils/AppBar";
import SeiyuuOption from "../components/seiyuu/SeiyuuOption";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      backgroundColor: "rgba(237,241,245,0.8)",
      minHeight: "100vh",
    },
  })
);

type Props = {
  data?: SeiyuuInfo;
  loading: boolean;
  error?: string;
};

const SeiyuuSSR = ({ data, error }: Props) => {
  const router = useRouter();
  const classes = useStyles();
  const [load, setLoad] = useState(true);
  const rankType = (router.query.r as RankSortType) ?? SCORE_DESC;

  const matchMD = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));

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
      <Box className={classes.background}>
        <AppBar
          title="Seiyuu Anime Ranking (SSR)"
          includeSearch
          setLoad={setLoad}
        />
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
              <Grow in={!load} timeout={400}>
                <SeiyuuProfile data={data} rankType={rankType} />
              </Grow>
            ) : (
              <Skeleton
                variant="rect"
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apl = initApollo();
  try {
    const res = await apl.query({
      query: SEIYUU_SCORE,
      variables: {
        staffSearch: query.s ?? "Ayane",
        top: Number(query.t ?? "10"),
        rankBy: query.r ?? [SCORE_DESC],
      },
    });

    const { data } = res;

    return {
      props: {
        data: data.Staff,
      },
    };
  } catch (e) {
    return {
      props: {
        error: e.message,
      },
    };
  }
};
