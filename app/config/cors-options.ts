const corsOptions = {
  origin: '*',
  methods: 'OPTION, GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  exposedHeaders: 'Authorization, Content-Disposition'
};

export default corsOptions;
