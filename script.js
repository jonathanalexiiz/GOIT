let citas = [
	{
		id: 1,
		paciente: "María García López",
		doctor: "Dr. Rodríguez",
		fechaHora: new Date(2025, 5, 15, 9, 0),
		duracion: 30,
		estado: "Confirmada",
	},
	{
		id: 2,
		paciente: "Juan Pérez Martínez",
		doctor: "Dra. Sánchez",
		fechaHora: "2025-06-15T10:30:00",
		duracion: 45,
		estado: "Confirmada",
	},
	{
		id: 3,
		paciente: "Ana Torres Ruiz",
		doctor: "Dr. Rodríguez",
		fechaHora: 1750071600000,
		duracion: 60,
		estado: "Confirmada",
	},
	{
		id: 4,
		paciente: "Carlos Mendoza",
		doctor: "Dr. López",
		fechaHora: "06/15/2025 14:00",
		duracion: 30,
		estado: "Confirmada",
	},
	{
		id: 5,
		paciente: "Laura Jiménez",
		doctor: "Dra. Sánchez",
		fechaHora: new Date(2024, 0, 10, 8, 30),
		duracion: 45,
		estado: "Confirmada",
	},
	{
		id: 6,
		paciente: "Roberto Fernández",
		doctor: "Dr. Rodríguez",
		fechaHora: "2024-02-20T16:00:00",
		duracion: 30,
		estado: "Confirmada",
	},
];

let contadorId = 7;

const doctores = [
	"Dr. Rodríguez",
	"Dra. Sánchez",
	"Dr. López",
	"Dra. Martínez",
];

function formatearFecha(fecha) {
	let fechaObj;

	if (fecha instanceof Date) {
		fechaObj = fecha;
	} else if (typeof fecha === "number") {
		fechaObj = new Date(fecha);
	} else if (typeof fecha === "string") {
		fechaObj = new Date(fecha);
	}

	const dia = fechaObj.getDate().toString().padStart(2, "0");
	const mes = fechaObj.getMonth().toString().padStart(2, "0");
	const año = fechaObj.getFullYear();
	const hora = fechaObj.getHours().toString().padStart(2, "0");
	const minutos = fechaObj.getMinutes().toString().padStart(2, "0");

	return `${dia}/${mes}/${año} - ${hora}:${minutos}`;
}

function formatearHora(fecha) {
	let fechaObj = fecha instanceof Date ? fecha : new Date(fecha);
	const hora = fechaObj.getHours().toString().padStart(2, "0");
	const minutos = fechaObj.getMinutes().toString().padStart(2, "0");
	return `${hora}:${minutos}`;
}

function verificarConflicto(nuevaCita) {
	const nuevaFecha =
		nuevaCita.fechaHora instanceof Date
			? nuevaCita.fechaHora
			: new Date(nuevaCita.fechaHora);

	for (const cita of citas) {
		if (cita.doctor !== nuevaCita.doctor) continue;

		if (cita.estado === "Expirada") continue;

		const citaExistente =
			cita.fechaHora instanceof Date
				? cita.fechaHora
				: new Date(cita.fechaHora);

		if (citaExistente.getTime() === nuevaFecha.getTime()) {
			return {
				hayConflicto: true,
				citaConflicto: cita,
				mensaje: `Conflicto: ${cita.doctor} ya tiene una cita a esa hora exacta con ${cita.paciente}`,
			};
		}
	}

	return { hayConflicto: false };
}

function validarFormulario(datos) {
	const errores = [];

	if (!datos.paciente || datos.paciente.trim().length < 3) {
		errores.push("El nombre del paciente debe tener al menos 3 caracteres");
	}

	if (!datos.doctor) {
		errores.push("Debe seleccionar un doctor");
	}

	if (!datos.fechaHora) {
		errores.push("Debe seleccionar fecha y hora");
	}

	if (!datos.duracion || datos.duracion < 15 || datos.duracion > 120) {
		errores.push("La duración debe estar entre 15 y 120 minutos");
	}

	return errores;
}

function agregarCita(datosCita) {
	const errores = validarFormulario(datosCita);

	if (errores.length > 0) {
		mostrarError(errores.join(". "));
		return false;
	}

	const nuevaCita = {
		id: contadorId++,
		paciente: datosCita.paciente.trim(),
		doctor: datosCita.doctor,
		fechaHora: new Date(datosCita.fechaHora),
		duracion: parseInt(datosCita.duracion),
		estado: "Confirmada",
	};

	const conflicto = verificarConflicto(nuevaCita);
	if (conflicto.hayConflicto) {
		mostrarError(conflicto.mensaje);
		return false;
	}

	citas.push(nuevaCita);
	renderizarCitas();
	mostrarExito("Cita agendada correctamente");
	return true;
}

function cancelarCita(id) {
	const indice = citas.findIndex((c) => c.id === id);
	if (indice !== -1) {
		citas[indice].estado = "Cancelada";
		renderizarCitas();
		mostrarExito("Cita cancelada");
	}
}

function cancelarCitasPasadas() {
	console.log(
		"Función cancelarCitasPasadas() pendiente de implementación completa",
	);

	const ahora = Date.now();

	citas.forEach((cita) => {
		if (cita.fechaHora < ahora && cita.estado === "Confirmada") {
			cita.estado = "Expirada";
		}
	});

	renderizarCitas();
}

function renderizarCitas() {
	const contenedor = document.getElementById("timeline-citas");
	if (!contenedor) return;

	const citasOrdenadas = [...citas].sort((a, b) => {
		const fechaA =
			a.fechaHora instanceof Date ? a.fechaHora : new Date(a.fechaHora);
		const fechaB =
			b.fechaHora instanceof Date ? b.fechaHora : new Date(b.fechaHora);
		return fechaA - fechaB;
	});

	contenedor.innerHTML = "";

	citasOrdenadas.forEach((cita, index) => {
		const tarjeta = crearTarjetaCita(cita, index);
		contenedor.appendChild(tarjeta);
	});

	actualizarEstadisticas();
}

function crearTarjetaCita(cita, index) {
	const div = document.createElement("div");
	div.className = `tarjeta-cita estado-${cita.estado.toLowerCase()}`;
	div.style.zIndex = index;

	const fechaFormateada = formatearFecha(cita.fechaHora);
	const horaFin = calcularHoraFin(cita.fechaHora, cita.duracion);

	div.innerHTML = `
        <div class="tarjeta-header">
            <span class="badge-estado ${cita.estado.toLowerCase()}">${cita.estado}</span>
            <span class="cita-id">#${cita.id}</span>
        </div>
        <div class="tarjeta-body">
            <h3 class="paciente-nombre">${cita.paciente}</h3>
            <p class="doctor-asignado">
                <i class="icon-doctor"></i> ${cita.doctor}
            </p>
            <div class="cita-horario">
                <span class="fecha">${fechaFormateada}</span>
                <span class="duracion">${cita.duracion} min</span>
                <span class="hora-fin">Hasta: ${horaFin}</span>
            </div>
        </div>
        <div class="tarjeta-footer">
            ${
				cita.estado === "Confirmada"
					? `<button class="btn-cancelar" onclick="cancelarCita(${cita.id})">Cancelar</button>`
					: ""
			}
        </div>
    `;

	return div;
}

function calcularHoraFin(fechaInicio, duracionMinutos) {
	const fecha =
		fechaInicio instanceof Date
			? new Date(fechaInicio)
			: new Date(fechaInicio);
	fecha.setMinutes(fecha.getMinutes() + duracionMinutos);
	return formatearHora(fecha);
}

function actualizarEstadisticas() {
	const totalCitas = citas.length;
	const confirmadas = citas.filter((c) => c.estado === "Confirmada").length;
	const canceladas = citas.filter((c) => c.estado === "Cancelada").length;
	const expiradas = citas.filter((c) => c.estado === "Expirada").length;

	const statsContainer = document.getElementById("estadisticas");
	if (statsContainer) {
		statsContainer.innerHTML = `
            <div class="stat-item">
                <span class="stat-numero">${totalCitas}</span>
                <span class="stat-label">Total</span>
            </div>
            <div class="stat-item confirmadas">
                <span class="stat-numero">${confirmadas}</span>
                <span class="stat-label">Confirmadas</span>
            </div>
            <div class="stat-item canceladas">
                <span class="stat-numero">${canceladas}</span>
                <span class="stat-label">Canceladas</span>
            </div>
            <div class="stat-item expiradas">
                <span class="stat-numero">${expiradas}</span>
                <span class="stat-label">Expiradas</span>
            </div>
        `;
	}
}

function mostrarError(mensaje) {
	mostrarNotificacion(mensaje, "error");
}

function mostrarExito(mensaje) {
	mostrarNotificacion(mensaje, "exito");
}

function mostrarNotificacion(mensaje, tipo) {
	const anterior = document.querySelector(".notificacion");
	if (anterior) anterior.remove();

	const notificacion = document.createElement("div");
	notificacion.className = `notificacion notificacion-${tipo}`;
	notificacion.textContent = mensaje;

	document.body.appendChild(notificacion);

	setTimeout(() => notificacion.classList.add("visible"), 10);

	setTimeout(() => {
		notificacion.classList.remove("visible");
		setTimeout(() => notificacion.remove(), 300);
	}, 4000);
}

function inicializarFormulario() {
	const selectDoctor = document.getElementById("doctor");
	if (selectDoctor) {
		doctores.forEach((doctor) => {
			const option = document.createElement("option");
			option.value = doctor;
			option.textContent = doctor;
			selectDoctor.appendChild(option);
		});
	}

	const inputFecha = document.getElementById("fechaHora");
	if (inputFecha) {
		const ahora = new Date();
		const fechaMinima = ahora.toISOString().slice(0, 16);
		inputFecha.min = fechaMinima;
	}

	const formulario = document.getElementById("form-cita");
	if (formulario) {
		formulario.addEventListener("submit", function (e) {
			e.preventDefault();

			const datos = {
				paciente: document.getElementById("paciente").value,
				doctor: document.getElementById("doctor").value,
				fechaHora: document.getElementById("fechaHora").value,
				duracion: document.getElementById("duracion").value,
			};

			if (agregarCita(datos)) {
				formulario.reset();
			}
		});
	}

	const btnLimpiar = document.getElementById("btn-limpiar-expiradas");
	if (btnLimpiar) {
		btnLimpiar.addEventListener("click", cancelarCitasPasadas);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	inicializarFormulario();
	renderizarCitas();

	console.log("Sistema de Turnos MediCare iniciado");
	console.log("Citas cargadas:", citas.length);
});
