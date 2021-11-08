import server from './server';

const port = 5000;

server.listen(port, () => {
  console.log(`server listening on ${port}`);
});

process.on('unhandledRejection', (listener: NodeJS.UnhandledRejectionListener) => {
  console.log('UNHANDLED REJECTION: shutting down...');
  console.log(listener.name);
  server.close(() => {
    process.exit(1);
  });
});
