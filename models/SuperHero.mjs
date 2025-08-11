import mongoose from "mongoose";

const superheroSchema = new mongoose.Schema({
    //_id: { type: Object },
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: [String]
}, { collection: 'Grupo-01' });

const SuperHero = mongoose.model('SuperHero', superheroSchema)
export default SuperHero;