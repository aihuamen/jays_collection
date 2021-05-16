import Chart from "react-apexcharts";
import { AnimeCharEdge } from "../interfaces/seiyuu";

interface IChart {
  anime: AnimeCharEdge[];
}

const MChart: React.FC<IChart> = ({ anime }) => {
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
      }}
      series={[
        {
          name: "score",
          data: anime.map((a) => a.node.averageScore ?? 0),
        },
      ]}
      type="bar"
      height={500}
    />
  );
};

export default MChart;
