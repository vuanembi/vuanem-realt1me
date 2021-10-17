import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from 'lodash';
import useSWR from 'swr';
import axios from 'axios';
import {
  VStack,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import Metric from './metric';

import type { APIData, MetricData, DisplayProps } from '../types/data';

dayjs.extend(relativeTime);

const Dashboards = () => {
  const { data, error } = useSWR<APIData, Error>(
    '/api/salesOrder',
    (url) => axios.get(url).then((res) => res.data),
    { refreshInterval: 10000, refreshWhenHidden: true }
  );
  if (error) {
    return (
      <VStack textColor="nord.nord0">
        <Heading>No Data for Today</Heading>
        <Text>{JSON.stringify(error, null, 4)}</Text>
      </VStack>
    );
  }
  if (!data) {
    return <Spinner size="xl" color="nord.nord0" thickness="0.25rem" />;
  }
  const dataArray = data.data;
  const parsedData: Array<DisplayProps> = dataArray[0].map(
    ({ metric, value }: MetricData, i: number) => ({
      metric: capitalize(metric),
      todayVal: value,
      variance: (value - dataArray[1][i].value) / dataArray[1][i].value,
    })
  );
  return (
    <Wrap spacing="2rem">
      <Flex
        bgColor="nord.nord0"
        flex="1 0 calc(100% - 2rem)"
        p="1rem"
        textColor="nord.nord6"
        justify="flex-end"
      >
        <Text>{dayjs().toNow()}</Text>
      </Flex>
      {parsedData.map(({ metric, todayVal, variance }) => (
        <WrapItem key={metric} flex={{ base: '1', md: '0 0 calc(50% - 2rem)' }}>
          <Metric metric={metric} todayVal={todayVal} variance={variance} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Dashboards;
