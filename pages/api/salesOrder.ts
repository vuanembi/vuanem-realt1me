import type { NextApiRequest, NextApiResponse } from 'next';
import type { ScriptSettings } from '../../types/api';

import instance from './api';

const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const utc = require('dayjs/plugin/utc');

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const salesOrder: ScriptSettings = {
  script: 997,
  deployment: 1,
};

const columns = ['trandate', 'revenue', 'quantity', 'transactions'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = instance(salesOrder);
  try {
    const { data } = JSON.parse(await client({ data: 0 }));
    const parsedData = data.results.map(
      ({ values }: { values: Array<string | number> }) =>
        values
          .map((value, i) => ({
            metric: columns[i],
            value,
          }))
          .filter(({ metric }) => metric !== 'trandate')
    );
    res.status(200).json({ data: parsedData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: 'oops' });
  }
};

export default handler;
