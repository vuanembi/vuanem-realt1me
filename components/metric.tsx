import React from 'react';
import { HStack, VStack, Center, Icon, Text } from '@chakra-ui/react';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { DisplayProps } from '../types/data';

const numberFormatter = new Intl.NumberFormat('en-us', {
  notation: 'compact',
  style: 'decimal',
});
const percentFormatter = new Intl.NumberFormat('en-us', {
  notation: 'compact',
  style: 'percent',
});

const Metric = ({ metric, todayVal, variance }: DisplayProps) => (
  <VStack
    className="shadow hover-shadow"
    p="2rem"
    w="100%"
    bgColor="nord.nord0"
    textColor="nord.nord6"
    borderWidth="0.02rem"
    justify="space-between"
  >
    <HStack justify="space-between" w="100%">
      <Text fontSize="2rem">{metric}</Text>
      <Text fontSize="1.5rem">{percentFormatter.format(variance)}</Text>
    </HStack>
    <HStack justify="space-between" w="100%">
      <Text fontSize="3rem" fontWeight="bold">
        {numberFormatter.format(todayVal)}
      </Text>
      <Center p="0.5rem" bgColor={variance > 0 ? 'nord.nord14' : 'nord.nord11'}>
        <Icon
          as={variance > 0 ? FaChevronUp : FaChevronDown}
          boxSize="2rem"
          color="nord.nord6"
        />
      </Center>
    </HStack>
  </VStack>
);

export default Metric;
