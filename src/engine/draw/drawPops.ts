import type Pop from "../../pop/pop";

interface DrawPopsParams {
  brush: CanvasRenderingContext2D;
  habitatSize: number;
  pops: Pop[];
}

const drawPops = ({ brush, habitatSize, pops }: DrawPopsParams) => {
  brush.save();
  pops.forEach((pop) => {
    const centerX = pop.habitat.column * habitatSize + habitatSize / 2;
    const centerY = pop.habitat.row * habitatSize + habitatSize / 2;
    const radius = (habitatSize - habitatSize * 0.25) / 2;

    const circle = new Path2D();
    circle.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

    brush.fillStyle = "#" + pop.color.toString(16);
    brush.fill(circle);
  });
  brush.restore();
};

export default drawPops;
