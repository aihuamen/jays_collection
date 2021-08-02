import { RankSortType, SCORE_DESC } from "../interfaces/seiyuu";
import { SeiyuuInfo } from "../interfaces/seiyuu";
import {
  Box,
  Container,
  Slide,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import AnimeGridList from "../components/seiyuu/AnimeGridList";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { Skeleton } from "@material-ui/lab";
import Grow from "@material-ui/core/Grow";
import { useSpeed } from "../hooks/useSpeed";
import SeiyuuProfile from "../components/seiyuu/SeiyuuProfile";
import { SEIYUU_SCORE } from "../graphql/query";
import { useSnackbar } from "notistack";
import AppBar from "../components/utils/AppBar";
import SeiyuuSelect from "../components/seiyuu/SeiyuuOption";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      backgroundColor: theme.palette.background.default,
      minHeight: "100vh",
    },
  })
);

const Seiyuu = () => {
  const router = useRouter();
  const classes = useStyles();
  const speed = useSpeed();
  const [load, setLoad] = useState(true);
  const matchMD = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));
  const { enqueueSnackbar } = useSnackbar();
  const res = useQuery<{ Staff: SeiyuuInfo }>(SEIYUU_SCORE, {
    variables: {
      staffSearch: router.query.s ?? "Ayane",
      top: Number(router.query.t ?? "10"),
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
        variant: "error",
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
      </Head>
      <Slide
        in={true}
        direction="left"
        timeout={speed}
        mountOnEnter
        unmountOnExit
      >
        <Box className={classes.background}>
          <AppBar
            title="Seiyuu Anime Ranking"
            includeSearch
            setLoad={setLoad}
          />
          <Toolbar />
          <Container style={{ paddingTop: 24 }}>
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
                <Grow in={!loading} timeout={400}>
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
              <SeiyuuSelect setLoad={setLoad} />
            </Grid>

            <AnimeGridList
              load={load}
              data={data?.characterMedia?.edges}
              rankType={rankType}
            />
          </Container>
        </Box>
      </Slide>
    </>
  );
};

export default Seiyuu;
