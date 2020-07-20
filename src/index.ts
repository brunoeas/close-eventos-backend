import App from './app';

const app = new App();
const port: number = +process.env.PORT || 2210;
app.express.listen(port, () => console.log('> Servidor on-line na porta:', port));
