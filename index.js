const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3088;

app.use(express.json());

const whitelist = [ 'http://localhost:5500', 'https://myapp.co'];
const options = {
  origin: (origin, callback)=> {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) =>{
  res.send('Hola mi primer server en express');
});

app.get('/nueva_ruta', (req, res) =>{
  res.send('Hola, soy nueva ruta');
});

routerApi(app);


app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//reto

// app.get('/equipos/:equipoId/players/:playerId/deals/:dealId/skills/:skillId', (req, res) => {
//   const { equipoId, playerId, dealId, skillId } = req.params;
//   res.json({
//     equipoId,
//     playerId,
//     dealId,
//     skillId
//   });
// });

app.listen(port, () => {
  console.log('Mi port' + port);
});
