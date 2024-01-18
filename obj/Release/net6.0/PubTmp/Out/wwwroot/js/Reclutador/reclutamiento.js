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




    if ($("#nombreVista").val() == "VerVacantesReclutador") {

        CargarOfertas();
        CargarProvincia();
        CargarMaterias();

        $("#enlaceVervacantes").addClass("active");



        $('#btnVerMisVacantes').click(function (e) {
            CargarMisVacantes();
            $("#provincias").val('null');
            $("#materias").val('null');
            $("#cantones").find("option:not(:first)").remove();

        });



        $('#btnVerTodo').click(function (e) {
            $("#provincias").val('null');
            $("#materias").val('null');
            $("#cantones").find("option:not(:first)").remove();
            CargarOfertas();

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
            CargarOfertas();

        });

        $("#cantones").change(function () {
            CargarOfertas();
        });

        $("#materias").change(function () {
            CargarOfertas();
        });

        $("#listaOfertas").on("click", ".btnVerOferta", function () {
            //obtener fila donde se dio click
            var fila = $(this).closest("tr");

            let idOferta = fila.attr("id");

            MostrarDetallesOferta(idOferta);

            //mostrar modal 
            $("#verOfertaModal").modal("show");

        });

    }



    if ($("#nombreVista").val() == "AdministrarOfertasReclutador") {
        CargarMisVacantes();
        $("#enlaceAdministrarVacante").addClass("active");

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
        CargarSelectMisvacantes();
        $("#enlaceCandidatos").addClass("active");


        $("#nombreVacante").change(function () {
            if ($(this).val() != 'null') {

                CargarListaCandidatosSugeridos($(this).val());
                CargarListaCandidatosPostulados($(this).val());
               
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

function CargarOfertas() {
    let url = ObtenerUrlSolicitud('Reclutador', "Oferente/CargarOfertas");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            provincia: ($("#provincias").val() != null ? $("#provincias").val() : 0),
            canton: ($("#cantones").val() != null ? $("#cantones").val() : 0),
            idMateria: ($("#materias").val() != null ? $("#materias").val() : 0)

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


function CargarMisVacantes() {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CargarMisVacantes");

    $.ajax({
        type: "GET",
        url: url,
        data: { identification: $("#identification").val() },
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
                }
                else {

                    ///recargar la lista 
                    $("#confirmacionEliminarModal").modal("hide");
                    CargarMisVacantes();

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
            idOferta: $('#idOferta').val()
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
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CargarMisVacantes");

    $.ajax({
        type: "GET",
        url: url,
        data: { identification: $("#identification").val() },
        success: function (data) {

            if (data.error) {

                console.log(data.error);

            } else {

                data.forEach(consulta => {
                    $("#nombreVacante").append($("<option>").val(consulta.idOferta).text(consulta.nombreOferta));
                });
            }

        },
        error: function (error) {
            console.log(error);
        }
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
    btnVerExpediente.className = "btnVerExpediente btn btn-link";
    btnVerExpediente.textContent = 'Ver';

    cellExpediente.appendChild(btnVerExpediente);
    cellExpediente.style.textAlign = "center"; // Estilo en línea para centrar verticalmente
    cellExpediente.className = "text-sm";


    var cellReferencias = row.insertCell(2);
    // Crea un elemento de botón
    var btnVerReferencias = document.createElement("button");
    btnVerReferencias.className = "btnVerReferencias btn btn-link";
    btnVerReferencias.textContent = 'Ver';

    cellReferencias.appendChild(btnVerReferencias);
    cellReferencias.style.textAlign = "center"; // Estilo en línea para centrar verticalmente
    cellReferencias.className = "text-sm";


    var cellTitulos = row.insertCell(3);
    // Crea un elemento de botón
    var btnVerTitulos = document.createElement("button");
    btnVerTitulos.className = "btnVerTitulos btn btn-link";
    btnVerTitulos.textContent = 'Ver';

    cellTitulos.appendChild(btnVerTitulos);
    cellTitulos.style.textAlign = "center"; // Estilo en línea para centrar verticalmente
    cellTitulos.className = "text-sm";


    var cellEntrevista = row.insertCell(4);
    // Crea un elemento de botón
    var btnAgendarEntrevista = document.createElement("button");
    btnAgendarEntrevista.className = "btnAgendarEntrevista btn btn-link";
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
        mensajeTd.colSpan = 5;
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