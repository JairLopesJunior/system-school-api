const app = require('./app');

app.listen(process.env.SERVER_PORT, () => console.log(`Servidor Pegou :D ${process.env.SERVER_PORT}`));
