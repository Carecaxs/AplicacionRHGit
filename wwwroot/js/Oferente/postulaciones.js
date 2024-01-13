$(document).ready(function () {
    cargarImagenPerfil();
    $("#fotoPerfil").on("click", function () {
        // Obtener la URL de la imagen original
        var urlImagenOriginal = $(this).attr("src");

        // Asignar la URL de la imagen original al modal
        $("#imagenAmpliada").attr("src", urlImagenOriginal);
    });




    ///////////// seccion de enlaces


    $("#enlaceBuscar").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/BuscarOfertasOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });

    $("#enlaceCrear").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/CrearOfertaOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#enlaceVerMisOfertas").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/VerOfertasOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#enlaceVerVacantesAplicadas").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/VerVacantesAplicadasOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });




    /////////////////////////////////////////// seccion de ver ofertas laborales ///////////////////////////////////////////////////

    if ($("#vistaActual").val() == "BuscarOfertasOferente") {
        //poner activo al enlace de activo a esta vista
        $("#enlaceBuscar").addClass("active");
        CargarProvincia();
        CargarMaterias();
        //cargar ofertas 
        CargarOfertas();

    }


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
            $("#distritos").find("option:not(:first)").remove();



        }

        if ($("#vistaActual").val() == "BuscarOfertasOferente") {
            CargarOfertas();
        }

    });

    $("#cantones").change(function () {

        if ($("#vistaActual").val() == "BuscarOfertasOferente") {
            CargarOfertas();
        }

    });

    $("#materias").change(function () {
        if ($("#vistaActual").val() == "BuscarOfertasOferente") {
            CargarOfertas();
        }


    });


    $("#listaOfertas").on("click", ".btnVerOferta", function () {
        //obtener fila donde se dio click
        var fila = $(this).closest("tr");

        let idOferta = fila.attr("id");

        MostrarDetallesOferta(idOferta);

        //mostrar modal 
        $("#verOfertaModal").modal("show");



    });


    //evento postularse  a una vacante
    $("#btnPostularse").click(function (event) {

        AgregarPostulacion();

    });



    /////////////////////////////////////////// seccion de crear ofertas laborales ///////////////////////////////////////////////////

    if ($("#vistaActual").val() == "CrearOfertaOferente") {
        //poner activo al enlace de activo a esta vista
        $("#enlaceCrear").addClass("active");
        CargarProvincia();
        CargarMaterias();
        CargarGruposProfesionales();
        CargarProvinciasCheckBox();
    }

    //al deseleccionar un check de provincia se quitan los cantones realcionados a esa provincia

    $("[name='provincias']").on("change", function () {
        console.log("entra");
        if (!this.checked) {
            EliminarCantonesDiv(this.value);
        }
        else {
            // Asigna un evento de clic para cargar los cantones al hacer clic en una provincia
            CargarCantonesCheckBox(this.value);
        }
    });


    $("#btnAgregarUbicacion").click(function (event) {
        event.preventDefault();

        let canton = $("#cantones").val();


        if (canton !== "null") {
            agregarUbicacionALaLista();
            $("#cantones").val("null");
            $("#provincias").val("null");

        }


    });


    $("#btnAgregarGrupoProfesional").click(function (event) {
        event.preventDefault();

        //enviamos el value y el texto de la materia elegida dentro del select
        agregarGrupoALaLista($("#grupoProfesional").val(), $("#grupoProfesional option:selected").text());


        // Cerrar el modal
        $("#agregarGrupoProfesionalModal").modal("hide");


    });

    $("#listaGrupoProfesional").on("click", ".btnEliminarGrupo", function (event) {

        event.preventDefault();
        // Obtén el data-id del li padre
        var id = $(this).closest("li").data("id");

        // Muestra el modal de confirmación
        $("#confirmacionEliminarModalGrupo").modal("show");

        $("#confirmarEliminarGrupo").click(function (event) {

            // Eliminar el li con el data-id específico
            $("#listaGrupoProfesional li[data-id='" + id + "']").remove();

            $("#confirmacionEliminarModalGrupo").modal("hide");

        });



    });


    $("#listaUbicaciones").on("click", ".btnEliminarUbicacion", function (event) {

        event.preventDefault();
        // Obtén el data-id del li padre
        var idCanton = $(this).closest("li").data("id");

        // Muestra el modal de confirmación
        $("#confirmacionEliminarModalUbicacion").modal("show");

        $("#confirmarEliminarUbicacion").click(function (event) {

            // Eliminar el li con el data-id específico
            $("#listaUbicaciones li[data-id='" + idCanton + "']").remove();

            $("#confirmacionEliminarModalUbicacion").modal("hide");

        });



    });

    $("#btnCerrarModalubicaciones").click(function (event) {
        $("#modalSeleccionUbicaciones").modal("hide");
    });

    $("#btnCloseModalUbicaciones").click(function (event) {

        LimpiarCheckBoxUbicaciones();
    });

    $("#btnAgregarOferta").click(function (event) {

        event.preventDefault();
        let validacion = ValidarFormularioAgregarOferta();
        if (validacion == -1) {
            //no se seleccionaron ubicaciones
            alert("Debes de seleccionar una Ubicación como minímo");

        }
        else if (validacion == -3) {
            //no se seleccionaron grupos profesionales
            alert("Debes de seleccionar un Grupo Profesional como minímo");

        }
        else if (validacion == -4) {
            //no se seleccionaron grupos profesionales
            alert("Debes de ingresar información en el campo descripción");
        }
        else {
            //todo esta bien 

            CrearOferta();
            limpiarFormularioAgregarOferta();
        }





    });






    /////////////////////////////////////////// seccion de ver mis ofertas laborales ///////////////////////////////////////////////////

    if ($("#vistaActual").val() == "VerOfertasOferente") {

        //poner activo al enlace de activo a esta vista
        $("#enlaceVerMisOfertas").addClass("active");
        CargarOfertasCreadasOferente();

    }


    $("#listaOfertasOferente").on("click", ".btnDesactivarOferta", function (event) {

        event.preventDefault();
        // Obtén el data-id del li padre
        var idOferta = $(this).closest("li").data("id");
        DesactivarOfertaCreadaOferente(idOferta);


    });

    $("#listaOfertasOferenteDesactivadas").on("click", ".btnActivarOferta", function (event) {

        event.preventDefault();
        // Obtén el data-id del li padre
        var idOferta = $(this).closest("li").data("id");
        ActivarOfertaCreadaOferente(idOferta);


    });

    $("#listaOfertasOferente").on("click", ".btnVerCoincidencias", function (event) {
        event.preventDefault();
        // Obtén el data-id del li padre
        var idOferta = $(this).closest("li").data("id");
        CargarColegiosCoincidentesOfertaOferente(idOferta);


    });





    /////////////////////////////////////////// seccion de ver ofertas aplicadas ///////////////////////////////////////////////////

    if ($("#vistaActual").val() == "VerVacantesAplicadasOferente") {
        //poner activo al enlace de activo a esta vista
        $("#enlaceVerVacantesAplicadas").addClass("active");

        //cargar ofertas 
        CargarOfertasAplicadas();

    }


    $("#listaOfertasAplicadas").on("click", ".btnVerOferta", function () {
        //obtener fila donde se dio click
        var fila = $(this).closest("tr");

        let idOferta = fila.attr("id");

        MostrarDetallesOferta(idOferta);

        //mostrar modal 
        $("#verOfertaModal").modal("show");



    });

    // si toca boton de cancelar postulacion se abre modal de confirmar cancelacion
    $("#btnCancelarPostulacion").click(function (event) {

        $("#confirmacionCancelacionModal").modal("show");
    });

    $("#confirmarCancelacion").click(function (event) {
        CancelarPostulacion();


    });




});







////////////////////////////////////////////////    funciones          ///////////////////////////////

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


    var btnVerOferta = document.createElement("button");
    btnVerOferta.className = "btnVerOferta btn btn-primary btn-sm  w-100";
    btnVerOferta.innerHTML = 'Ver Detalles <i class="fas fa-eye"></i>';


    // Agregar el contenedor div a la celda de acciones
    cellAcciones.appendChild(btnVerOferta);


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
    let url = ObtenerUrlSolicitud('Login', "Oferente/CargarOfertas");

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
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/ObtenerDatosOferta");

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
                console.log(data);




                let fecha = data.publicacionOferta.split('T');


                $("#idOferta").val(data.idOferta);
                $("#tituloOferta").val(data.nombreOferta);
                $("#nombreInstitucion").val(data.nombreInstitucion);
                $("#nombreMateria").val(data.nombreMateria);
                $("#descripcionOferta").val(data.descripcionOferta);
                $("#publicacionOferta").val(fecha[0]);




            }

        },
        error: function (error) {
            console.log(error);
        }
    });
}


function CargarMaterias() {
    // Hacer la solicitud AJAX para cargar las materias
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/CargarMaterias");

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
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/CargarGruposProfesionales");

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



function AgregarPostulacion() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/AgregarPostulacion");

    $.ajax({
        type: "POST",
        url: url,
        data: {
            idOferta: $("#idOferta").val(),
            identificacion: $("#identification").val()

        },
        success: function (data) {

            if (data.error) {

                console.log(data.error);

            } else if (data.existe) {

                $("#verOfertaModal").modal("hide");
                alert("Ya estás postulado para este puesto");

            }
            else if (data.exito == true) {

                $("#verOfertaModal").modal("hide");
                alert("Te has postulado exitosamente");


            } else {
                $("#verOfertaModal").modal("hide");
                alert("Hubo un problema al postularte");
            }


        },
        error: function (error) {
            console.log(error);
        }
    });
}

function agregarGrupoALaLista(id, nombre) {
    var listaGrupos = document.getElementById("listaGrupoProfesional");

    // Verificar si el id ya existe en la lista
    var existeId = Array.from(listaGrupos.children).some(function (li) {
        return li.getAttribute("data-id") === id.toString();
    });

    if (!existeId) {
        var li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.setAttribute("data-id", id);

        var span = document.createElement("span");
        span.textContent = nombre;

        var div = document.createElement("div");

        var btnEliminar = document.createElement("button");
        btnEliminar.className = "btnEliminarGrupo btn btn-danger btn-sm";
        btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';

        div.appendChild(btnEliminar);

        li.appendChild(span);
        li.appendChild(div);

        listaGrupos.appendChild(li);
    } else {
        // Muestra un mensaje o realiza alguna acción indicando que el id ya existe
        alert("El grupo " + nombre + " ya lo escogiste.");
    }
}





function agregarUbicacionALaLista() {
    var listaUbicaciones = document.getElementById("listaUbicaciones");

    // Verificar si el id del Canton ya existe en la lista
    var existeId = Array.from(listaUbicaciones.children).some(function (li) {
        return li.getAttribute("data-id") === $("#cantones").val().toString();
    });

    if (!existeId) {
        var li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.setAttribute("data-id", $("#cantones").val());

        var span = document.createElement("span");
        span.textContent = $("#cantones option:selected").text() + "-" + $("#provincias option:selected").text();

        var div = document.createElement("div");

        var btnEliminar = document.createElement("button");
        btnEliminar.className = "btnEliminarUbicacion btn btn-danger btn-sm";
        btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';

        div.appendChild(btnEliminar);

        li.appendChild(span);
        li.appendChild(div);

        listaUbicaciones.appendChild(li);
    } else {
        // Muestra un mensaje o realiza alguna acción indicando que el id ya existe
        alert("Ya escogiste esta ubicación");
    }
}


function CrearOferta() {

    var listaUbicaciones = $(".cantonesCheckBox input[name='cantones']:checked").map(function () {
        if ($(this).val() !== 'selectAll') {
            return $(this).val();
        }
    }).get();


    var listaGrupos = $("#listaGrupoProfesional li").map(function () {
        return $(this).data("id");
    }).get();



    // Obtener el formulario y los datos del formulario
    var form = $("#formAgregarOferta")[0];
    var formData = new FormData(form);

    // Agregar lista de ubicaciones al formData
    formData.append("listaUbicaciones", JSON.stringify(listaUbicaciones));

    // Agregar lista de grupos profesionales al formData
    formData.append("listaGrupos", JSON.stringify(listaGrupos));


    let url = ObtenerUrlSolicitud('Oferente', "Oferente/CrearOferta");

    $.ajax({
        method: "POST",//tipo de solicitud
        url: url,
        data: formData,
        processData: false,  // Necesario para enviar FormData correctamente
        contentType: false,  // Necesario para enviar FormData correctamente
        success: function (data) {//en caso de que sale bien


            if (data.error) { //si data.error contiene algo
                //error de conexion o algo mas
                alert(data.error);


            }
            else if (data.exito == true) {

                if ($("#mensaje").length) {

                    $("#mensaje").remove();

                    $("#btnAgregarOferta").before("<p class='alert alert-success mt-2' id='mensaje'> Oferta creada con éxito</p>");
                }
                else {
                    $("#btnAgregarOferta").before("<p class='alert alert-success mt-2' id='mensaje'>Oferta creada con éxito</p>");

                }
            }
            else {
                //en caso de que algo mas haya salido mal 
                if ($("#mensaje").length) {

                    $("#mensaje").remove();

                    $("#btnAgregarOferta").before("<p class='alert alert-danger mt-2' id='mensaje'> Hubo un problema al crear la oferta</p>");
                }
                else {
                    $("#btnAgregarOferta").before("<p class='alert alert-danger mt-2' id='mensaje'> Hubo un problema al crear la oferta</p>");

                }
            }

        },

        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });






}

//retorna 1 si se completan los campos necesarios
//retorna -1 si no se agrega ni una sola ubicacion
//retorna -2 si no se agrega ni una sola materia
//retorna -3 si no se agrega ni un solo grupo profesional
//retorna -4 si no se se ingresa nada en el campo descripcion


function ValidarFormularioAgregarOferta() {
    // Validar campos principales

    var descripcion = $("#descripcion").val();

    if (descripcion == "") {
        return -4;
    }

    // Validar la lista de grupos profesionales
    var listaCantones = $(".cantonesCheckBox input[name='cantones']:checked").map(function () {
        if ($(this).val() !== 'selectAll') {
            return $(this).val();
        }
    }).get();

    if (listaCantones.length < 1) {
        return -1;

    }

    // Validar la lista de grupos profesionales
    var listaGrupos = document.getElementById("listaGrupoProfesional");

    if (listaGrupos.getElementsByTagName("li").length === 0) {

        return -3;
    }


    // Si todos los campos están completos y hay al menos una materia, retornar true
    return 1;
}

function limpiarFormularioAgregarOferta() {
    // Limpiar campos principales
    $("#descripcion").val("");





    // Limpiar lista de grupos profesionales
    var listaGrupoProfesional = document.getElementById("listaGrupoProfesional");
    while (listaGrupoProfesional.firstChild) {
        listaGrupoProfesional.removeChild(listaGrupoProfesional.firstChild);
    }
    LimpiarCheckBoxUbicaciones();



}





function agregarOfertasCreadasOferenteALaTabla(oferta) {
    var tbody = document.getElementById("listaMisOfertas");

    var row = tbody.insertRow(-1);
    row.id = oferta.idOferta;



    var cellPuesto = row.insertCell(0);
    cellPuesto.textContent = oferta.nombreOferta;
    cellPuesto.style.textAlign = "center"; // Estilo en línea para centrar verticalmente
    cellPuesto.className = "text-sm";

    var cellPublicado = row.insertCell(0);
    var fecha = oferta.publicacionOferta.split('T');
    var partesFecha = fecha[0].split('-');
    cellPublicado.textContent = partesFecha[2] + "/" + partesFecha[1] + "/" + partesFecha[0];
    cellPublicado.style.textAlign = "center";
    cellPublicado.className = "text-sm";

    //var cellInstitución = row.insertCell(1);
    //cellInstitución.textContent = oferta.nombreInstitucion;
    //cellInstitución.style.textAlign = "center";



    //var cellMateria = row.insertCell(1);
    //cellMateria.textContent = oferta.nombreMateria;
    //cellMateria.style.textAlign = "center"; // Estilo en línea para centrar verticalmente

    //var cellDescripcion = row.insertCell(2);
    //cellDescripcion.textContent = oferta.descripcionOferta;
    //cellDescripcion.style.textAlign = "center"; // Estilo en línea para centrar verticalmente

    var cellAcciones = row.insertCell(2);
    cellAcciones.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente


    var btnVerOferta = document.createElement("button");
    btnVerOferta.className = "btnVerOferta btn btn-primary btn-sm  w-100";
    btnVerOferta.innerHTML = 'Ver Detalles <i class="fas fa-eye"></i>';


    // Agregar el contenedor div a la celda de acciones
    cellAcciones.appendChild(btnVerOferta);


}


//el num va indicar cual tipo de titulo se va cargar, 1 secundaria, 2 universitario, 3 otros
function procesarRespuestaOfertasCreadasOferente(data) {

    var tbody = document.getElementById("listaMisOfertas");

    tbody.innerHTML = "";

    //verificar si se retorno algo en el data
    if (data.vacio) {

        //no hay titulos para mostrar
        var mensajeTr = document.createElement("tr");
        var mensajeTd = document.createElement("td");
        mensajeTd.colSpan = 4;
        mensajeTd.className = "text-center";
        mensajeTd.textContent = "No hay Ofertas creadas";

        mensajeTr.appendChild(mensajeTd);
        tbody.appendChild(mensajeTr);
    }
    else {
        data.forEach(function (oferta) {
            agregarOfertasCreadasOferenteALaTabla(oferta);
        });
    }

}






/// funciones genrales


function cargarImagenPerfil() {

    var identificacion = $("#identification").val();
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/ObtenerUrlImagen");

    $.ajax({
        url: url,  // Reemplaza con la URL correcta de tu controlador
        type: 'GET',
        data: { identificacion: identificacion },
        success: function (data) {

            if (data.urlImagen) {

                //si se obtiene la url se carga la imagen
                var imagen = document.getElementById('fotoPerfil');
                imagen.src = data.urlImagen;
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




//function CargarUbicacionesCheckBox() {
//    var apiProvincia = "https://apisproyectorg.somee.com/api/Ubicaciones/Provincias/";


//    /*         Realiza una solicitud GET a la API*/
//    fetch(apiProvincia)
//        .then(response => {
//            if (!response.ok) {
//                throw new Error('No se pudo obtener las provincias.');
//            }
//            return response.json();
//        })
//        .then(data => {


//            // Llena el ComboBox con las provincias recibidas de la API
//            data.forEach(provincia => {

//            });



//        })
//        .catch(error => {
//            console.error(error);
//        });
//}


function CargarProvinciasCheckBox() {
    var apiProvincia = "https://apisproyectorg.somee.com/api/Ubicaciones/Provincias/";


    // Elemento div donde se cargarán los checkboxes
    var ubicacionesCheckDiv = document.getElementById('provinciasCheck');

    /* Realiza una solicitud GET a la API para obtener las provincias */
    fetch(apiProvincia)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener las provincias.');
            }
            return response.json();
        })
        .then(data => {

            // Llena el div con checkboxes de las provincias recibidas de la API
            data.forEach(provincia => {

                var provinciaCheckbox = document.createElement('input');
                provinciaCheckbox.type = 'checkbox';
                provinciaCheckbox.value = provincia.idProvincia; // Asigna el ID de la provincia como valor
                provinciaCheckbox.name = 'provincias';
                provinciaCheckbox.id = 'provincia_' + provincia.idProvincia; // Asigna un ID único para cada checkbox de provincia

                var provinciaLabel = document.createElement('label');
                provinciaLabel.classList.add("labelCheck");
                provinciaLabel.htmlFor = provinciaCheckbox.id;
                provinciaLabel.appendChild(document.createTextNode(provincia.nombreProvincia));


                provinciaCheckbox.addEventListener('change', function () {

                    if (!this.checked) {

                        EliminarCantonesDiv(this.value);
                    } else {

                        CargarCantonesCheckBox(this.value);
                    }
                });


                ubicacionesCheckDiv.appendChild(provinciaCheckbox);
                ubicacionesCheckDiv.appendChild(provinciaLabel);
                ubicacionesCheckDiv.appendChild(document.createElement('br'));

                var cantonesCheckBox = document.createElement('div');
                cantonesCheckBox.classList.add('cantonesCheckBox');
                cantonesCheckBox.id = 'cantones' + provincia.idProvincia;
                ubicacionesCheckDiv.appendChild(cantonesCheckBox);


            });
        })
        .catch(error => {
            console.error(error);
        });

}

// Función para cargar dinámicamente los checkboxes de los cantones
function CargarCantonesCheckBox(idProvincia) {
    var apiCanton = 'https://apisproyectorg.somee.com/api/Ubicaciones/Cantones/';
    var cantonesDiv = $("#cantones" + idProvincia);

    // Agrega el checkbox "Seleccionar Todos"
    var selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.value = 'selectAll';
    selectAllCheckbox.name = 'cantones';
    selectAllCheckbox.id = 'selectAll_' + idProvincia;
    var selectAllLabel = document.createElement('label');
    selectAllLabel.classList.add("labelCheck");
    selectAllLabel.htmlFor = selectAllCheckbox.id;
    selectAllLabel.appendChild(document.createTextNode('Seleccionar Todos'));
    cantonesDiv.append(selectAllCheckbox, selectAllLabel, document.createElement('br'));

    // Realiza una solicitud GET a la API para obtener los cantones de la provincia seleccionada
    fetch(apiCanton + idProvincia)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los cantones.');
            }
            return response.json();
        })
        .then(data => {

            // Llena el div con checkboxes de los cantones recibidos de la API
            data.forEach(canton => {
                var cantonCheckbox = document.createElement('input');
                cantonCheckbox.type = 'checkbox';
                cantonCheckbox.value = canton.idCanton; // Asigna el ID del cantón como valor
                cantonCheckbox.name = 'cantones';
                cantonCheckbox.id = 'canton_' + canton.idCanton; // Asigna un ID único para cada checkbox de cantón
                cantonCheckbox.classList.add(idProvincia);

                var cantonLabel = document.createElement('label');
                cantonLabel.htmlFor = cantonCheckbox.id;
                cantonLabel.classList.add("labelCheck");
                cantonLabel.appendChild(document.createTextNode(canton.nombreCanton));

                // Utiliza la función append de jQuery para agregar elementos al div
                cantonesDiv.append(cantonCheckbox, cantonLabel, document.createElement('br'));
            });

            // Asigna un evento al checkbox "Seleccionar Todos"
            $('#' + selectAllCheckbox.id).on('change', function () {
                // Selecciona o deselecciona todos los checkboxes según el estado del "Seleccionar Todos"
                $('.' + idProvincia).prop('checked', $(this).prop('checked'));
            });
        })
        .catch(error => {
            console.error(error);
        });
}




function EliminarCantonesDiv(idProvincia) {

    // Limpia los checkboxes de cantones donde este ligalo a la provincia que se deselecciona
    var cantonesDiv = $("#cantones" + idProvincia);
    cantonesDiv.empty();
}


function LimpiarCheckBoxUbicaciones() {
    for (let i = 1; i <= 7; i++) {
        EliminarCantonesDiv(i);
        $("#provincia_" + i).prop("checked", false);
    }
}






///// funciones para vista VerOfertasOferente




function agregarMiOfertaALaLista(oferta) {
    if (oferta.estado == false) {
        var listaOfertas = document.getElementById("listaOfertasOferente");
    }
    else {
        var listaOfertas = document.getElementById("listaOfertasOferenteDesactivadas");
    }


    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.setAttribute("data-id", oferta.idOferta);

    let partesFecha = oferta.publicacionOferta.split('T');
    let partesFecha2 = partesFecha[0].split('-');
    
    var span1 = document.createElement("span");
    span1.innerHTML = "<strong>Publicado:</strong> " + partesFecha2[2] + "/" + ObtenerMes(partesFecha2[1]) + "/" + partesFecha2[0];

    var span2 = document.createElement("span");
    span2.innerHTML = "<strong>Materia:</strong> " + oferta.materia;

    var span3 = document.createElement("span");
    span3.innerHTML = "<strong>Grupos Profesionales:</strong> " + obtenerCadenaGrupos(oferta.grupos);

    var div = document.createElement("div");



    if (oferta.estado == false) {

        var btnVer = document.createElement("button");
        btnVer.className = "btnVerCoincidencias btn btn-info btn-sm w-100";
        btnVer.innerHTML = '<i class="fas fa-eye"></i> Ver';
        div.appendChild(btnVer);

        var btnEliminar = document.createElement("button");
        btnEliminar.className = "btnDesactivarOferta btn btn-danger btn-sm mt-1 w-100";
        btnEliminar.innerHTML = '<i class="fas fa-ban"></i> Desactivar';
        div.appendChild(btnEliminar);
    }
    else {
        var btnActivar = document.createElement("button");
        btnActivar.className = "btnActivarOferta btn btn-success btn-sm mt-1 w-100";
        btnActivar.innerHTML = '<i class="fas fa-check"></i> Activar';
        div.appendChild(btnActivar);

    }




 


    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(span3);


    li.appendChild(div);

    listaOfertas.appendChild(li);
}

function procesarRespuestaMisOfertas(data) {


    var listaOfertasActivas = document.getElementById("listaOfertasOferente");
    listaOfertasActivas.innerHTML = "";

    var listaOfertasDesactivadas = document.getElementById("listaOfertasOferenteDesactivadas");
    listaOfertasDesactivadas.innerHTML = "";

    data.forEach(function (oferta) {
        agregarMiOfertaALaLista(oferta);
    });


}


function CargarOfertasCreadasOferente() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/CargarMisOfertas");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            identificacion: $("#identification").val()

        },
        success: function (data) {

            if (data.error) {

                console.log(data.error);

            } else if (!data.vacio) {


                procesarRespuestaMisOfertas(data);
            }

        },
        error: function (error) {
            console.log(error);
        }
    });
}


function obtenerCadenaGrupos(grupos) {
    // Utilizar forEach para recorrer el arreglo de grupos y concatenar los códigos
    var cadenaGrupos = "";
    grupos.forEach(function (grupo, index) {
        cadenaGrupos += grupo;
        // Agregar "/" solo si no es el último elemento
        if (index < grupos.length - 1) {
            cadenaGrupos += " / ";
        }
    });
    return cadenaGrupos;
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



function DesactivarOfertaCreadaOferente(idOferta) {


    // Muestra el modal de confirmación
    $("#confirmacionDesactivarModalOferta").modal("show");

    $("#confirmarDesactivarOferta").click(function (event) {
        let url = ObtenerUrlSolicitud('Oferente', "Oferente/DesactivarOfertaCreadaOferente");

        $.ajax({
            type: "POST",
            url: url,
            data: {
                idOferta: idOferta,
                identificacion: $("#identification").val()
            },
            success: function (data) {

                if (data.error) {
                    $("#confirmacionDesactivarModalOferta").modal("hide");
                    alert("Hubo un problema al desactivar la oferta, vuelva a intentar de nuevo");


                }
                else {
                    $("#confirmacionDesactivarModalOferta").modal("hide");        
                    ///recargar la lista de ofertas
                    CargarOfertasCreadasOferente();
 
                }
               
            },
            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });

    });
}



function ActivarOfertaCreadaOferente(idOferta) {


    // Muestra el modal de confirmación
    $("#confirmacionActivarModalOferta").modal("show");

    $("#confirmarActivarOferta").click(function (event) {
        let url = ObtenerUrlSolicitud('Oferente', "Oferente/ActivarOfertaCreadaOferente");

        $.ajax({
            type: "POST",
            url: url,
            data: {
                idOferta: idOferta,
                identificacion: $("#identification").val()
            },
            success: function (data) {

                if (data.error) {
                    $("#confirmacionActivarModalOferta").modal("hide");
                    alert("Hubo un problema al activar la oferta, vuelva a intentar de nuevo");


                }
                else {
                    $("#confirmacionActivarModalOferta").modal("hide");
                    ///recargar la lista de ofertas

                    CargarOfertasCreadasOferente();
  

                }
            
            },
            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });

    });
}

function agregarColegioALaLista(colegio) {
    var listaColegios = document.getElementById("listaColegios");

    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    var span1 = document.createElement("span");
    span1.innerHTML = "<strong>Institución Educativa:</strong> " + colegio.nombre;

    var span2 = document.createElement("span");
    span2.innerHTML = "<strong>Provincia:</strong> " + colegio.provincia;

    var span3 = document.createElement("span");
    span3.innerHTML = "<strong>Cantón:</strong> " + colegio.canton;

    var span4 = document.createElement("span");
    span4.innerHTML = "<strong>Teléfono:</strong> " + colegio.telefono;
   
    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(span3);
    li.appendChild(span4);




    listaColegios.appendChild(li);
}

function mostrarListaColegios(data) {
    console.log("entra");
    if (data.vacio) {
        var listaColegios = document.getElementById("listaColegios");
        listaColegios.innerHTML = "";
        if ($("#mensaje").length) {

            $("#mensaje").remove();

            $("#listaColegios").after("<p id='mensaje'>No se encontraron coincidencias...</p>");
        }
        

    } else {

        if ($("#mensaje").length) {

            $("#mensaje").remove();

            $("#listaColegios").before("<p id='mensaje'>Registros mostrados: "+ data.length+"</p>");
        }
        //si contiene algo 
        var listaColegios = document.getElementById("listaColegios");
        listaColegios.innerHTML = "";

        data.forEach(function (colegio) {
            agregarColegioALaLista(colegio);
        });

    }

   

}




function CargarColegiosCoincidentesOfertaOferente(idOferta) {

    let url = ObtenerUrlSolicitud('Oferente', "Oferente/CargarColegiosCoincidentes");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            idOferta: idOferta
           
        },
        success: function (data) {

            if (data.error) {
                console.log(data.error);


            }
            else {
                ///recargar la lista de colegios
                mostrarListaColegios(data);
                $("#modalVerColegios").modal("show");
                console.log(data);

            }

        },
        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}




/////////////////  funciones vista ver vacantes aplicadas //////////////
function CargarOfertasAplicadas() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/CargarOfertasAplicadas");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            identificacion: $("#identification").val()
        },
        success: function (data) {

            if (data.error) {

                console.log(data.error);

            } else {

                procesarRespuestaOfertasAplicadas(data);
            }

        },
        error: function (error) {
            console.log(error);
        }
    });
}



function procesarRespuestaOfertasAplicadas(data) {

    var tbody = document.getElementById("listaOfertasAplicadas");

    tbody.innerHTML = "";

    //verificar si se retorno algo en el data
    if (data.vacio) {

        //no hay titulos para mostrar
        var mensajeTr = document.createElement("tr");
        var mensajeTd = document.createElement("td");
        mensajeTd.colSpan = 4;
        mensajeTd.className = "text-center";
        mensajeTd.textContent = "No hay Ofertas Aplicadas";

        mensajeTr.appendChild(mensajeTd);
        tbody.appendChild(mensajeTr);
    }
    else {
        data.forEach(function (oferta) {
            agregarOfertasAplicadasALaTabla(oferta);
        });
    }

}



function agregarOfertasAplicadasALaTabla(oferta) {
    var tbody = document.getElementById("listaOfertasAplicadas");

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


    var btnVerOferta = document.createElement("button");
    btnVerOferta.className = "btnVerOferta btn btn-primary btn-sm  w-100";
    btnVerOferta.innerHTML = 'Ver Detalles <i class="fas fa-eye"></i>';


    // Agregar el contenedor div a la celda de acciones
    cellAcciones.appendChild(btnVerOferta);


}

function CancelarPostulacion() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/CancelarPostulacion");

    $.ajax({
        type: "DELETE",
        url: url,
        data: {
            idOferta: $("#idOferta").val(),
            identificacion: $("#identification").val()

        },
        success: function (data) {

            if (data.error) {

                console.log(data.error);

            }
            else if (data.exito == true) {

                $("#verOfertaModal").modal("hide");
                alert("Se ha eliminado la postulación correctamente!!");


            } else {
                $("#verOfertaModal").modal("hide");
                alert("Hubo un problema al eliminar la postulación");
            }

            $("#confirmacionCancelacionModal").modal("hide");


            //se recargar las ofertas aplicadas para que ya no salga la que se cancelo 
            CargarOfertasAplicadas();

         
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