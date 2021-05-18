import Chart from "react-apexcharts";
import { RankSortType, SCORE_DESC } from "../interfaces/seiyuu";
import { AnimeCharEdge } from "../interfaces/seiyuu";

interface IChart {
  anime: AnimeCharEdge[];
  rankType: RankSortType;
}

const AnimeChart: React.FC<IChart> = ({ anime, rankType }) => {
  return (
    <Chart
      options={{
        chart: {
          id: "anime-bar",
        },
        xaxis: {
          categories: anime.map((a) => a.node.title.romaji ?? ""),
          labels: {
            trim: true,
            style: {
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            },
          },
        },
        tooltip: {
          style: {
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
          },
        },
        noData: {
          text: "Please wait...",
        },
        dataLabels: {
          enabled: rankType === SCORE_DESC,
        },
      }}
      series={
        rankType === SCORE_DESC
          ? [
              {
                name: "score",
                data: anime.map((a) => a.node.averageScore ?? 0),
              },
            ]
          : [
              {
                name: "popularity",
                data: anime.map((a) => a.node.popularity ?? 0),
              },
            ]
      }
      type="bar"
      height={500}
    />
  );
};

export default AnimeChart;
