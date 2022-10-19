import logger from '../config/logger';

import { forEach } from 'lodash';
import { makeCSVrow, makeCSVheader } from '../lib/util';

import {
  unlink,
  WriteStream,
  createWriteStream,
} from 'fs';
import {
  CATEGORY_REPORT_DOWNLOAD_TEMPLATE,
} from '../config/constants';

class DownloadService {
  csvFilePath: string;
  data: any;
  writeStream!: WriteStream;
  dateRange: any;

  constructor(private fileName: string, data: any, dateRange: any) {
    this.data = data;
    this.csvFilePath = `/tmp/${this.fileName}`;
    this.dateRange = dateRange;
  }

  writeCsvFile() {
    return new Promise((resolve, reject) => {

      this.writeStream = createWriteStream(this.csvFilePath);
      this.writeStream.write(`From Date :, ${this.dateRange.startDate}, To Date :, ${this.dateRange.endDate} \n`);
      this.writeStream.write(makeCSVheader(CATEGORY_REPORT_DOWNLOAD_TEMPLATE));
      this.writeToFile();

      this.writeStream.on('error', (err) => {
        unlink(this.csvFilePath, (unlinkErr) => {
          if (err) logger.error({ err: unlinkErr });
        });

        reject(err);
      });

      this.writeStream.on('finish', () => {
        resolve(this.csvFilePath);
      });
    });
  }

  writeToFile() {
    let totalCount = 0;
    let totalPercentage = 0;
    forEach(this.data, (item, index) => {
      const csvString = makeCSVrow({
        id: String(index + 1),
        name: String(item.dataValues.name.replaceAll(', ', ' ')),
        count: String(item.dataValues.count),
        percentage: String(item.dataValues.percentage ? item.dataValues.percentage : 0)
      });
      const currentPercentage = item.dataValues.percentage ? item.dataValues.percentage : 0;
      totalCount += item.dataValues.count;
      totalPercentage += parseFloat(currentPercentage);

      this.writeStream.write(csvString);

      if ((this.data.length - 1) === index) {
        this.writeStream.write(
          ` , TOTAL, ${totalCount}, ${Math.round(totalPercentage)} `
        );
        logger.info(`${this.csvFilePath} - File created successfully`);
        this.writeStream.end();
      }
    });
  }

  async process() {
    await this.writeCsvFile();
    return this.csvFilePath;
  }
}

export default async function (fileName: string, data: any, dateRange: object) {
  const service = new DownloadService(fileName, data, dateRange);
  const result = await service.process();
  return result;
}
