interface ClearFrameParams {
  brush: CanvasRenderingContext2D;
  screenSize: number;
}

const clearFrame = ({ brush, screenSize }: ClearFrameParams) => {
  brush.save();
  brush.fillStyle = "black";
  brush.fillRect(0, 0, screenSize, screenSize);
  brush.restore();
};

export default clearFrame;
