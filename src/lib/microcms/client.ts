import { createClient } from 'microcms-js-sdk';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('"MICROCMS_SERVICE_DOMAIN" is missing');
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('"MICROCMS_API_KEY" is missing');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});
