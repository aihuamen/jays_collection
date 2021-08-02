import { useState, useRef } from "react";
import { useMap } from "../../hooks/useMap";

const Map: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const map = useMap(ref);
  const [zoom, setZoom] = useState(12);

  return (
    <div>
      <div style={{ width: 1280, height: 720 }} ref={ref} />
      <div>
        <label htmlFor="zoom">Zoom:</label>
        <input
          id="zoom"
          type="number"
          value={zoom}
          onChange={(e) => {
            setZoom(Number(e.target.value));
            map?.setZoom(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
};

export default Map;
