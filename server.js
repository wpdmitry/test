const app = require('./app');
const {port } = require('./config');

app.listen(process.env.PORT || port, () => console.log(`Сервер запущен на порту ${ port }`));
