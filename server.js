import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import kolcsonRouter from './routes/kolcsonzes.js';
import konyvRouter from './routes/konyv.js';
import olvasoRouter from './routes/olvaso.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// utvonalak
app.use('/api/kolcsonzes/', kolcsonRouter);
app.use('/api/konyv/', konyvRouter);
app.use('/api/olvaso/', olvasoRouter);



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})