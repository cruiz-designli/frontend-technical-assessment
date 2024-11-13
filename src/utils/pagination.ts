interface IDotSteps {
  pageRange: (string | number)[];
  index: number;
  stepSize: number;
}

const getDotSteps = ({ pageRange, index, stepSize }: IDotSteps) =>
  pageRange.findIndex((item) => item === index) === 0
    ? Number(pageRange[index + 1]) - stepSize
    : Number(pageRange[index - 1]) + stepSize;

export { getDotSteps };
