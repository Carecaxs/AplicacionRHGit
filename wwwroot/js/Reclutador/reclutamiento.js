$(document).ready(function () {



    // seccion CrearOfertaReclutador
    if ($("#nombreVista").val() == "CrearOfertaReclutador") {
        $("#enlaceCrearVacante").addClass("active");
        CargarMaterias();
        CargarGruposProfesionales();


        //evento para permiitir solo ingresar numeros
        $('#numVacantes').keydown(function (e) {
            VerificarSoloNumeros(e);                    
        });


        $('#btnCrearOferta').click(function (e) {

            e.preventDefault();

            //validar que todos los campos esten completados
            if (ValidarFormularioCrearOferta()) {
                CrearOferta();
                
            }
        });

    }

});



function VerificarSoloNumeros(e) {

    // Permitir solo números y tecla de retroceso (backspace)
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 8) {
        return true;
    }

    // Prevenir la entrada de cualquier otro carácter
    e.preventDefault();
    return false;
}

function CargarMaterias() {
    // Hacer la solicitud AJAX para cargar las materias
    let url = ObtenerUrlSolicitud('Reclutador', "Oferente/CargarMaterias");

    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {

            // Llenar las opciones del select con las materias
            var selectMaterias = $("#materias");


            // Iterar sobre las materias y añadirlas al select
            $.each(data, function (index, materia) {
                selectMaterias.append($("<option>").val(materia.iD_Materia).text(materia.nombre));
            });
        },
        error: function (error) {
            console.log("Error al cargar las materias: " + error);
        }
    });

}

function CargarGruposProfesionales() {
    // Hacer la solicitud AJAX para cargar las materias
    let url = ObtenerUrlSolicitud('Reclutador', "Oferente/CargarGruposProfesionales");

    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {

            // Llenar las opciones del select con las materias
            var selectGrupos = $("#grupoProfesional");


            // Iterar sobre las materias y añadirlas al select
            $.each(data, function (index, grupoProfesional) {
                selectGrupos.append($("<option>").val(grupoProfesional.idGrupoProfesional).text(grupoProfesional.codigo));
            });
        },
        error: function (error) {
            console.log("Error al cargar las materias: " + error);
        }
    });

}


function ValidarFormularioCrearOferta() {
    // Verificar campos de texto
    var titulo = $('#titulo').val();
    var descripcion = $('#descripcion').val();
    var vacantes = $('#numVacantes').val();

    // Verificar select de materias
    var materia = $('#materias').val();

    // Verificar select de grupo profesional
    var grupoProfesional = $('#grupoProfesional').val();

    // Verificar que los campos de texto no estén vacíos
    if (titulo === '' || descripcion === '' || vacantes === '') {
        alert('Por favor, Debes de completar todos los campos');
        return false;
    }

    // Verificar que los select tengan un valor diferente de 0
    if (materia === '0' || grupoProfesional === '0') {
        alert('Por favor, selecciona una opción válida en los campos de selección.');
        return false;
    }

    return true;
}

function LimpiarFormularioCrearOferta() {
    // Limpiar campos de texto y textarea
    $('#titulo').val('');
    $('#descripcion').val('');
    $('#numVacantes').val('');

    // Seleccionar el primer elemento en los selects
    $('#materias').val($('#materias option:first').val());
    $('#grupoProfesional').val($('#grupoProfesional option:first').val());

}

function CrearOferta() {

    // Obtener el formulario y los datos del formulario
    var form = $("#formularioCrearOferta")[0];
    var formData = new FormData(form);

    // Agregar identificacion y clave al formData
    formData.append("identificacion", $("#identification").val());
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CrearOferta");

    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        processData: false,  // Necesario para enviar FormData correctamente
        contentType: false,  // Necesario para enviar FormData correctamente
        success: function (data) {
            if (data.error) {
                alert('Hubo un problema al crear la oferta, por favor vuelva a intentar!!')
                LimpiarFormularioCrearOferta();

            }
            else {
                alert('Oferta creada con exito!!')
                LimpiarFormularioCrearOferta();
            }

        },
        error: function (error) {
            console.log(error);
        }
    });
}

function ObtenerUrlSolicitud(controllerVistaActual, solicitudAjax) {
    //proceso para obtener el valor de la url que esta atras del nombre del controlador donde se encuentra la vista en esta caso Login
    var segments = window.location.pathname.split('/');
    var index = segments.indexOf(controllerVistaActual);
    var baseUrl = window.location.origin + (index !== -1 ? '/' + segments.slice(1, index).join('/') : '');

    if (baseUrl.charAt(baseUrl.length - 1) != '/') {
        baseUrl += '/';  // Asegurar que la cadena termine con una barra diagonal
    }

    // ruta relativa al controlador
    return baseUrl + solicitudAjax;
}