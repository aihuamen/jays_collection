import {
  makeStyles,
  Theme,
  createStyles,
  useMediaQuery,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { RankSortType, SCORE_DESC } from "../../interfaces/seiyuu";
import Image from "next/image";
import { SeiyuuInfo } from "../../interfaces/seiyuu";
import dynamic from "next/dynamic";

const AnimeChart = dynamic(() => import("./AnimeChart"), {
  ssr: false,
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profile: {
      backgroundColor: "lightgrey",
      borderRadius: 16,
      padding: theme.spacing(2),
    },
  })
);

interface IProfile {
  data: SeiyuuInfo;
  rankType: RankSortType;
}

const SeiyuuProfile: React.FC<IProfile> = ({ data, rankType }) => {
  const classes = useStyles();
  const matchMD = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));

  return (
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
      <Grid item xs={12} md={8} style={{ textAlign: "center", paddingTop: 16 }}>
        {rankType === SCORE_DESC ? (
          <Typography variant="h6" color="initial">
            Average Anime Score:{" "}
            <strong>
              {data.characterMedia.edges.reduce((acc, c) => {
                return acc + c.node.averageScore;
              }, 0) / data.characterMedia.edges.length}
            </strong>
          </Typography>
        ) : (
          <Typography variant="h6" color="initial">
            Average Anime Popularity:{" "}
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
  );
};

export default SeiyuuProfile;
