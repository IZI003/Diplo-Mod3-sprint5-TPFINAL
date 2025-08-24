export function renderizarPais(pais) {
    return {
        id: pais._id,
        nombre: pais.nombre,
        capital: pais.capital,
        area: pais.area,
        fronteras: pais.fronteras,
        poblacion: pais.poblacion,
        bandera: pais.bandera,
        timezones: pais.timezones,
        creador: pais.creador
    };
}

export function renderizarListaPaises(paises) {
    return paises.map(pais => renderizarPais(pais));
}