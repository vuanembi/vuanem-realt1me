import axios from 'axios';

import type { APIData } from '../types/data';

const instance = async (url: string): Promise<APIData> => {
  const { data } = await axios.get(url);
  return data;
};

export default instance;
