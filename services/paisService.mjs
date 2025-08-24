import axios from 'axios';
import Pais from '../models/Pais.mjs';
import PaisRepository from '../repositories/PaisRepository.mjs';

export const cargarPaisesDesdeAPI = async () => {
    try {
        const { data } = await axios.get('https://restcountries.com/v3.1/region/america');

        const paises = data
            .filter(p => p.languages?.spa && p.name?.official) // solo con idioma español
            .map(p => ({
                tipoObjeto: 'pais',
                creador: 'Ezequiel Miranda',
                nombre: p.translations?.spa.official || p.name?.official,
                capital: p.capital ? p.capital[0] : '',
                fronteras: p.borders || [],
                area: p.area,
                timezones: p.timezones || [],
                poblacion: p.population,
                bandera: p.flags?.svg
            }));

        await PaisRepository.eliminarTodosMisPaises();
        const resultado = await PaisRepository.insertarMuchos(paises);
        if (!resultado) {
            return { error: true, msg: 'hubo un problema al guardar el pais' };
        }
        // Devolvés el país creado 
        return { error: false, msg: 'País Creado correctamente' };

    } catch (error) {
        return { error: false, msg: 'Error cargando países desde API:' + error.message };
    }
};

export async function obtenerTodosLosPaises() {
    return await PaisRepository.obtenerTodos();
}
export async function obtenerPaisPorId(id) {
    return await PaisRepository.obtenerPorId(id);
}

export async function crearPais(body) {
    //convertimos el string en array
    body.capital = parseList(body.capital);
    body.fronteras = parseList(body.fronteras);
    body.timezones = parseList(body.timezones);

    const resultado = await PaisRepository.crearPais(body);
    //si hubiera un error al crear el país
    if (!resultado) {
        return { error: true, msg: 'hubo un problema al guardar el pais' };
    }
    // Devolvés el país creado 
    return { error: false, msg: 'País Creado correctamente' };
}

export async function actualizarPais(id, body) {
    return await PaisRepository.actualizar(id, body);
}

export async function buscarPaisPorAtributo(atributo, valor) {
    return await PaisRepository.buscarPorAtributo(atributo, valor);
}

const parseList = (campo) => {
    return campo && typeof campo === 'string'
        ? campo.split(',').map((item) => item.trim()).filter(i => i)
        : [];
};
export async function eliminarPaisId(id) {
    return await PaisRepository.eliminarPorId(id);
}

export async function eliminarPaisNombre(nombre) {
    return await PaisRepository.eliminarPorNombre(nombre);
}

