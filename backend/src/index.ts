import app from './app';

const port = process.env.PORT || 3001;

if (!process.env.PORT) {
  throw new Error('The PORT environment variable is not defined in the .env file');
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
