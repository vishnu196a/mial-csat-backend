import { headers, secureErrors } from '../shared-schema';

const uploadBulkSubCategoryRouterOpts = {
  headers,
  tags: [
    'sub-categories',
    'admin-role'
  ],
  description:
    'Upload bulk sub-categories. Send the file in form-data with key as file and the Content-Type should be multipart/form-data',
  response: {
    headers,
    201: {
      description: 'sub category has been uploaded',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    ...secureErrors,
  },
};

export default uploadBulkSubCategoryRouterOpts;
