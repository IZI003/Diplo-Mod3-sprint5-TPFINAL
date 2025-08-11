import express from 'express';
import { connectDB } from './config/database.mjs';
import expressLayouts from 'express-ejs-layouts';
import routes from './routes/routes.mjs';
import path from 'path';
import methodOverride from 'method-override';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static(path.resolve('public')));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
// express ejs layouts
app.set('layout', 'layout');
app.use(expressLayouts);

// Necesario para recibir datos de formularios HTML (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use('', routes);

app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});