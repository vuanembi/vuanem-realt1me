import util from 'util';
import type { ScriptSettings } from '../../types/api';

const nsrestlet = require('nsrestlet');

const accountSettings = {
  accountId: process.env.ACCOUNT_ID,
  tokenKey: process.env.ACCESS_TOKEN,
  tokenSecret: process.env.TOKEN_SECRET,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
};

const instance = ({ script, deployment }: ScriptSettings) => {
  const apiLink = nsrestlet.createLink(accountSettings, {
    script,
    deployment,
  });
  return util.promisify(apiLink.get);
};

export default instance;
