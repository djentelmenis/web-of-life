import { DEATH_ZONE_RATIO } from "../../constants/constants";

interface DrawDeathZoneParams {
  brush: CanvasRenderingContext2D;
  worldSize: number;
  habitatSize: number;
  screenSize: number;
}

const drawDeathZone = ({
  brush,
  habitatSize,
  worldSize,
}: DrawDeathZoneParams) => {
  const color = "maroon";

  brush.save();
  brush.fillStyle = color;

  brush.fillRect(
    0,
    0,
    habitatSize * worldSize * DEATH_ZONE_RATIO,
    habitatSize * worldSize
  );

  brush.restore();
};

export default drawDeathZone;
