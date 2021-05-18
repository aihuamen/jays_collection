import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardContent,
  Divider,
  Grid,
  GridList,
  GridListTile,
  Typography,
  useMediaQuery,
  Grow,
} from "@material-ui/core";
import React from "react";
import { AnimeCharEdge } from "../interfaces/seiyuu";
import Image from "next/image";
import { useRouter } from "next/router";
import { Skeleton } from "@material-ui/lab";
import { RankSortType, SCORE_DESC } from "../interfaces/seiyuu";

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
    gridList: {
      paddingTop: 20,
      overflowY: "hidden",
    },
    skeleton: {
      borderRadius: "20px",
    },
  })
);

interface ITile {
  load: boolean;
  data?: AnimeCharEdge[];
  rankType: RankSortType;
}

const AnimeGridList: React.FC<ITile> = ({ data, load, rankType }) => {
  const { query } = useRouter();
  const classes = useStyles();

  const matchSM = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const matchLG = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));

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

  return (
    <GridList
      className={classes.gridList}
      cols={matchLG ? 3 : matchSM ? 2 : 1}
      spacing={20}
    >
      {load || !data
        ? [...Array(Number(query.t ?? 10)).keys()].map((i) => (
            <GridListTile key={i} style={{ height: 380 }}>
              <Skeleton
                className={classes.skeleton}
                variant="rect"
                height="100%"
              />
            </GridListTile>
          ))
        : data.map((a, i) => (
            <Grow key={a.id} in={!load} timeout={!load ? i * 50 + 400 : 300}>
              <GridListTile key={a.id} style={{ height: 400 }}>
                <Card className={classes.card} style={rankColor(i)}>
                  <CardContent>
                    <Typography variant="h4" color="initial">
                      #{i + 1} {i - 3 < 0 ? "🏆" : ""}
                    </Typography>
                    <Typography variant="h5">{a.node.title.romaji}</Typography>
                    <Typography variant="subtitle1" color="initial">
                      ({a.node.seasonYear})
                    </Typography>
                    <Grid container alignItems="center" justify="space-evenly">
                      {rankType === SCORE_DESC ? (
                        <Grid item xs={6} style={{ textAlign: "center" }}>
                          <Typography variant="h6" color="initial">
                            Average Score: {a.node.averageScore}
                          </Typography>
                          <Typography variant="h6" color="initial">
                            Mean Score: {a.node.meanScore}
                          </Typography>
                          <Typography variant="subtitle1" color="initial">
                            Popularity: {a.node.popularity}
                          </Typography>
                          <br />
                          <Divider />
                          <br />
                          <Typography variant="body1" color="initial">
                            Score Rank:{" "}
                            {
                              a.node.rankings.find(
                                (r) => r.allTime === true && r.type === "RATED"
                              )?.rank
                            }
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Popularity Rank:{" "}
                            {
                              a.node.rankings.find(
                                (r) =>
                                  r.allTime === true && r.type === "POPULAR"
                              )?.rank
                            }
                          </Typography>
                        </Grid>
                      ) : (
                        <Grid item xs={6} style={{ textAlign: "center" }}>
                          <Typography variant="h6" color="initial">
                            Popularity: {a.node.popularity}
                          </Typography>
                          <Typography variant="subtitle1" color="initial">
                            Average Score: {a.node.averageScore}
                          </Typography>
                          <br />
                          <Divider />
                          <br />
                          <Typography variant="body1" color="initial">
                            Popularity Rank:{" "}
                            {
                              a.node.rankings.find(
                                (r) =>
                                  r.allTime === true && r.type === "POPULAR"
                              )?.rank
                            }
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Score Rank:{" "}
                            {
                              a.node.rankings.find(
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
                          src={a.characters[0].image.large}
                          alt={`Image of ${a.characters[0].name.full}`}
                          width={90}
                          height={135}
                        />
                        <Typography variant="h6" color="initial">
                          {a.characters[0].name.full}
                        </Typography>
                        <Typography variant="subtitle1" color="initial">
                          {a.characterRole}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </GridListTile>
            </Grow>
          ))}
    </GridList>
  );
};

export default AnimeGridList;
