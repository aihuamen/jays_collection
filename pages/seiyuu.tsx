import { SEIYUU_SCORE } from "../graphql/query";
import { SeiyuuInfo } from "../interfaces/seiyuu";
import {
  AppBar,
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputBase,
  Radio,
  RadioGroup,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  fade,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import dynamic from "next/dynamic";
import HideOnScroll from "../components/HideOnScroll";
import AnimeGridList from "../components/AnimeGridList";
import Head from "next/head";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { Skeleton } from "@material-ui/lab";
import Grow from "@material-ui/core/Grow";

const Chart = dynamic(() => import("../components/Chart"), { ssr: false });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      backgroundColor: "rgba(237,241,245,0.8)",
      minHeight: "100vh",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    titleAppbar: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    profile: {
      backgroundColor: "lightgrey",
      borderRadius: 16,
      padding: theme.spacing(2),
    },
  })
);

type Props = {
  window: () => Window;
};

type Res = {
  Staff: SeiyuuInfo;
};

const Seiyuu = ({ window }: Props) => {
  const router = useRouter();
  const classes = useStyles();

  const res = useQuery<Res>(SEIYUU_SCORE, {
    variables: {
      staffSearch: router.query.s ?? "Ayane",
      top: Number(router.query.t ?? "10"),
    },
  });

  const { loading, error, previousData } = res;

  const data = res.data ? res.data.Staff : previousData?.Staff;

  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(true);

  const matchMD = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    setLoad(loading);
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
      </Head>
      <Box className={classes.background}>
        <HideOnScroll window={window}>
          <AppBar>
            <Toolbar className={classes.toolbar}>
              <Link href="/">
                <IconButton edge="start">
                  <ArrowBackIosIcon style={{ color: "white" }} />
                </IconButton>
              </Link>
              <Typography
                className={classes.titleAppbar}
                variant="h6"
                color="initial"
              >
                Seiyuu Anime Ranking
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoad(true);
                    router.push(
                      `?s=${search}&t=${router.query.t ?? "10"}`,
                      `?s=${search}&t=${router.query.t ?? "10"}`,
                      {
                        scroll: false,
                      }
                    );
                  }}
                >
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </form>
              </div>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
        <Container style={{ paddingTop: 24 }}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h3" color="initial">
              {!loading && data ? data.name.full : <Skeleton width={300} />}
            </Typography>
            <Typography variant="h4" color="initial">
              {!loading && data ? data?.name?.native : <Skeleton width={200} />}
            </Typography>
            {error && (
              <Typography variant="h3" color="initial">
                {error}
              </Typography>
            )}

            <br />
            {!loading && data ? (
              <Grow in={!loading} timeout={400}>
                <Grid
                  className={classes.profile}
                  container
                  alignItems="center"
                  justify="space-evenly"
                  style={{ height: matchMD ? 560 : 880 }}
                >
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Image
                      src={data.image.large}
                      alt={`Image of ${data.name.full}`}
                      width={200}
                      height={300}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={8}
                    style={{ textAlign: "center", paddingTop: 16 }}
                  >
                    <Typography variant="h6" color="initial">
                      Average Anime Score:{" "}
                      <strong>
                        {data.characterMedia.edges.reduce((acc, c) => {
                          return acc + c.node.averageScore;
                        }, 0) / data.characterMedia.edges.length}
                      </strong>
                    </Typography>
                    <Chart anime={data.characterMedia.edges} />
                  </Grid>
                </Grid>
              </Grow>
            ) : (
              <Skeleton
                variant="rect"
                width="100%"
                height={matchMD ? 560 : 880}
              />
            )}
            <br />
            <FormControl>
              <FormLabel>Select Top</FormLabel>
              <RadioGroup
                row
                value={router.query.t ?? "10"}
                onChange={(e) => {
                  setLoad(true);
                  router.push(
                    `?s=${router.query.s ?? "Ayane"}&t=${e.target.value}`,
                    `?s=${router.query.s ?? "Ayane"}&t=${e.target.value}`,
                    {
                      scroll: false,
                    }
                  );
                }}
              >
                <FormControlLabel value="5" control={<Radio />} label="5" />
                <FormControlLabel value="10" control={<Radio />} label="10" />
                <FormControlLabel value="20" control={<Radio />} label="20" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <AnimeGridList load={load} data={data?.characterMedia?.edges} />
        </Container>
        <Backdrop className={classes.backdrop} open={load}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
};

export default Seiyuu;
