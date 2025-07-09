import {
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30,
    crearheroe,
    eliminarSuperHeroeId,
    eliminarSuperHeroeNombre,
    actualizarSuperHeroe
} from '../services/superheroesService.mjs';

import {
    renderizarSuperheroe,
    renderizarListaSuperheroes,
} from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener el superhéroe',
            error: error.message
        });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener los superhéroes',
            error: error.message
        });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

        if (superheroes.length === 0) {
            return res.status(404).send({
                mensaje: 'No se encontraron superhéroes con ese atributo'
            });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al buscar los superhéroes',
            error: error.message
        });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();

        if (superheroes.length === 0) {
            return res.status(404).send({
                mensaje: 'No se encontraron superhéroes mayores de 30 años'
            });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener superhéroes mayores de 30',
            error: error.message
        });
    }
}

export async function insertarSuperHeroeController(req, res) {
    try {

        const new_superhero = await crearheroe(req.body);
        // res.status(201).json(new_superhero); 
        //solo con el fin de dar dinamismo al html que vamos a redirigir desde aqui al dashboard
        res.redirect('/api/dashboard');
    } catch (err) {
        console.error('❌ Error al guardar el héroe:', err.message);
        return {
            mensaje: 'Error al insertar nuevo superheroe',
            error: err.message,
            camposInvalidos: err.errors || null
        };
    }
}

export async function actualizarSuperHeroeController(req, res) {
    try {
        const { id } = req.params;
        const nuevo_superheroe = req.body;

        const heroe_actualizado = await actualizarSuperHeroe(id, nuevo_superheroe);

        if (!heroe_actualizado) {
            return res.status(404).send({ mensaje: 'Superheroe no actualizado' });
        }

        //res.status(200).json({ mensaje: 'Heroe Actualizado', heroe: heroe_actualizado });
        //solo con el fin de dar dinamismo al html que vamos a redirigir desde aqui al dashboard
        res.redirect('/api/dashboard');
    } catch (err) {
        res.status(500).send({ mensaje: 'Error al actualizar el superheroe', error: err.message });
    }
}


export async function eliminarSuperHeroeIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe_eliminado = await eliminarSuperHeroeId(id);

        if (!superheroe_eliminado) {
            return res.status(404).send({ mensaje: 'Superheroe no eliminado' });
        }

        //res.status(200).json({ mensaje: 'Heroe Elimiado', heroe: superheroe_eliminado }); // Responde con un mensaje y el héroe eliminado
        //solo con el fin de dar dinamismo al html que vamos a redirigir desde aqui al dashboard
        res.redirect('/api/dashboard');
    } catch (err) {
        res.status(500).send({ mensaje: 'Error al eliminar el superheroe' });
    }
}

export async function eliminarSuperHeroeNombreController(req, res) {
    try {
        const { nombre } = req.params;
        const superheroe_eliminado = await eliminarSuperHeroeNombre(nombre);

        if (!superheroe_eliminado) {
            return res.status(404).send({ mensaje: 'Superheroe no eliminado' });
        }

        res.status(200).json({ mensaje: 'Heroe Elimiado', heroe: superheroe_eliminado });

    } catch (err) {
        res.status(500).send({ mensaje: 'Error al eliminar el superheroe por nombre' });
    }

}
export async function formAgregarHeroController(req, res) {
    res.render('agregarHero');
}
export async function dashboardController(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();

        if (superheroes.length === 0) {
            return res.status(404).send({
                mensaje: 'No se encontraron superhéroes mayores de 30 años'
            });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.render('dashboard', { superheroes: superheroesFormateados });

        // res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener superhéroes mayores de 30',
            error: error.message
        });
    }
}
export async function formActualizarHeroeController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send('Superhéroe no encontrado para editar.');
        }

        res.render('editarHero', { info: superheroe });
    } catch (error) {
        console.error('Error en formActualizarHeroeController:', error);
        res.status(500).send('Error interno al cargar el formulario de edición.');
    }
}

export async function confirmarEliminacionController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send('Superhéroe no encontrado para confirmar eliminación.');
        }

        res.render('confirmarEliminacion', { info: superheroe });
    } catch (error) {
        console.error('Error en confirmarEliminacionController:', error);
        res.status(500).send({ mensaje: 'Error interno al cargar la página de confirmación.' });
    }
}