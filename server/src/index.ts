import app from './server';

const port = 5000;

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});

process.on('unhandledRejection', (listener: NodeJS.UnhandledRejectionListener) => {
  console.log('UNHANDLED REJECTION: shutting down...');
  console.log(listener.name);
  process.exit(1);
});
