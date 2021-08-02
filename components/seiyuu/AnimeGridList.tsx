import {
  makeStyles,
  Theme,
  createStyles,
  GridList,
  GridListTile,
  useMediaQuery,
  Grow,
} from "@material-ui/core";
import React from "react";
import { AnimeCharEdge } from "../../interfaces/seiyuu";
import { useRouter } from "next/router";
import { Skeleton } from "@material-ui/lab";
import { RankSortType } from "../../interfaces/seiyuu";
import AnimeCard from "./AnimeCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
                <AnimeCard anime={a} rank={i} rankType={rankType} />
              </GridListTile>
            </Grow>
          ))}
    </GridList>
  );
};

export default AnimeGridList;
