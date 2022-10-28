import fs from 'fs';
import { parse } from 'csv-parse';
import { Handler } from '@netlify/functions';

const processFile = async () => {
   const records = [];
   const parser = fs
      .createReadStream(`data/codes.csv`)
      .pipe(parse({
         // CSV options if any
      }));
   for await (const record of parser) {
      // Work with each record
      records.push(record);
   }
   return records;
};

const handler: Handler = async (event) => {
   const code = event.queryStringParameters.code;

   const records = await processFile();
   console.info(records);

   const isValid = records.find(rec => rec[0] === code);

   return {
      statusCode: 200,
      body: JSON.stringify({ isValid }),
   };
};

export { handler };
