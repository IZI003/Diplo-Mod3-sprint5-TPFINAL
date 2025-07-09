export function renderizarSuperheroe(superheroe) {
    return {

        id: superheroe._id,
        nombreSuperHeroe: superheroe.nombreSuperHeroe,
        nombreReal: superheroe.nombreReal,
        edad: superheroe.edad,
        planetaOrigen: superheroe.planetaOrigen,
        debilidad: superheroe.debilidad,
        poderes: superheroe.poderes,
        aliados: superheroe.aliados,
        enemigos: superheroe.enemigos,
        creador: superheroe.creador
    };
}

export function renderizarListaSuperheroes(superheroes) {
    return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}
