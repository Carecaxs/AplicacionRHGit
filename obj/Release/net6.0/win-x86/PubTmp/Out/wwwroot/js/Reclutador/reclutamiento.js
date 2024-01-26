$(document).ready(function () {

    //seccion de enlaces
    $("#enlaceVervacantes").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/VerVacantesReclutador");

        var actionUrl = url;

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);
        var identificacion = $("#identification").val();
        var clave = $("#clave").val();

        form.append('<input type="hidden" name="identification" value="' + identificacion + '">');
        form.append('<input type="hidden" name="clave" value="' + clave + '">');


        form.submit();
    });


    $("#enlaceCrearVacante").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CrearOfertaReclutador");

        var actionUrl = url;

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);
        var identificacion = $("#identification").val();
        var clave = $("#clave").val();

        form.append('<input type="hidden" name="identification" value="' + identificacion + '">');
        form.append('<input type="hidden" name="clave" value="' + clave + '">');


        form.submit();
    });


    $("#enlaceAdministrarVacante").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/AdministrarOfertasReclutador");

        var actionUrl = url;

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);
        var identificacion = $("#identification").val();
        var clave = $("#clave").val();

        form.append('<input type="hidden" name="identification" value="' + identificacion + '">');
        form.append('<input type="hidden" name="clave" value="' + clave + '">');


        form.submit();
    });


    $("#enlaceCandidatos").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/VerCandidatosReclutador");

        var actionUrl = url;

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);
        var identificacion = $("#identification").val();
        var clave = $("#clave").val();

        form.append('<input type="hidden" name="identification" value="' + identificacion + '">');
        form.append('<input type="hidden" name="clave" value="' + clave + '">');


        form.submit();
    });





    // seccion CrearOfertaReclutador
    if ($("#nombreVista").val() == "CrearOfertaReclutador") {

        $("#enlaceCrearVacante").addClass("btn-info active");
        $("#enlaceCrearVacante").removeClass("btn-dark");

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




    if ($("#nombreVista").val() == "VerVacantesReclutador") {

        CargarMisVacantes(1);
        CargarProvincia();
        CargarMaterias();


        $("#enlaceVervacantes").addClass("btn-info active");
        $("#enlaceVervacantes").removeClass("btn-dark");


        $('#btnVerMisVacantes').click(function (e) {

            $("#provincias").val('null');
            $("#materias").val('null');
            $("#cantones").find("option:not(:first)").remove();

            //se envia 1 para que muestre todas las activas
            CargarMisVacantes(1);
        });



        $('#btnVerTodo').click(function (e) {
            $("#provincias").val('null');
            $("#materias").val('null');
            $("#cantones").find("option:not(:first)").remove();
            //se envia 2 para que muestre todas hasta las que ya estan cerradas
            CargarMisVacantes(2);
        });


        $("#provincias").change(function () {
            if ($("#provincias").val() != "null") {//verificar que la opcion no sea "seleccione una provincia"

                //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
                // Elimina todas las opciones excepto la primera (índice 0)
                $("#cantones").find("option:not(:first)").remove();


                var idProvincia = $("#provincias").val();//agarrar el id de la provincia elegida

                CargarCanton(idProvincia);
            }
            else {
                //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
                // Elimina todas las opciones excepto la primera (índice 0)
                $("#cantones").find("option:not(:first)").remove();




            }
            //se envia 3 para que muestre las vacantes pararametro
            CargarMisVacantes(3);

        });

        $("#cantones").change(function () {
            //se envia 3 para que muestre las vacantes pararametro
            CargarMisVacantes(3);
        });

        $("#materias").change(function () {
            //se envia 3 para que muestre las vacantes pararametro
            CargarMisVacantes(3);
        });

        $("#horario").change(function () {
            //se envia 3 para que muestre las vacantes pararametro
            CargarMisVacantes(3);
        });

        $("#listaOfertas").on("click", ".btnVerOferta", function () {
            //obtener fila donde se dio click
            var fila = $(this).closest("tr");

            let idOferta = fila.attr("id");

            MostrarDetallesOferta(idOferta);

            //mostrar modal 
            $("#verOfertaModal").modal("show");

        });

        $("#btnVerPostulantes").click(function (event) {

            event.preventDefault();

            let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/VerCandidatosReclutador");

            var actionUrl = url;

            // Tu lógica para enviar el formulario

            var form = $(".formEnlaces");

            //asignar la accion al formulario
            form.prop('action', actionUrl);
            var identificacion = $("#identification").val();
            var clave = $("#clave").val();
            var idOferta = $("#idOferta").val();

            form.append('<input type="hidden" name="identification" value="' + identificacion + '">');
            form.append('<input type="hidden" name="clave" value="' + clave + '">');
            form.append('<input type="hidden" name="idOferta" value="' + idOferta + '">');



            form.submit();
        });

    }



    if ($("#nombreVista").val() == "AdministrarOfertasReclutador") {
        CargarMisVacantes(1);

        $("#enlaceAdministrarVacante").addClass("btn-info active");
        $("#enlaceAdministrarVacante").removeClass("btn-dark");

        $("#listaOfertas").on("click", ".btnEliminarOferta", function () {
            //obtener fila donde se dio click
            var fila = $(this).closest("tr");

            let idOferta = fila.attr("id");
            EliminarVacante(idOferta);

        });

        $("#listaOfertas").on("click", ".btnVerOferta", function () {
            //obtener fila donde se dio click
            var fila = $(this).closest("tr");

            let idOferta = fila.attr("id");

            MostrarDetallesOferta(idOferta);

            //mostrar modal 
            $("#verOfertaModal").modal("show");

        });

        //evento que solo permite ingresar numeros en el campo cantidadVacantes
        $("#cantidadVacantes").on("input", function (e) {
            // Obtener el valor actual del campo
            var inputValue = $(this).val();

            // Filtrar caracteres no permitidos
            var sanitizedValue = inputValue.replace(/[^0-9]/g, '');

            // Actualizar el valor del campo con solo números
            $(this).val(sanitizedValue);
        });


        $('#btnActualizarOferta').click(function (e) {

            if ($('#tituloOferta').val() != '' && $('#descripcionOferta').val() != '' &&
                $('#cantidadVacantes').val() != '') {
                ActualizarOferta();
            }
        });






    }

    if ($("#nombreVista").val() == "VerCandidatosReclutador") {

        $("#enlaceCandidatos").addClass("btn-info active");
        $("#enlaceCandidatos").removeClass("btn-dark");


        //escondo campos de info del titulo del modal que muestra imagen ampliada ya que solo en la seccion de titulo
        //me interesa que se muestre 
        $("#datosImagenTitulo").hide();

        //se espera que cargue las ofertas del reclutador
        CargarSelectMisvacantes().then(function () {
            //se comprueba si la vista recibio un parametro de alguna oferta
            if ($("#parametroIdOferta").val() != 0) {
                let idOferta = $("#parametroIdOferta").val();
                $("#nombreVacante").val(idOferta);
                $("#nombreVacante").change();
            }
        });

        $("#nombreVacante").change(function () {
            if ($(this).val() != 'null') {

                CargarListaCandidatosSugeridos($(this).val());
                CargarListaCandidatosPostulados($(this).val());

            }
        });



        $("#listaCandidatosPostulados").on("click", ".btnVerExpedientePostulados", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idOferente = fila.attr("id");
            $("#verExpedienteModal").modal("show");

            ObtenerDatosPersonales(idOferente);
            CargarIdiomasOferente(idOferente);
            MostrarGruposProfesionalesOferente(idOferente);
            cargarImagenPerfil(idOferente);

        });

        //evento para mostrar en tamanio grande la foto de perfil
        $("#fotoPerfil").on("click", function () {
            // Obtener la URL de la imagen original
            var urlImagenOriginal = $(this).attr("src");

            // Asignar la URL de la imagen original al modal
            $("#imagenAmpliada").attr("src", urlImagenOriginal);
        });

        $("#listaCandidatosSugerencias").on("click", ".btnVerExpedienteSugeridos", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idOferente = fila.attr("id");
            $("#verExpedienteModal").modal("show");


            ObtenerDatosPersonales(idOferente);
            CargarIdiomasOferente(idOferente);
            MostrarGruposProfesionalesOferente(idOferente);
            cargarImagenPerfil(idOferente);

        });


        $("#listaCandidatosPostulados").on("click", ".btnVerReferenciasPostulados", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idOferente = fila.attr("id");
            $("#verReferenciasModal").modal("show");

            CargarReferencias(idOferente, 1);
            CargarReferencias(idOferente, 2);
            $("#idOferente").val(idOferente);



        });

        $("#listaCandidatosSugerencias").on("click", ".btnVerReferenciasSugeridos", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idOferente = fila.attr("id");
            $("#verReferenciasModal").modal("show");

            CargarReferencias(idOferente, 1);
            CargarReferencias(idOferente, 2);
            $("#idOferente").val(idOferente);

        });


        $("#listaReferenciasPersonales").on("click", ".btnVerReferencia", function () {
            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idReferencia = fila.attr("id");

            MostrarEvaluacion($("#idOferente").val(), idReferencia);

        });


        $("#listaReferenciasProfesionales").on("click", ".btnVerReferencia", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idReferencia = fila.attr("id");

            MostrarEvaluacion($("#idOferente").val(), idReferencia);


        });


        $("#listaCandidatosPostulados").on("click", ".btnVerTitulosPostulados", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idOferente = fila.attr("id");
            $("#verTitulosModal").modal("show");

            CargarTitulos(idOferente, 1);
            CargarTitulos(idOferente, 2);
            CargarTitulos(idOferente, 3);
            $("#idOferente").val(idOferente);


        });

        $("#listaCandidatosSugerencias").on("click", ".btnVerTitulosSugeridos", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idOferente = fila.attr("id");
            $("#verTitulosModal").modal("show");


            CargarTitulos(idOferente, 1);
            CargarTitulos(idOferente, 2);
            CargarTitulos(idOferente, 3);
            $("#idOferente").val(idOferente);

        });

        //evento del boton de ver titulo en la tabla de secundaria
        $("#listaTitulosSecundaria").on("click", ".btnVerTitulo", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idTitulo = fila.attr("id");
            MostrarTitulo($("#idOferente").val(), idTitulo);
        });

        //evento del boton de ver titulo en la tabla de universitarios
        $("#listaTitulosUniversitarios").on("click", ".btnVerTitulo", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idTitulo = fila.attr("id");
            MostrarTitulo($("#idOferente").val(), idTitulo);
        });

        //evento del boton de ver titulo en la tabla de diplomas
        $("#listaTitulosVarios").on("click", ".btnVerTitulo", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idTitulo = fila.attr("id");
            MostrarTitulo($("#idOferente").val(), idTitulo);
        });

        //evento al selecciones ver experiencia
        $("#listaCandidatosPostulados").on("click", ".btnVerExperienciaPostulados", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idOferente = fila.attr("id");
            $("#verExperienciaModal").modal("show");
            $("#idOferente").val(idOferente);
            CargarExperiencias(idOferente);


        });

        $("#listaCandidatosSugerencias").on("click", ".btnVerExperienciaSugeridos", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idOferente = fila.attr("id");
            $("#verExperienciaModal").modal("show");
            $("#idOferente").val(idOferente);
            CargarExperiencias(idOferente);

        });


        //evento ver foto experiencia
        $("#listaExperiencias").on("click", ".btnVerExperiencia", function () {

            // Obtener el id de la fila que va ser el id del titulo 
            var fila = $(this).closest("tr");

            var idExperiencia = fila.attr("id");


            MostrarExperiencia($("#idOferente").val(), idExperiencia);

        });

        //evento que detecta cierre de modal de imagen ampliada
        $('#imagenModal').on('hidden.bs.modal', function () {
            $('#datosImagenTitulo').hide();
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


// funciones seccion VerVacantesReclutador
function agregarOfertasALaTabla(oferta) {
    var tbody = document.getElementById("listaOfertas");

    var row = tbody.insertRow(-1);
    row.id = oferta.idOferta;

    var cellPublicado = row.insertCell(0);
    var fecha = oferta.publicacionOferta.split('T');
    var partesFecha = fecha[0].split('-');
    cellPublicado.textContent = partesFecha[2] + "/" + partesFecha[1] + "/" + partesFecha[0];
    cellPublicado.style.textAlign = "center";
    cellPublicado.className = "text-sm";

    //var cellInstitución = row.insertCell(1);
    //cellInstitución.textContent = oferta.nombreInstitucion;
    //cellInstitución.style.textAlign = "center";

    var cellPuesto = row.insertCell(1);
    cellPuesto.textContent = oferta.nombreOferta;
    cellPuesto.style.textAlign = "center"; // Estilo en línea para centrar verticalmente
    cellPuesto.className = "text-sm";


    //var cellMateria = row.insertCell(1);
    //cellMateria.textContent = oferta.nombreMateria;
    //cellMateria.style.textAlign = "center"; // Estilo en línea para centrar verticalmente

    //var cellDescripcion = row.insertCell(2);
    //cellDescripcion.textContent = oferta.descripcionOferta;
    //cellDescripcion.style.textAlign = "center"; // Estilo en línea para centrar verticalmente

    var cellAcciones = row.insertCell(2);
    cellAcciones.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente

    if ($("#nombreVista").val() == "VerVacantesReclutador") {
        var btnVerOferta = document.createElement("button");
        btnVerOferta.className = "btnVerOferta btn btn-primary btn-sm  w-100";
        btnVerOferta.innerHTML = 'Ver Detalles <i class="fas fa-eye"></i>';
        // Agregar el contenedor div a la celda de acciones
        cellAcciones.appendChild(btnVerOferta);
    }
    else if ($("#nombreVista").val() == "AdministrarOfertasReclutador") {
        var btnVer = document.createElement("button");
        btnVer.className = "btnVerOferta btn btn-info btn-sm w-100";
        btnVer.innerHTML = 'Ver <i class="fas fa-eye"></i>';

        var btnEliminar = document.createElement("button");
        btnEliminar.className = "btnEliminarOferta btn btn-danger btn-sm mt-1 w-100";
        btnEliminar.innerHTML = 'Eliminar <i class="fas fa-trash-alt"></i>';
        // Agregar el contenedor div a la celda de acciones
        cellAcciones.appendChild(btnVer);
        cellAcciones.appendChild(btnEliminar);
    }

}



function procesarRespuestaOfertas(data) {

    var tbody = document.getElementById("listaOfertas");

    tbody.innerHTML = "";

    //verificar si se retorno algo en el data
    if (data.vacio) {

        //no hay titulos para mostrar
        var mensajeTr = document.createElement("tr");
        var mensajeTd = document.createElement("td");
        mensajeTd.colSpan = 4;
        mensajeTd.className = "text-center";
        mensajeTd.textContent = "No hay Ofertas disponibles";

        mensajeTr.appendChild(mensajeTd);
        tbody.appendChild(mensajeTr);
    }
    else {
        data.forEach(function (oferta) {
            agregarOfertasALaTabla(oferta);
        });
    }

}



function MostrarDetallesOferta(id) {
    let url = ObtenerUrlSolicitud('Reclutador', "Oferente/ObtenerDatosOferta");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            idOferta: id
        },
        success: function (data) {

            if (data.error) {

                console.log(data.error);

            } else {

                let fecha = data.publicacionOferta.split('T');
                

                $("#idOferta").val(data.idOferta);
                $("#tituloOferta").val(data.nombreOferta);
                $("#nombreInstitucion").val(data.nombreInstitucion);
                $("#nombreMateria").val(data.nombreMateria);
                $("#descripcionOferta").val(data.descripcionOferta);
                $("#publicacionOferta").val(fecha[0]);          
 


                if ($("#nombreVista").val() == "AdministrarOfertasReclutador") {
                    $("#horario").val(data.horario);
                }
                else {
                    $("#horarioDetalle").val(data.horario == 1 ? "Diurno" : "Nocturno");
                }

                if ($("#nombreVista").val() == "AdministrarOfertasReclutador") {
                    $("#cantidadVacantes").val(data.cantidadVacantes);
                }
            }

        },
        error: function (error) {
            console.log(error);
        }
    });
}


function CargarProvincia() {
    var apiProvincia = "https://apisproyectorg.somee.com/api/Ubicaciones/Provincias/";

    // Elemento <select> de provincias
    var provinciasDropdown = $("#provincias");




    /*         Realiza una solicitud GET a la API*/
    fetch(apiProvincia)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener las provincias.');
            }
            return response.json();
        })
        .then(data => {


            // Llena el ComboBox con las provincias recibidas de la API
            data.forEach(provincia => {
                provinciasDropdown.append($("<option>").val(provincia.idProvincia).text(provincia.nombreProvincia));
            });



        })
        .catch(error => {
            console.error(error);
        });
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


function CargarCanton(idProvincia) {

    const apiCanton = 'https://apisproyectorg.somee.com/api/Ubicaciones/Cantones/';

    fetch(apiCanton + (idProvincia))
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los cantones.');
            }
            return response.json();
        })
        .then(data => {


            // Llena el ComboBox con los cantones recibidos de la API
            data.forEach(cantones => {
                $("#cantones").append($("<option>").val(cantones.idCanton).text(cantones.nombreCanton));
            });


        })
        .catch(error => {
            console.error(error);
        });
}


function CargarMisVacantes(num) {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CargarMisVacantes");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            identification: $("#identification").val(),
            num,
            provincia: ($("#provincias").val() != null ? $("#provincias").val() : 0),
            canton: ($("#cantones").val() != null ? $("#cantones").val() : 0),
            idMateria: ($("#materias").val() != null ? $("#materias").val() : 0),
            horario: (num==2 || num == 1 ? -1 : $("#horario").val())
        },
        success: function (data) {

            if (data.error) {

                console.log(data.error);

            } else {

                procesarRespuestaOfertas(data);
            }

        },
        error: function (error) {
            console.log(error);
        }
    });
}



// funciones seccion AdministrarOfertasReclutador

function EliminarVacante(idOferta) {


    // Muestra el modal de confirmación
    $("#confirmacionEliminarModal").modal("show");

    $("#confirmarEliminar").click(function (event) {
        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/EliminarVacante");

        $.ajax({
            type: "DELETE",
            url: url,
            data: {
                idOferta: idOferta
            },
            success: function (data) {

                if (data.error) {
                    alert('Hubo un problema al eliminar la vacante');
                console.error(data.error);

                }
                else {

                    ///recargar la lista 
                    $("#confirmacionEliminarModal").modal("hide");
                    CargarMisVacantes(1);

                }
            },
            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });

    });
}


function ActualizarOferta() {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/ActualizarOferta");

    $.ajax({
        type: "PUT",
        url: url,
        data: {
            titulo: $('#tituloOferta').val(),
            descripcion: $('#descripcionOferta').val(),
            cantidadVacantes: $('#cantidadVacantes').val(),
            idOferta: $('#idOferta').val(),
            horario: $('#horario').val()
        },
        success: function (data) {
            if (data.error) {
                alert('Hubo un problema al actualizar la oferta, por favor vuelva a intentar!!')

            }
            else {
                alert('Oferta actualizada con exito!!')
            }
            $("#verOfertaModal").modal("hide");

        },
        error: function (error) {
            console.log(error);
        }
    });
}


//funciones seccion VerCandidatosReclutador

function CargarSelectMisvacantes() {

    return new Promise(function (resolve, reject) {
        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CargarMisVacantes");

        $.ajax({
            type: "GET",
            url: url,
            data: { identification: $("#identification").val() },
            success: function (data) {

                if (data.error) {

                    console.log(data.error);
                    resolve();

                } else {

                    data.forEach(consulta => {
                        $("#nombreVacante").append($("<option>").val(consulta.idOferta).text(consulta.nombreOferta));
                    });
                    resolve();

                }

            },
            error: function (error) {
                console.log(error);
            }
        });
    });
}

function agregarCandidatoALaTabla(candidato, tipoCandidato) {
    if (tipoCandidato == 1) {
        var tbody = document.getElementById("listaCandidatosPostulados");
    }
    else {
        var tbody = document.getElementById("listaCandidatosSugerencias");

    }

    var row = tbody.insertRow(-1);
    row.id = candidato.idOferente;

    var cellNombre = row.insertCell(0);
    cellNombre.textContent = candidato.nombre;
    cellNombre.style.textAlign = "center";
    cellNombre.className = "text-sm";


    var cellExpediente = row.insertCell(1);
    // Crea un elemento de botón
    var btnVerExpediente = document.createElement("button");
    btnVerExpediente.className = (tipoCandidato == 1 ? "btnVerExpedientePostulados" : "btnVerExpedienteSugeridos") + " btn btn-link";
    btnVerExpediente.textContent = 'Ver';

    cellExpediente.appendChild(btnVerExpediente);
    cellExpediente.style.textAlign = "center"; // Estilo en línea para centrar verticalmente
    cellExpediente.className = "text-sm";


    var cellReferencias = row.insertCell(2);
    // Crea un elemento de botón
    var btnVerReferencias = document.createElement("button");
    btnVerReferencias.className = (tipoCandidato == 1 ? "btnVerReferenciasPostulados" : "btnVerReferenciasSugeridos") + " btn btn-link";
    btnVerReferencias.textContent = 'Ver';

    cellReferencias.appendChild(btnVerReferencias);
    cellReferencias.style.textAlign = "center"; // Estilo en línea para centrar verticalmente
    cellReferencias.className = "text-sm";


    var cellTitulos = row.insertCell(3);
    // Crea un elemento de botón
    var btnVerTitulos = document.createElement("button");
    btnVerTitulos.className = (tipoCandidato == 1 ? "btnVerTitulosPostulados" : "btnVerTitulosSugeridos") + " btn btn-link";
    btnVerTitulos.textContent = 'Ver';
    cellTitulos.appendChild(btnVerTitulos);
    cellTitulos.style.textAlign = "center"; // Estilo en línea para centrar verticalmente
    cellTitulos.className = "text-sm";

    var cellExperiencia = row.insertCell(4);
    // Crea un elemento de botón
    var btnVerExperiencia = document.createElement("button");
    btnVerExperiencia.className = (tipoCandidato == 1 ? "btnVerExperienciaPostulados" : "btnVerExperienciaSugeridos") + " btn btn-link";
    btnVerExperiencia.textContent = 'Ver';

    cellExperiencia.appendChild(btnVerExperiencia);
    cellExperiencia.style.textAlign = "center"; // Estilo en línea para centrar verticalmente
    cellExperiencia.className = "text-sm";


    var cellEntrevista = row.insertCell(5);
    // Crea un elemento de botón
    var btnAgendarEntrevista = document.createElement("button");
    btnAgendarEntrevista.className = (tipoCandidato == 1 ? "btnAgendarEntrevistaPostulados" : "btnAgendarEntrevistaSugeridos") + " btn btn-link";
    btnAgendarEntrevista.textContent = 'Agendar';

    cellEntrevista.appendChild(btnAgendarEntrevista);
    cellEntrevista.style.textAlign = "center"; // Estilo en línea para centrar verticalmente
    cellEntrevista.className = "text-sm";

}


//en tipoCandidato recibe 1 si es postulantes, 2 si es sugerido
function procesarRespuestaCandidatos(data, tipoCandidato) {


    if (tipoCandidato == 1) {
        var tbody = document.getElementById("listaCandidatosPostulados");
    }
    else {
        var tbody = document.getElementById("listaCandidatosSugerencias");

    }

    tbody.innerHTML = "";

    //verificar si se retorno algo en el data
    if (data.vacio) {

        //no hay titulos para mostrar
        var mensajeTr = document.createElement("tr");
        var mensajeTd = document.createElement("td");
        mensajeTd.colSpan = 6;
        mensajeTd.className = "text-center";
        mensajeTd.textContent = "No hay Candidatos disponibles";

        mensajeTr.appendChild(mensajeTd);
        tbody.appendChild(mensajeTr);
    }
    else {
        data.candidatos.forEach(function (candidatos) {
            agregarCandidatoALaTabla(candidatos, tipoCandidato);
        });
    }

}


function CargarListaCandidatosPostulados(idOferta) {

    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CargarListaCandidatosPostulados");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            idOferta
        },
        success: function (data) {

            if (data.error) {

                console.log(data.error);

            } else {

                procesarRespuestaCandidatos(data, 1);
            }

        },
        error: function (error) {
            console.log(error);
        }
    });
}

function CargarListaCandidatosSugeridos(idOferta) {

    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CargarListaCandidatosSugeridos");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            idOferta
        },
        success: function (data) {

            if (data.error) {

                console.log(data.error);

            } else {

                procesarRespuestaCandidatos(data, 2);
            }

        },
        error: function (error) {
            console.log(error);
        }
    });
}



function ObtenerDatosPersonales(idOferente) {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/ObtenerDatosPersonalesOferente");

    $.ajax({
        type: "Get",//tipo de solicitud
        url: url,
        data: {//se envia el parametro
            idOferente,
        },
        success: function (data) {//en caso de que sale bien

            if (data.error) { //si data.error contiene algo

                if ($("#mensaje").length) {

                    $("#mensaje").remove();

                    $("#direccion").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                }
                else {
                    $("#direccion").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                }



            }
            else {

                //recibo la fecha en un formato yyyy-mm-ddT00:00:00 entonces solo nos interesa la parte que esta antes de la T
                if (data.e.nacimiento != "" && data.e.nacimiento != null) {
                    var partesFecha = data.e.nacimiento.split('T');
                    var nacimiento = partesFecha[0].split('-');
                    $("#nacimiento").val((nacimiento != null) ? nacimiento[2] + "/" + nacimiento[1] + "/" + nacimiento[0] : "");

                }



                var provincia = data.nombreProvincia;
                var canton = data.nombreCanton;
                var distrito = data.nombreDistrito;
                var direccion = data.e.direccion;
                var genero = data.e.genero;
                var correoOpcional = data.e.correoOpcional;
                var telefonoOpcional = data.e.telefonoOpcional;





                //asignar los valores a los inputs

                $("#direccion").val((direccion != null) ? direccion : "");
                if (genero == 1) {
                    $("#genero").val('Masculino');
                }
                else if (genero == 2) {
                    $("#genero").val('Femenino');

                }
                else {
                    $("#genero").val('Sin definir');

                }

                $("#correoOpcional").val((correoOpcional != null) ? correoOpcional : "");
                $("#telefonoOpcional").val((telefonoOpcional != null) ? telefonoOpcional : "");
                $("#provincias").val(provincia);
                $("#cantones").val(canton);
                $("#distritos").val(distrito);
                $("#telefono").val(data.o.telefono);
                $("#correo").val(data.o.correo);
                $("#nombre").val(data.o.nombre);
                $("#apellidos").val(data.o.apellido1 + " " + data.o.apellido2);

            }
        },
        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}

function CargarIdiomasOferente(idOferente) {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/MostrarIdiomasOferente");

    $.ajax({
        type: "Get",
        url: url,
        data: {
            idOferente
        },
        success: function (data) {
            //recargar titulos

            procesarRespuestaIdiomas(data);
        },
        error: function (error) {
            console.log("Error al cargar idiomas: " + error);
        }
    });
}


function agregarIdiomaALaLista(idioma) {
    var listaIdiomas = document.getElementById("listaIdiomas");

    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.setAttribute("data-id", idioma.idIdioma);

    var span = document.createElement("span");
    span.textContent = idioma.nombreIdioma;

    li.appendChild(span);

    listaIdiomas.appendChild(li);
}

function procesarRespuestaIdiomas(data) {


    var listaIdiomas = document.getElementById("listaIdiomas");
    listaIdiomas.innerHTML = "";

    data.forEach(function (idioma) {
        agregarIdiomaALaLista(idioma);
    });


    $('#agregarIdiomaModal').modal('hide');

    if ($("#mensaje").length) {

        $("#mensaje").remove();
    }

}


function MostrarGruposProfesionalesOferente(idOferente) {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CargarGrupoProfesionalOferente");

    $.ajax({
        type: "Get",
        url: url,
        data: {
            idOferente
        },
        success: function (data) {
            //recargar titulos
            if (data.vacio) {
                return;
            }
            else {
                procesarRespuestaGruposProfesionales(data);
            }

        },
        error: function (error) {
            console.log("Error al cargar los grupos: " + error);
        }
    });
}


function agregarGrupoProfALaLista(grupo) {

    var listaGrupos = document.getElementById("listaGrupoProfesional");

    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.setAttribute("data-id", grupo.idGrupoProfesional);

    var span = document.createElement("span");
    span.textContent = grupo.grupoProfesional;

    li.appendChild(span);
    listaGrupos.appendChild(li);
}

function procesarRespuestaGruposProfesionales(data) {


    var listaIdiomas = document.getElementById("listaGrupoProfesional");
    listaIdiomas.innerHTML = "";

    data.forEach(function (grupo) {
        agregarGrupoProfALaLista(grupo);
    });


    $('#agregarGrupoProfesionalModal').modal('hide');

    if ($("#mensaje").length) {

        $("#mensaje").remove();
    }

}


function cargarImagenPerfil(idOferente) {

    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/ObtenerUrlImagen");

    $.ajax({
        url: url,  // Reemplaza con la URL correcta de tu controlador
        type: 'GET',
        data: { idOferente },
        success: function (data) {
            if (data.vacio) {
                //si el oferente no tiene foto se esconde para que no quite campo en el expediente a mostrar
                $("#fotoPerfil").hide();
            }
            else if (data.urlImagen) {
                //si se obtiene la url se carga la imagen
                var imagen = document.getElementById('fotoPerfil');
                imagen.src = data.urlImagen;
            }

        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });


}

function CargarReferencias(idOferente, tipo) {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CargarReferencias");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            idOferente,
            tipoReferencia: tipo
        },
        success: function (data) {

            //recargar refrencias
            procesarRespuestaReferencia(data, tipo);
        },
        error: function (error) {
            console.log("Error al cargar referencias: " + error);
        }
    });
}


function agregarReferenciaALaTabla(referencia, num) {
    var tbody = num == 1 ? document.getElementById("listaReferenciasPersonales") : document.getElementById("listaReferenciasProfesionales");

    var row = tbody.insertRow(-1);
    row.id = referencia.iD_DETALLE_REFERENCIA;

    var cellReferente = row.insertCell(0);
    cellReferente.textContent = num == 1 ? referencia.nombrE_APELLIDOS : referencia.nombrE_EMPRESA;
    cellReferente.style.textAlign = "center";

    var cellContacto = row.insertCell(1);
    cellContacto.textContent = referencia.contacto.replace(/(\d{4})(\d{4})/, '$1-$2');
    cellContacto.style.textAlign = "center";

    var cellEstado = row.insertCell(2);
    if (referencia.estado == false) {
        cellEstado.textContent = "N/V";
        cellEstado.classList.add('estado-pendiente');
    } else {
        cellEstado.textContent = "V";
        cellEstado.classList.add('estado-verificado');
    }
    cellEstado.style.textAlign = "center"; // Estilo en línea para centrar verticalmente

    var cellAcciones = row.insertCell(3);
    cellAcciones.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente


    var btnVer = document.createElement("button");
    btnVer.className = "btnVerReferencia btn btn-info btn-sm w-100";
    btnVer.innerHTML = 'Ver <i class="fas fa-eye"></i>';

    // Agregar el contenedor div a la celda de acciones
    cellAcciones.appendChild(btnVer);




}


//el num va ser para indicar cual referencia quiere cargar, 1 personales, 2 profesionales
function procesarRespuestaReferencia(data, num) {
    var tbody = num == 1 ? document.getElementById("listaReferenciasPersonales") : document.getElementById("listaReferenciasProfesionales");
    tbody.innerHTML = "";

    // Verificar si se retorno refrencias en el data
    if (data.vacio) {
        // No hay experiencias, mostrar el mensaje
        // Crear el elemento tr con su contenido
        var mensajeTr = document.createElement("tr");

        var mensajeTd = document.createElement("td");
        mensajeTd.colSpan = 4;
        mensajeTd.className = "text-center";
        mensajeTd.textContent = num == 1 ? "No hay referencias personales." : "No hay referencias profesionales.";

        // Agregar la celda al elemento tr
        mensajeTr.appendChild(mensajeTd);

        tbody.appendChild(mensajeTr);


    } else {
        data.forEach(function (referencias) {
            agregarReferenciaALaTabla(referencias, num);
        });

    }

}


function MostrarEvaluacion(idOferente, idReferencia) {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/ObtenerUrlEvaluacion");

    $.ajax({
        url: url,  // Reemplaza con la URL correcta de tu controlador
        type: 'GET',
        data: {
            idOferente,
            idReferencia: idReferencia
        },
        success: function (data) {

            if (data.urlImagen) {
                $("#imagenAmpliada").attr("src", data.urlImagen);

                //abrir modal
                $('#imagenModal').modal('show');

            }
            else if (data.error) {
                console.log(data.error);
            }
        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}


function CargarTitulos(idOferente, tipoTitulo) {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CargarTitulos");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            idOferente,
            tipo: tipoTitulo
        },
        success: function (data) {
            procesarRespuestaTitulos(data, tipoTitulo);
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function agregarTituloALaTabla(titulo, num) {
    if (num == 1) {
        var tbody = document.getElementById("listaTitulosSecundaria");

        var row = tbody.insertRow(-1);
        row.id = titulo.idDetalleTitulo;

        var cellInstituto = row.insertCell(0);
        cellInstituto.textContent = titulo.institucion;
        cellInstituto.style.textAlign = "center";

        let fechaInicio = titulo.fechaInicio.split('T');
        let partesFechaInicio = fechaInicio[0].split('-');



        var cellInicio = row.insertCell(1);
        cellInicio.textContent = ObtenerMes(partesFechaInicio[1]) + "/" + partesFechaInicio[0];
        cellInicio.style.textAlign = "center";

        let fechaFin = titulo.fechaFin.split('T');
        let partesFechaFin = fechaFin[0].split('-');


        var cellFin = row.insertCell(2);
        cellFin.textContent = ObtenerMes(partesFechaFin[1]) + "/" + partesFechaFin[0];
        cellFin.style.textAlign = "center";

        var cellEstado = row.insertCell(3);
        if (titulo.estado == 'P') {
            cellEstado.textContent = titulo.estado;
            cellEstado.classList.add('estado-verificado');
        } else if (titulo.estado == 'I') {
            cellEstado.textContent = titulo.estado;
            cellEstado.classList.add('estado-pendiente');
        } else if (titulo.estado == 'R') {
            cellEstado.textContent = titulo.estado;

            cellEstado.classList.add('estado-revisado');
        } else if (titulo.estado == 'C') {
            cellEstado.textContent = titulo.estado;
            cellEstado.classList.add('estado-verificado');
        }
        cellEstado.style.textAlign = "center"; // Estilo en línea para centrar verticalmente

        var cellAcciones = row.insertCell(4);
        cellAcciones.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente

        var btnVer = document.createElement("button");
        btnVer.className = "btnVerTitulo btn btn-info btn-sm w-100";
        btnVer.innerHTML = 'Ver <i class="fas fa-eye"></i>';

        var btnEditar = document.createElement("button");
        btnEditar.className = "btnEditarTitulo btn btn-primary btn-sm w-100 mt-1";
        btnEditar.innerHTML = 'Editar <i class="fas fa-pencil-alt"></i>';

        var btnEliminar = document.createElement("button");
        btnEliminar.className = "btnEliminarTitulo btn btn-danger btn-sm mt-1 w-100";
        btnEliminar.innerHTML = 'Eliminar <i class="fas fa-trash-alt"></i>';


        // Agregar el contenedor div a la celda de acciones
        cellAcciones.appendChild(btnVer);
        cellAcciones.appendChild(btnEditar);
        cellAcciones.appendChild(btnEliminar);


    } else if (num == 2) {
        var tbody = document.getElementById("listaTitulosUniversitarios");


    } else {
        var tbody = document.getElementById("listaTitulosVarios");
    }

    if (num != 1) {
        var row = tbody.insertRow(-1);
        row.id = titulo.idDetalleTitulo;

        if (num == 2) {
            var cellTipo = row.insertCell(0);
            cellTipo.textContent = titulo.tipoTitulo;
            cellTipo.style.textAlign = "center";
        }

        if (num == 2) {
            var cellEspecialidad = row.insertCell(1);
        }
        else {
            var cellEspecialidad = row.insertCell(0);

        }
        cellEspecialidad.textContent = titulo.especialidad;
        cellEspecialidad.style.textAlign = "center";


        if (num == 2) {
            var cellInstituto = row.insertCell(2);
        }
        else {
            var cellInstituto = row.insertCell(1);

        }
        cellInstituto.textContent = titulo.institucion;
        cellInstituto.style.textAlign = "center";

        let fechaInicio = titulo.fechaInicio.split('T');
        let partesFechaInicio = fechaInicio[0].split('-');


        if (num == 2) {
            var cellInicio = row.insertCell(3);
        }
        else {
            var cellInicio = row.insertCell(2);

        }

        cellInicio.textContent = ObtenerMes(partesFechaInicio[1]) + "/" + partesFechaInicio[0];
        cellInicio.style.textAlign = "center";

        let fechaFin = titulo.fechaFin.split('T');
        let partesFechaFin = fechaFin[0].split('-');

        if (num == 2) {
            var cellFin = row.insertCell(4);
        }
        else {
            var cellFin = row.insertCell(3);
        }

        cellFin.textContent = ObtenerMes(partesFechaFin[1]) + "/" + partesFechaFin[0];
        cellFin.style.textAlign = "center";

        if (num == 2) {
            var cellEstado = row.insertCell(5);
        }
        else {
            var cellEstado = row.insertCell(4);
        }

        if (titulo.estado == 'P') {
            cellEstado.textContent = titulo.estado;
            cellEstado.classList.add('estado-verificado');
        } else if (titulo.estado == 'I') {
            cellEstado.textContent = titulo.estado;
            cellEstado.classList.add('estado-pendiente');
        } else if (titulo.estado == 'R') {
            cellEstado.textContent = titulo.estado;

            cellEstado.classList.add('estado-revisado');
        } else if (titulo.estado == 'C') {
            cellEstado.textContent = titulo.estado;
            cellEstado.classList.add('estado-verificado');
        }
        cellEstado.style.textAlign = "center"; // Estilo en línea para centrar verticalmente

        if (num == 2) {
            var cellAcciones = row.insertCell(6);
        }
        else {
            var cellAcciones = row.insertCell(5);
        }

        cellAcciones.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente

        var btnVer = document.createElement("button");
        btnVer.className = "btnVerTitulo btn btn-info btn-sm";
        btnVer.innerHTML = 'Ver <i class="fas fa-eye"></i>';

        // Agregar el contenedor div a la celda de acciones
        cellAcciones.appendChild(btnVer);

    }



}


//el num va indicar cual tipo de titulo se va cargar, 1 secundaria, 2 universitario, 3 otros
function procesarRespuestaTitulos(data, num) {
    if (num == 1) {

        var tbody = document.getElementById("listaTitulosSecundaria");
    } else if (num == 2) {

        var tbody = document.getElementById("listaTitulosUniversitarios");
    } else {


        var tbody = document.getElementById("listaTitulosVarios");
    }

    tbody.innerHTML = "";

    //verificar si se retorno algo en el data
    if (data.vacio) {


        //no hay titulos para mostrar
        var mensajeTr = document.createElement("tr");
        var mensajeTd = document.createElement("td");
        if (num != 1) {
            mensajeTd.colSpan = 7;
        } else {
            mensajeTd.colSpan = 6;
        }


        mensajeTd.className = "text-center";
        mensajeTd.textContent = "No hay titulos";

        mensajeTr.appendChild(mensajeTd);
        tbody.appendChild(mensajeTr);
    }
    else {


        data.forEach(function (titulo) {
            agregarTituloALaTabla(titulo, num);
        });

    }

}

function MostrarTitulo(idOferente, idTitulo) {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/ObtenerUrlTitulo");

    $.ajax({
        url: url,  // Reemplaza con la URL correcta de tu controlador
        type: 'GET',
        data: {
            idOferente,
            idTitulo: idTitulo
        },
        success: function (data) {

            if (data.urlImagen) {
                // Configuración de OpenSeaDragon


                $("#imagenAmpliada").attr("src", data.urlImagen);

                CargarDatostituloImagen(idTitulo)
                    .then(function () {
                        $('#imagenModal').modal('show');
                    })
                    .catch(function (error) {
                        console.log(error);
                        $('#imagenModal').modal('show');

                    });
             

            }
            else if (data.error) {
                console.log(data.error);
            }
        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}


function CargarExperiencias(idOferente) {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CargarExperiencias");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            idOferente
        },
        success: function (data) {

            if (data.error) {

                console.log(data.error);

            } else {

                //cargar experiencias
                procesarRespuestaExperiencia(data);
            }

        },
        error: function (error) {
            console.log("Error al cargar títulos: " + error);
        }
    });
}


function agregarExperienciaALaTabla(experiencia) {
    var tbody = document.getElementById("listaExperiencias");

    var row = tbody.insertRow(-1);
    row.id = experiencia.iD_DETALLE_EXPERIENCIA;

    var cellEmpresa = row.insertCell(0);
    cellEmpresa.textContent = experiencia.nombrE_EMPRESA;
    cellEmpresa.style.textAlign = "center";

    var cellTelefono = row.insertCell(1);
    cellTelefono.textContent = experiencia.telefono.replace(/(\d{4})(\d{4})/, '$1-$2');
    cellTelefono.style.textAlign = "center";

    var cellPuesto = row.insertCell(2);
    cellPuesto.textContent = experiencia.descripcioN_LABORES;
    cellPuesto.style.textAlign = "center";

    var cellYears = row.insertCell(3);
    cellYears.textContent = experiencia.inicio + " / " + experiencia.fin;
    cellYears.style.textAlign = "center"; // Estilo en línea para centrar verticalmente

    var cellAcciones = row.insertCell(4);
    cellAcciones.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente


    var btnVer = document.createElement("button");
    btnVer.className = "btnVerExperiencia btn btn-info btn-sm w-100";
    btnVer.innerHTML = 'Ver <i class="fas fa-eye"></i>';


    // Agregar el contenedor div a la celda de acciones
    cellAcciones.appendChild(btnVer);
}


function MostrarExperiencia(idOferente, idExperiencia) {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/ObtenerUrlExperiencia");

    $.ajax({
        url: url,  // Reemplaza con la URL correcta de tu controlador
        type: 'GET',
        data: {
            idOferente,
            idExperiencia: idExperiencia
        },
        success: function (data) {

            if (data.urlImagen) {

                $("#imagenAmpliada").attr("src", data.urlImagen);

                //abrir modal
                $('#imagenModal').modal('show');

            }
            else if (data.error) {
                console.log(data.error);
            }
        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}


function procesarRespuestaExperiencia(data) {
    var tbody = document.getElementById("listaExperiencias");
    tbody.innerHTML = "";

    // Verificar si se retorno experiencias en el data
    if (data.vacio) {
        // No hay experiencias, mostrar el mensaje
        // Crear el elemento tr con su contenido
        var mensajeTr = document.createElement("tr");

        var mensajeTd = document.createElement("td");
        mensajeTd.colSpan = 4;
        mensajeTd.className = "text-center";
        mensajeTd.textContent = "No hay experiencias disponibles.";

        // Agregar la celda al elemento tr
        mensajeTr.appendChild(mensajeTd);

        // Agregar el elemento tr al tbody
        tbody.appendChild(mensajeTr);


    } else {
        // Hay experiencias


        data.forEach(function (experiencia) {
            agregarExperienciaALaTabla(experiencia);
        });

    }

}


function ObtenerMes(numeroMes) {
    switch (numeroMes) {
        case '01':
            return 'Enero';
        case '02':
            return 'Febrero';
        case '03':
            return 'Marzo';
        case '04':
            return 'Abril';
        case '05':
            return 'Mayo';
        case '06':
            return 'Junio';
        case '07':
            return 'Julio';
        case '08':
            return 'Agosto';
        case '09':
            return 'Septiembre';
        case '10':
            return 'Octubre';
        case '11':
            return 'Noviembre';
        case '12':
            return 'Diciembre';
        default:
            return 'Mes no válido';
    }
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



function CargarDatostituloImagen(idTitulo) {
    return new Promise(function (resolve, reject) {

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CargarTituloEspecifico");

        $.ajax({
            url: url,  // Reemplaza con la URL correcta de tu controlador
            type: 'GET',
            data: {
                idTitulo
            },
            success: function (data) {
                if (data.error) {
                    reject(data.error);
                } else {

                    $('#tomo').val(data.tomo);
                    $('#folio').val(data.folio);
                    $('#asiento').val(data.asiento);
                    $('#datosImagenTitulo').show();
                    resolve();
                }

            },
            error: function (error) {
                // Manejar errores si es necesario
                reject(error);
            }
        });
    });
}