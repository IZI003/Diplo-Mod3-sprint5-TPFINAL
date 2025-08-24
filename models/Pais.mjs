import mongoose from 'mongoose';

const paisSchema = new mongoose.Schema({
    tipoObjeto: { type: String, default: 'pais', required: true }, // para filtrar
    nombre: { type: String, required: true },
    capital: [{ type: String }],
    fronteras: [{ type: String }],
    area: { type: Number },
    poblacion: { type: Number },
    timezones: [{ type: String }],
    creador: { type: String, default: 'Ezequiel Miranda', required: true },
    bandera: { type: String }
}
    , {
        collection: 'Grupo-01',
        timestamps: true
    });
// Middleware para que todos los "find" siempre filtren por tipoObjeto y creador
paisSchema.pre(/^find/, function (next) {
    this.where({ tipoObjeto: 'pais', creador: 'Ezequiel Miranda' });
    next();
});

export default mongoose.model('Pais', paisSchema);