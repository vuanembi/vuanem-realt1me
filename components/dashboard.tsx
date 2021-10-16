import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Wrap, WrapItem, Heading } from '@chakra-ui/react';
import { capitalize } from 'lodash';

import Metric from './metric';

import type { APIData, MetricData, DisplayProps } from '../types/data';

const Dashboards = () => {
  const { data, error } = useSWR<APIData, Error>('/api/salesOrder', (url) =>
    axios.get(url).then((res) => res.data)
  );
  if (data) {
    const dataArray = data.data;
    const parsedData: Array<DisplayProps> = dataArray[0].map(
      ({ metric, value }: MetricData, i: number) => ({
        metric: capitalize(metric),
        todayVal: value,
        variance: (value - dataArray[1][i].value) / dataArray[1][i].value,
      })
    );
    return (
      <Wrap w="100%" spacing="2rem">
        {parsedData.map(({ metric, todayVal, variance }) => (
          <WrapItem
            key={metric}
            flex={{ base: '1', md: '0 0 calc(50% - 2rem)' }}
          >
            <Metric metric={metric} todayVal={todayVal} variance={variance} />
          </WrapItem>
        ))}
      </Wrap>
    );
  }
  return <Heading>{JSON.stringify(error)}</Heading>;
};

export default Dashboards;
