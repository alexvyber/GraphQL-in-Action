export const numbersInRangeObject = (begin, end) => {
  if (end < begin) {
    throw Error(`Invalid range because ${end} < ${begin}`);
  }

  let sum = 0,
    count = 0;

  for (let i = begin; i <= end; i++) {
    sum += i;
    count++;
  }

  return { sum, count, avg: count / sum };
};
