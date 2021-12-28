import Link from 'next/link';
import {
  Box,
  Typography,
  Container,
  Divider,
  CssBaseline,
  Slide,
  Fade,
} from '@mui/material';
import React from 'react';
import Head from 'next/head';
import { useSpeed } from '../src/hooks';
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  const speed = useSpeed();

  return (
    <>
      <Head>
        <title>Jay&apos;s collection</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content='Collection of something "Q u a l i t y"'
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Jay's Collection" />
      </Head>
      <Slide
        in={true}
        direction="down"
        timeout={speed}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            textAlign: 'center',
            background:
              '-webkit-linear-gradient(270deg, #ffa601 0%, #ffffff 100%)',
            minHeight: '100vh',
            paddingTop: 3,
          }}
        >
          <CssBaseline />
          <Container>
            <Box paddingTop="5vh">
              <Typography variant="h1" color="initial">
                Jay&apos;s collection
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography variant="h2" color="initial">
                Collection of something <br />
                <Fade in={true} timeout={1800}>
                  <i>&quot;Q u a l i t y&quot;</i>
                </Fade>
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
                {' '}
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
                {' '}
                - Finding the best anime your Seiyuu has voiced (Server Side
                Rendering)
              </Typography>
            </Typography>
          </Container>
        </Box>
      </Slide>
    </>
  );
};

export default IndexPage;
