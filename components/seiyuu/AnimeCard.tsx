import React from "react";
import Image from "next/image";
import {
  AnimeCharEdge,
  RankSortType,
  SCORE_DESC,
} from "../../interfaces/seiyuu";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      minWidth: 100,
      padding: "5px 10px",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "20px",
      height: "95%",
    },
  })
);

interface IAnimeCard {
  anime: AnimeCharEdge;
  rank: number;
  rankType: RankSortType;
}

const rankColor = (rank: number) => {
  let style: { backgroundColor?: string } = {};

  switch (rank) {
    case 0:
      style.backgroundColor = "#D6AF36";
      break;

    case 1:
      style.backgroundColor = "#D7D7D7";
      break;

    case 2:
      style.backgroundColor = "#A77044";
      break;

    default:
      break;
  }

  return style;
};

const AnimeCard: React.FC<IAnimeCard> = ({ anime, rank, rankType }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} style={rankColor(rank)}>
      <CardContent>
        <Typography variant="h4" color="initial">
          #{rank + 1} {rank - 3 < 0 ? "🏆" : ""}
        </Typography>
        <Typography variant="h5">{anime.node.title.romaji}</Typography>
        <Typography variant="subtitle1" color="initial">
          ({anime.node.seasonYear})
        </Typography>
        <Grid container alignItems="center" justify="space-evenly">
          {rankType === SCORE_DESC ? (
            <Grid item xs={6} style={{ textAlign: "center" }}>
              <Typography variant="h6" color="initial">
                Average Score: {anime.node.averageScore}
              </Typography>
              <Typography variant="h6" color="initial">
                Mean Score: {anime.node.meanScore}
              </Typography>
              <Typography variant="subtitle1" color="initial">
                Popularity: {anime.node.popularity}
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography variant="body1" color="initial">
                Score Rank:{" "}
                {
                  anime.node.rankings.find(
                    (r) => r.allTime === true && r.type === "RATED"
                  )?.rank
                }
              </Typography>
              <Typography variant="body2" color="initial">
                Popularity Rank:{" "}
                {
                  anime.node.rankings.find(
                    (r) => r.allTime === true && r.type === "POPULAR"
                  )?.rank
                }
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={6} style={{ textAlign: "center" }}>
              <Typography variant="h6" color="initial">
                Popularity: {anime.node.popularity}
              </Typography>
              <Typography variant="subtitle1" color="initial">
                Average Score: {anime.node.averageScore}
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography variant="body1" color="initial">
                Popularity Rank:{" "}
                {
                  anime.node.rankings.find(
                    (r) => r.allTime === true && r.type === "POPULAR"
                  )?.rank
                }
              </Typography>
              <Typography variant="body2" color="initial">
                Score Rank:{" "}
                {
                  anime.node.rankings.find(
                    (r) => r.allTime === true && r.type === "RATED"
                  )?.rank
                }
              </Typography>
            </Grid>
          )}
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src={anime.characters[0].image.large}
              alt={`Image of ${anime.characters[0].name.full}`}
              width={90}
              height={135}
            />
            <Typography variant="h6" color="initial">
              {anime.characters[0].name.full}
            </Typography>
            <Typography variant="subtitle1" color="initial">
              {anime.characterRole}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default AnimeCard;
