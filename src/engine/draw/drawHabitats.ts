import drawLine from "./drawLine";

interface DrawHabitatsParams {
  brush: CanvasRenderingContext2D;
  worldSize: number;
  habitatSize: number;
  screenSize: number;
}

const drawHabitats = ({
  brush,
  worldSize,
  habitatSize,
  screenSize,
}: DrawHabitatsParams) => {
  const color = "white";

  for (let i = 0; i <= worldSize; i++) {
    drawLine({
      brush,
      color,
      startX: i * habitatSize,
      startY: 0,
      endX: i * habitatSize,
      endY: screenSize,
    });
  }

  for (let i = 0; i <= worldSize; i++) {
    drawLine({
      brush,
      color,
      startX: 0,
      startY: i * habitatSize,
      endX: screenSize,
      endY: i * habitatSize,
    });
  }
};

export default drawHabitats;
