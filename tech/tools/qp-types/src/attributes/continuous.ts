type ContinuousAttributes<Count extends number, Result extends string[] = []> = Result["length"] extends Count
  ? Result[number]
  : ContinuousAttributes<Count, [...Result, `p${Result["length"]}`]>;

type GenerateObject<Count extends number> = {
  [key in ContinuousAttributes<Count>]: string;
};

type MyObject = Omit<GenerateObject<20>, "p0"> & {
  type: number;
  id: number;
};
