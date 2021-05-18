import { SEIYUU_SCORE } from "../graphql/query";
import {
  POPULARITY_DESC,
  RankSortType,
  SCORE_DESC,
  SeiyuuInfo,
} from "../interfaces/seiyuu";
import {
  AppBar,
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Grow,
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
import { useRouter } from "next/router";
import { initApollo } from "../graphql/client";
import { GetServerSideProps } from "next";
import React, { useEffect, useRef, useState } from "react";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import dynamic from "next/dynamic";
import HideOnScroll from "../components/HideOnScroll";
import AnimeGridList from "../components/AnimeGridList";
import Head from "next/head";
import Link from "next/link";
import { Skeleton } from "@material-ui/lab";
import { SeiyuuProfile } from "../components/SeiyuuProfile";

const Chart = dynamic(() => import("../components/AnimeChart"), { ssr: false });

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
  data?: SeiyuuInfo;
  loading: boolean;
  error?: string;
  window: () => Window;
};

const Seiyuu = ({ window, data, error }: Props) => {
  const router = useRouter();
  const classes = useStyles();

  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(true);

  const searchInput = useRef<HTMLInputElement>(null);

  const params = new URLSearchParams(router.asPath.split("?")[1]);

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
                Seiyuu Anime Ranking (SSR)
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (search === "") return;
                    searchInput.current?.blur();
                    setLoad(true);
                    params.set("s", search);
                    router.push(
                      "?" + params.toString(),
                      "?" + params.toString(),
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
            <Grid container justify="space-evenly" style={{ width: "100%" }}>
              <FormControl>
                <FormLabel>Select Top</FormLabel>
                <RadioGroup
                  row
                  value={router.query.t ?? "10"}
                  onChange={(e) => {
                    setLoad(true);
                    params.set("t", e.target.value);
                    router.push(
                      "?" + params.toString(),
                      "?" + params.toString(),
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

              <FormControl>
                <FormLabel>Rank By</FormLabel>
                <RadioGroup
                  row
                  value={router.query.r ?? SCORE_DESC}
                  onChange={(e) => {
                    setLoad(true);
                    params.set("r", e.target.value);
                    router.push(
                      "?" + params.toString(),
                      "?" + params.toString(),
                      {
                        scroll: false,
                      }
                    );
                  }}
                >
                  <FormControlLabel
                    value={SCORE_DESC}
                    control={<Radio />}
                    label="Score"
                  />
                  <FormControlLabel
                    value={POPULARITY_DESC}
                    control={<Radio />}
                    label="Popularity"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
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

export default Seiyuu;

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
