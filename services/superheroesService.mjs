import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id) {
    return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}

export function crearheroe(body) {
    //convertimos el string en array
    body.poderes = parseList(body.poderes);
    body.aliados = parseList(body.aliados);
    body.enemigos = parseList(body.enemigos);
    body.creador = parseList(body.creador);

    return superHeroRepository.crearHereo(body);
}

const parseList = (campo) => {
    return campo && typeof campo === 'string'
        ? campo.split(',').map((item) => item.trim()).filter(i => i)
        : [];
};
export async function eliminarSuperHeroeId(id) {
    return await superHeroRepository.eliminarPorId(id);
}

export async function eliminarSuperHeroeNombre(nombre) {
    return await superHeroRepository.eliminarPorNombre(nombre);
}

export async function actualizarSuperHeroe(id, body) {
    return await superHeroRepository.actualizar(id, body);
}