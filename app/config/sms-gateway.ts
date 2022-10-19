import fetch from 'node-fetch';
import logger from './logger';

const { SMS_URL } = process.env;

function sendMessage(attrs) {
  return fetch(SMS_URL, {
    method: 'POST',
    body: JSON.stringify({
      'api-version': '1.0',
      'security-id': 'c2cfd852e887fd8c625ca38fdbe15b00d8db323de2fe7933fe5bfd1fb5cc88d6',
      'flow-id': '0JtsZsKt',
      calls: [
        {
          'client-identifier': 'jkkirfrhdJJdj',
          'start-time': '2022-07-29T04:00:00+05:30',
          'contact-numbers': [`${attrs.mobileNumber}`],
          keys: [
            {
              name: '$flow.key.FreeTextMessage',
              value: `${attrs.message}`
            },
            {
              name: '$flow.key.DLTTemplateID',
              value: '100000000222690'
            },
            {
              name: '$flow.key.BroadcastType',
              value: 'SMS'
            }
          ]
        }
      ]
    })
  })
  .then(response => logger.info({ response }, 'SMS sent successfully'))
  .catch(err => logger.error({ err }, 'SMS sending error '));
}

export { sendMessage };
