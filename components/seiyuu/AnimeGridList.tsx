import { Theme, useMediaQuery } from "@mui/material";
import React from "react";
import { AnimeCharEdge } from "../../interfaces/seiyuu";
import { useRouter } from "next/router";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Skeleton from '@mui/material/Skeleton';
import { RankSortType } from "../../interfaces/seiyuu";
import AnimeCard from "./AnimeCard";

interface ITile {
  load: boolean;
  data?: AnimeCharEdge[];
  rankType: RankSortType;
}

const AnimeGridList: React.FC<ITile> = ({ data, load, rankType }) => {
  const { query } = useRouter();

  const matchSM = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const matchLG = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));

  return (
    <ImageList
      cols={matchLG ? 3 : matchSM ? 2 : 1}
      gap={20}
      sx={{
        paddingTop: '20px',
        overflowY: 'hidden'
      }}
    >
      {load || !data
        ? [...Array(Number(query.t ?? 10)).keys()].map((i) => (
            <ImageListItem key={i} style={{ height: 380 }}>
              <Skeleton
                variant="rectangular"
                height="100%"
                style={{ borderRadius: "20px"}}
              />
            </ImageListItem>
          ))
        : data.map((a, i) => (
            <AnimeCard key={a.id} anime={a} rank={i} rankType={rankType} load={load} index={i}/> 
          ))}
    </ImageList>
  );
};

export default AnimeGridList;
