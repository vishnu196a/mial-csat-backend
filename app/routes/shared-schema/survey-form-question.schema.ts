export const questions = {
  type: 'array',
  items: {
    type: 'object',
    required: ['question', 'type'],
    properties: {
      type: { type: 'string' },
      ratings: { type: ['string', 'null'] },
      question: { type: 'string' },
      option: {
        type: ['array', 'null'],
        items: { type: 'string' }
      },
      multi_select: {
        type: ['array', 'null'],
        items: { type: 'string' }
      },
      dependent_questions: {
        type: ['array', 'null'],
        items: {
          type: 'object',
          required: ['question', 'type'],
          properties: {
            type: { type: 'string' },
            ratings: { type: ['string', 'null'] },
            question: { type: 'string' },
            multi_select: {
              type: ['array', 'null'],
              items: { type: 'string' }
            },
            option: { type: 'string' }
          }
        }
      }
    }
  }
};
