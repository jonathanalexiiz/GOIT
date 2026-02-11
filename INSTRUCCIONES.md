# Prueba Técnica: Sistema de Turnos para Clínica Médica

## Tiempo: 35 minutos

---

## Contexto del Problema

Eres parte del equipo de desarrollo de **MediCare Plus**, una clínica médica que implementó recientemente un sistema de gestión de citas. Sin embargo, el equipo médico ha reportado varios problemas críticos:

### Quejas del Personal Médico:

1. **"Las fechas en los correos de confirmación salen con el mes atrasado"** - La Dra. García recibió una confirmación para "14/05/2025" cuando la cita era para junio.

2. **"El sistema permite agendar dos pacientes con el mismo doctor a la misma hora"** - El Dr. López tuvo que atender a dos pacientes simultáneamente porque el sistema no detectó el conflicto.

3. **"Las tarjetas de las citas se ven amontonadas y no puedo leer toda la información"** - La recepcionista no puede ver los detalles completos de cada cita.

4. **"Siguen apareciendo citas de la semana pasada en la lista activa"** - El sistema no limpia automáticamente las citas que ya pasaron.

---

## Tareas a Completar

### Tarea 1: Normalizar Formato de Fechas

El array `citasRegistradas` contiene fechas en formatos inconsistentes (objetos Date, strings ISO, timestamps). Normaliza todas las fechas a un formato consistente que permita comparaciones confiables.

### Tarea 2: Corregir el Bug del Mes

La función `formatearFecha()` muestra las fechas con el mes incorrecto. Identifica y corrige el error en el manejo del objeto `Date` de JavaScript.

### Tarea 3: Implementar Detección de Solapamiento

La función `verificarConflicto()` actualmente solo detecta citas que inician exactamente a la misma hora. Debes implementar un algoritmo que detecte **solapamientos reales**, es decir:

- Una cita no puede comenzar mientras otra del mismo doctor sigue en curso
- Considera la duración de cada cita para calcular su hora de finalización

### Tarea 4: Limpiar Citas Expiradas

Implementa la función `cancelarCitasPasadas()` que:

- Recorra todas las citas registradas
- Compare la fecha/hora de cada cita con el tiempo actual (`Date.now()`)
- Marque como `estado: 'Expirada'` las citas cuya fecha y hora ya hayan pasado
- Actualice la interfaz para reflejar el cambio

---

## Entregables

1. **Código corregido**: Los 3 archivos (`index.html`, `styles.css`, `script.js`) con tus correcciones.

2. **CHAT.md** **OBLIGATORIO**:
    - Guarda tu conversación completa con la IA que utilizaste.
    - Puedes exportarla como archivo Markdown o incluir un enlace compartido al chat.
    - Este archivo es **fundamental** para evaluar cómo interactúas con herramientas de IA.

---

## Consejos

- Lee todo el código antes de empezar a hacer cambios.
- Usa la consola del navegador para identificar errores.
- No tengas miedo de pedirle a la IA que te explique conceptos que no entiendas.
- Prioriza las tareas: empieza por los bugs críticos.
- Si no alcanzas a completar todo, está bien. Queremos ver tu proceso de pensamiento.

---
