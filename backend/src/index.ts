import app from './app';

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('La variable d\'environnement PORT n\'est pas définie dans le fichier .env');
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});