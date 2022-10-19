const sendResetPasswordRouterOpts = {
  schema: {
    description: 'send password reset instruction',
    tags: [
      'passwords',
      'admin-role',
      'agent-role'
    ],
    body: {
      type: 'object',
      required: ['email'],
      properties: {
        email: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'Successfully sent reset instruction',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      },
      500: {
        description: 'Something went wrong',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }
};
export default sendResetPasswordRouterOpts;
