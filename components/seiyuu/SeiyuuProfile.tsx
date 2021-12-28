import Grow from '@mui/material/Grow';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { RankSortType, SCORE_DESC } from '../../interfaces/seiyuu';
import Image from 'next/image';
import { SeiyuuInfo } from '../../interfaces/seiyuu';
import dynamic from 'next/dynamic';

const AnimeChart = dynamic(() => import('./AnimeChart'), {
  ssr: false,
});

interface IProfile {
  data: SeiyuuInfo;
  rankType: RankSortType;
  loading: boolean;
}

const SeiyuuProfile: React.FC<IProfile> = ({ data, rankType, loading }) => {
  return (
    <Grow in={!loading} timeout={400}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-evenly"
        sx={{
          backgroundColor: 'lightgrey',
          borderRadius: 2,
          padding: 2,
          height: {
            xs: '880px',
            md: '550px',
          },
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          style={{ display: 'flex', justifyContent: 'center' }}
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
          style={{ textAlign: 'center', paddingTop: 16 }}
        >
          {rankType === SCORE_DESC ? (
            <Typography variant="h6" color="initial">
              Average Anime Score:{' '}
              <strong>
                {data.characterMedia.edges.reduce((acc, c) => {
                  return acc + c.node.averageScore;
                }, 0) / data.characterMedia.edges.length}
              </strong>
            </Typography>
          ) : (
            <Typography variant="h6" color="initial">
              Average Anime Popularity:{' '}
              <strong>
                {data.characterMedia.edges.reduce((acc, c) => {
                  return acc + c.node.popularity;
                }, 0) / data.characterMedia.edges.length}
              </strong>
            </Typography>
          )}
          <AnimeChart anime={data.characterMedia.edges} rankType={rankType} />
        </Grid>
      </Grid>
    </Grow>
  );
};

export default SeiyuuProfile;
