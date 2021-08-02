import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/utils/Map"), {
  ssr: false,
});

const M = () => {
  return <Map />;
};

export default M;
