import React from 'react';
import type { NextPage } from 'next';
import { Container, Center, Box } from '@chakra-ui/react';

import Dashboards from '../components/dashboard';

const Home: NextPage = () => (
  <Box bgColor="nord.nord6" bgPosition="center" borderRadius={0}>
    <Container as={Center} w="100%" h="100vh">
      <Dashboards />
    </Container>
  </Box>
);

export default Home;
