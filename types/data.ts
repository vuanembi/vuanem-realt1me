export type MetricData = {
  metric: string;
  value: number;
};

export type APIData = {
  data: Array<Array<MetricData>>;
};

export type DisplayProps = {
  metric: string;
  todayVal: number;
  variance: number;
};
