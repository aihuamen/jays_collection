import Link from "next/link";
import { useRouter } from "next/router";
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  Container,
  Divider,
  CssBaseline,
} from "@material-ui/core";
import React from "react";
import Head from "next/head";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      minHeight: "25vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    register: {
      width: 200,
      height: 45,
      fontSize: 16,
      color: "white",
      backgroundColor: "#ffa601",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "5px",
    },
    login: {
      background: "rgba(255, 255, 255, 0.7)",
      border: "1px solid #494949",
      boxSizing: "border-box",
      borderRadius: 5,
      textAlign: "center",
      height: 45,
      width: 100,
      textDecoration: "none",
      display: "inline-block",
      fontSize: 16,
    },
    background: {
      textAlign: "center",
      background: "-webkit-linear-gradient(270deg, #ffa601 0%, #ffffff 100%)",
      minHeight: "100vh",
      paddingTop: theme.spacing(3),
    },
  })
);

const IndexPage = () => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Jay's collection</title>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className={classes.background}>
        <CssBaseline />
        <Container>
          <Box paddingTop="5vh">
            <Typography variant="h1" color="initial">
              Jay's collection
            </Typography>
            <br />
            <Divider />
            <br />
            <Typography variant="h2" color="initial">
              Collection of something <i>"Q u a l i t y"</i>
            </Typography>
            <br />
            <Divider />
          </Box>
          <br />
          <Typography variant="h4" color="initial">
            <u>
              <strong>Fun Stuff</strong>
            </u>
          </Typography>
          <br />
          <Typography variant="h5" color="initial">
            <Link href="/seiyuu">
              <a>
                <strong>Seiyuu anime ranking</strong>
              </a>
            </Link>
            <Typography variant="h6" component="span" color="initial">
              {" "}
              - Finding the best anime your Seiyuu has voiced
            </Typography>
          </Typography>
          <br />
          <Typography variant="h5" color="initial">
            <Link href="/seiyuuSSR">
              <a>
                <strong>Seiyuu anime ranking (SSR)</strong>
              </a>
            </Link>
            <Typography variant="h6" component="span" color="initial">
              {" "}
              - Finding the best anime your Seiyuu has voiced (Server Side
              Rendering)
            </Typography>
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default IndexPage;
