export default {
    type: "object",
    properties: {
        id: { type: 'string' },
        nombre: { type: 'string' },
        clasificacion: { type: 'string' },
        designacion: { type: 'string' },
        altura_promedio: { type: 'string' },
        colores_de_piel: { type: 'string' },
        colores_de_cabello: { type: 'string' },
        colores_de_ojos: { type: 'string' },
        esperanza_de_vida_promedio: { type: 'string' },
        planeta_natal: { type: 'string' },
        idioma: { type: 'string' },
        personas: { type: 'array' },
        peliculas: { type: 'array' },
        creado: { type: 'string' },
        editado: { type: 'string' },
        url: { type: 'string' },
    }
} as const;