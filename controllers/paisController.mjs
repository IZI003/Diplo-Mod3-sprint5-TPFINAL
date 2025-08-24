import Pais from '../models/Pais.mjs';
import {
    actualizarPais, buscarPaisPorAtributo, cargarPaisesDesdeAPI,
    crearPais, eliminarPaisId, eliminarPaisNombre,
    obtenerPaisPorId, obtenerTodosLosPaises
} from '../services/paisService.mjs';
import { validateResult } from '../validations/validateResult.mjs';
import {
    renderizarPais,
    renderizarListaPaises,
} from '../views/responseView.mjs';


export async function obtenerPaisPorIdController(req, res) {
    try {
        const { id } = req.params;
        const pais = await obtenerPaisPorId(id);

        if (!pais) {
            return res.status(404).send({ mensaje: 'Pais no encontrado' });
        }

        const paisFormateado = renderizarPais(pais);
        res.status(200).json(paisFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener el Pais',
            error: error.message
        });
    }
}

// ✅ Controlador para insertar países desde API
export async function insertarPaisAPIController(req, res) {
    const isApi = req.headers['accept']?.includes('application/json');

    try {
        const paises_cargados = await cargarPaisesDesdeAPI();

        if (paises_cargados.error && isApi) {
            return res.status(400).json({ mensaje: paises_cargados.msg });
        } else if (paises_cargados.error && !isApi) {
            // Si todo va bien, renderizás AgregarPais con mensaje de éxito
            return res.render('AgregarPais', {
                errores: { message: paises_cargados.msg, type: "error" },
                info: {}
            });
        }

        // Si la carga es exitosa
        if (isApi) {
            return res.status(200).json({ mensaje: 'Países cargados correctamente' });
        }

        // Si todo va bien, renderizás AgregarPais con mensaje de éxito
        return res.render('AgregarPais', {
            errores: { message: "pais creado correctamente", type: "success" },
            info: {}
        });

    } catch (err) {
        console.error('❌ Error al guardar el país:', err.message);

        // Armamos los errores para devolverlos como JSON o como redirect con query params
        const errores = err.errors || [{ message: err.message }];

        if (isApi) {
            return res.status(500).json({
                mensaje: 'Error al guardar el país',
                errores
            });
        }

        // Pasamos errores como string en la URL (para que el form los lea)
        const erroresStr = encodeURIComponent(JSON.stringify(errores));
        res.redirect(`/formAgregarPais?errores=${erroresStr}`);
    }
}
// Listar todos
export async function listarPaisesController(req, res) {
    try {
        const paises = await obtenerTodosLosPaises();
        const paisesFormateados = renderizarListaPaises(paises);
        res.status(200).json(paisesFormateados);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener los paises',
            error: error.message
        });
    }
};

// Crear
export async function insertarPaisController(req, res) {
    const isApi = req.headers['accept']?.includes('application/json');

    if (isApi) {
        // responder JSON
        try {
            const pais_creado = await crearPais(req.body);

            if (pais_creado.error) {
                return res.status(500).json({
                    errores: { message: pais_creado.msg, type: "error" }
                });
            }

            return res.status(201).json({
                errores: { message: pais_creado.msg, type: "error" },
                pais: pais_creado
            });

        } catch (err) {
            console.error('❌ Error al guardar el país:', err.message);
            return res.status(400).json({
                errores: { message: `Error al guardar el país ${err.msg}`, type: "error" },
            });
        }
    } else { // responder vista con res.render()

        // Obtenemos info del query string (esto solo tiene sentido cuando redirigís al form en EJS)
        let info = {};
        if (req.query.info) {
            try {
                info = JSON.parse(req.query.info);
            } catch (e) {
                console.error("Error parseando info:", e);
            }
        }

        try {
            // Llamás al servicio para crear un país en DB
            const pais_creado = await crearPais(req.body);
            // Si hubo algún error (no se creó), devolvés una vista renderizada
            if (pais_creado.error) {
                return res.render("AgregarPais", {
                    errores: { message: pais_creado.msg, type: "error" },
                    info: info
                });
            }

            // Si todo va bien, renderizás AgregarPais con mensaje de éxito
            res.render('AgregarPais', {
                errores: { message: pais_creado.msg, type: "success" },
                info
            });

        } catch (err) {
            res.render('AgregarPais', {
                errores: { message: err.message, type: 'error' }, // 👈 array, no string
                info
            });
        }
    }
}



export async function obtenerTodosLosPaisesController(req, res) {
    try {
        const paises = await obtenerTodosLosPaises();
        const paisesFormateados = renderizarListaPaises(paises);
        res.status(200).json(paisesFormateados);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener los paises',
            error: error.message
        });
    }
}

export async function actualizarPaisController(req, res) {
    const isApi = req.headers['accept']?.includes('application/json');

    const { id } = req.params;
    if (isApi) {
        // --- Respuesta API ---
        try {
            const pais_actualizado = await actualizarPais(id, req.body);

            if (!pais_actualizado) {
                return res.status(404).json({
                    errores: { message: "No se encontró el país para actualizar", type: "error" }
                });
            }

            return res.status(200).json({
                errores: { message: "País actualizado correctamente", type: "success" },
                pais: pais_actualizado
            });

        } catch (err) {
            console.error("❌ Error al actualizar el país:", err.message);
            return res.status(500).json({
                errores: { message: `Error al actualizar: ${err.message}`, type: "error" }
            });
        }

    } else {
        // --- Respuesta Vista ---
        let info = {};
        if (req.query.info) {
            try {
                info = JSON.parse(req.query.info);
            } catch (e) {
                console.error("Error parseando info:", e);
            }
        }

        try {
            const pais_actualizado = await actualizarPais(id, req.body);

            if (!pais_actualizado) {
                return res.render("editarPais", {
                    errores: { message: "No se encontró el país para actualizar", type: "error" },
                    info
                });
            }

            res.render("editarPais", {
                errores: { message: "País actualizado correctamente", type: "success" },
                info: pais_actualizado
            });

        } catch (err) {
            console.error("❌ Error al actualizar el país:", err.message);

            res.render("editarPais", {
                errores: { message: err.message, type: "error" },
                info
            });
        }
    }
}


export async function eliminarPaisIdController(req, res) {
    const esApi = req.headers['accept']?.includes('application/json');
    try {
        const { id } = req.params;
        const pais_eliminado = await eliminarPaisId(id);
        const paises = await obtenerTodosLosPaises();

        if (!pais_eliminado) {
            if (esApi) {
                // 📌 Caso API
                return res.status(404).json({
                    error: "No se encontró el país a eliminar",
                    type: "error"
                });
            }
            // 📌 Caso HTML
            return res.render("dashboard", {
                msg: "Error inesperado al eliminar el país",
                type: "error",
                paises
            });
        }

        if (esApi) {
            // 📌 Caso API
            return res.status(200).json({
                mensaje: "País eliminado correctamente",
                type: "success",
                pais: pais_eliminado
            });
        }

        // 📌 Caso HTML
        res.render("dashboard", {
            msg: "País eliminado correctamente",
            type: "success",
            paises
        });

    } catch (err) {
        if (esApi) {
            // 📌 Caso API
            return res.status(500).json({
                error: "Error al eliminar el país: " + err.message,
                type: "error"
            });
        }

        // 📌 Caso HTML
        return res.render("dashboard", {
            msg: "Error al eliminar el país: " + err.message,
            type: "error",
            paises: []
        });
    }
}

// Controlador: Buscar país por atributo
// Este controlador permite buscar países en base a un atributo dinámico (ej: nombre, código, región, etc.)
// Dependiendo de si la petición viene desde una API (Accept: application/json) o desde un navegador, 
// responde en JSON o renderiza la vista EJS correspondiente.

export async function buscarPaisPorAtributoController(req, res) {
    // Detectamos si la petición espera JSON o HTML
    const esApi = req.headers['accept']?.includes('application/json');

    try {
        // Extraemos los parámetros enviados en la URL
        const { atributo, valor } = req.params;

        // Llamamos al servicio que busca países según el atributo y valor
        const paises = await buscarPaisPorAtributo(atributo, valor);

        // Si no se encontraron países
        if (paises.length === 0) {
            if (esApi) {
                // Caso API → devolver JSON con error 404
                return res.status(404).json({
                    mensaje: `No se encontraron países con el atributo "${atributo}" y valor "${valor}"`,
                });
            } else {
                // Caso HTML → renderizamos la vista de búsqueda con mensaje de error
                return res.render('busquedaPaises', {
                    paises: [],
                    errores: [{ message: 'No se encontraron países con ese atributo' }]
                });
            }
        }

        // Si se encontraron países, los formateamos para la vista
        const paisesFormateados = renderizarListaPaises(paises);

        if (esApi) {
            // Caso API → devolver JSON con los resultados
            return res.status(200).json({
                mensaje: "Países encontrados",
                paises: paisesFormateados
            });
        }
        // Caso HTML → renderizamos la vista con la lista de países encontrados
        return res.render('busquedaPaises', {
            paises: paisesFormateados,
            errores: []
        });
    } catch (err) {

        if (esApi) {
            // Caso API → devolver JSON con error 500
            return res.status(500).json({
                mensaje: 'Error al buscar los países',
                error: err.message
            });
        } else {
            // Caso HTML → redirigir con errores
            const erroresStr = encodeURIComponent(JSON.stringify(err.errors || [{ message: err.message }]));
            return res.redirect(`/api/busquedaPaises?errores=${erroresStr}`);
        }
    }
}


export async function aboutController(req, res) {
    res.render('about');
}
export async function landingController(req, res) {
    try {
        const paises = await obtenerTodosLosPaises();

        if (paises.length === 0) {
            res.render("landing", {
                paises: [],
                msg: req.query.msg || null,
                type: req.query.type || null
            });

        } else {

            const paisesFormateados = renderizarListaPaises(paises);
            res.render('landing', {
                paises: paisesFormateados,
                msg: req.query.msg || null,
                type: req.query.type || null
            });
        }
    } catch (error) {
        res.render("landing", {
            paises: [],
            msg: "Error al cargar países",
            type: "error"
        });
    }
}
export function formAgregarPaisController(req, res) {
    let errores = [];
    let info = {};

    // Recuperar datos previos del body en caso de error
    if (req.query.info) {
        try {
            info = JSON.parse(req.query.info);
        } catch (e) {
            console.error("Error parseando info:", e);
        }
    }

    // Recuperar errores de validación
    if (req.query.errores) {
        try {
            errores = JSON.parse(req.query.errores);
        } catch (e) {
            console.error("Error parseando errores:", e);
        }
    }

    res.render('agregarPais', { errores, info });
}

export async function dashboardController(req, res) {
    try {
        const paises = await obtenerTodosLosPaises();

        if (paises.length === 0) {
            res.render("dashboard", {
                paises: [],
                msg: req.query.msg || null,
                type: req.query.type || null
            });

        } else {

            const paisesFormateados = renderizarListaPaises(paises);
            res.render('dashboard', {
                paises: paisesFormateados,
                msg: req.query.msg || null,
                type: req.query.type || null
            });
        }
    } catch (error) {
        res.render("dashboard", {
            paises: [],
            msg: "Error al cargar países",
            type: "error"
        });
    }
}

export async function formActualizarPaisController(req, res) {
    let errores = [];
    let info = {};
    if (req.query.info) {
        try {
            info = JSON.parse(req.query.info);
        } catch (e) {
            console.error("Error parseando info:", e);
        }
    }

    try {
        if (req.query.errores) {
            try {
                errores = JSON.parse(req.query.errores);
            } catch (e) {
                console.error("Error parseando errores:", e);
            }
        }

        const { id } = req.params;
        const pais = await obtenerPaisPorId(id);

        if (!pais) {
            return res.render('editarPais', {
                errores: [{ message: 'Pais no encontrado para editar.' }]
                , info: info // si hay info, la pasamos para que se muestre
            });
        }

        const paisFormateados = renderizarPais(pais);

        res.render('editarPais', {
            info: paisFormateados,
            errores // 👈 ahora se pasa lo que venga en query
        });

    } catch (error) {
        console.error('Error en formActualizarPaisController:', error);
        res.render('editarPais', {
            errores: [{ message: 'Error interno al cargar el formulario de edición.', type: 'error' }],
            info: data // 👈 si hay data, la pasamos para que se muestre
        });
    }
}

export async function confirmarEliminacionController(req, res) {
    try {
        const { id } = req.params;
        const pais = await obtenerPaisPorId(id);

        if (!pais) {
            return res.status(404).send('Pais no encontrado para confirmar eliminación.');
        }

        res.render('confirmarEliminacion', { info: pais });
    } catch (error) {
        console.error('Error en confirmarEliminacionController:', error);
        res.status(500).send({ mensaje: 'Error interno al cargar la página de confirmación.' });
    }
}
/**
 * Controlador para buscar y mostrar todos los países.
 * Dependiendo del tipo de petición (API o vista), devuelve JSON o renderiza una vista EJS.
 */
export async function busquedaPaisesController(req, res) {
    // Detectamos si el cliente quiere JSON (API) o HTML (vista)
    const esApi = req.headers['accept']?.includes('application/json');

    try {
        // Obtenemos todos los países desde la base de datos/servicio
        const paises = await obtenerTodosLosPaises();

        // Si no hay países en la BD
        if (paises.length === 0) {
            if (esApi) {
                // 🔹 Respuesta en JSON para la API
                return res.status(404).json({
                    mensaje: 'No se encontraron países'
                });
            } else {
                // 🔹 Respuesta en vista EJS
                return res.render('busquedaPaises', {
                    paises: [],
                    errores: [{ message: 'No se encontraron países' }]
                });
            }
        }

        // Formateamos la lista de países (ej: agregar banderas, códigos, etc.)
        const paisesFormateados = renderizarListaPaises(paises);

        if (esApi) {
            // 🔹 Devolver en JSON
            return res.status(200).json(paisesFormateados);
        } else {
            // 🔹 Renderizar en la vista EJS
            return res.render('busquedaPaises', {
                paises: paisesFormateados,
                errores: []
            });
        }

    } catch (error) {
        console.error('❌ Error al obtener países:', error.message);

        if (esApi) {
            // 🔹 Respuesta en JSON si la petición es API
            return res.status(500).json({
                mensaje: 'Error al obtener países',
                error: error.message
            });
        } else {
            // 🔹 Redirigir a la vista con los errores
            const erroresStr = encodeURIComponent(JSON.stringify([{ message: error.message }]));
            return res.redirect(`/api/busquedaPaises?errores=${erroresStr}`);
        }
    }
}