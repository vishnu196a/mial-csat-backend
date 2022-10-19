const makeCSVheader = (arr: string[]) => `${arr.join(', ')}\n`;

const makeCSVrow = (obj: Object) => // tslint:disable-line
  Object.values(obj).join(", ") + "\n"; // tslint:disable-line

export { makeCSVheader, makeCSVrow };
