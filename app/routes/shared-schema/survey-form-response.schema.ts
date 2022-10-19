export const responses = {
  type: 'array',
  items: {
    type: 'object',
    required: ['question', 'type'],
    additionalProperties: true,
    properties: {
      type: { type: 'string' },
      rating: { type: ['string', 'null'] },
      answer: { type: 'string' },
      question: { type: 'string' },
      option:  { type: 'string' },
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
            option: {
              type: 'string'
            }
          }
        }
      }
    }
  }
};
