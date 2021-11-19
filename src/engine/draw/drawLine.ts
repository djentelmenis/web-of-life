interface DrawLineParams {
  brush: CanvasRenderingContext2D;
  color: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const drawLine = ({
  brush,
  color,
  startX,
  startY,
  endX,
  endY,
}: DrawLineParams) => {
  brush.save();
  brush.strokeStyle = color;

  brush.beginPath();
  brush.moveTo(startX, startY);
  brush.lineTo(endX, endY);
  brush.stroke();

  brush.restore();
};

export default drawLine;
