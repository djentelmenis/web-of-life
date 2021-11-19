interface GenerateRandomIntegerParams {
  min?: number;
  max: number;
}

const generateRandomInteger = ({
  min = 0,
  max,
}: GenerateRandomIntegerParams) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default generateRandomInteger;
