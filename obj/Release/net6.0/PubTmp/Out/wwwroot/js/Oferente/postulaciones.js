$(document).ready(function () {

    ///////////// seccion de enlaces

    //seccion de enlaces
    $("#enlaceBuscar").click(function (event) {

        event.preventDefault();


        var actionUrl = '/Oferente/BuscarOfertasOferente';

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });

    $("#enlaceCrear").click(function (event) {

        event.preventDefault();


        var actionUrl = '/Oferente/CrearOfertaOferente';

        // Tu lógica para enviar el formulario
        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });




    /////////////////////////////////////////// seccion de ver ofertas laborales ///////////////////////////////////////////////////

    if ($("#vistaActual").val() == "BuscarOfertasOferente") {

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

        CargarProvincia();
        CargarMaterias();
        //CargarListaMaterias();

    }

    $("#btnAgregarMateria").click(function (event) {

        //enviamos el value y el texto de la materia elegida dentro del select
        agregarMateriaALaLista($("#materias").val(), $("#materias option:selected").text());


        // Cerrar el modal
        $("#agregarMateriaModal").modal("hide");

    });


    $("#listaMaterias").on("click", ".btnEliminarMateria", function (event) {

        event.preventDefault();
        // Obtén el data-id del li padre
        var idMateria = $(this).closest("li").data("id");

        // Muestra el modal de confirmación
        $("#confirmacionEliminarModalMateria").modal("show");

        $("#confirmarEliminar").click(function (event) {

            // Eliminar el li con el data-id específico
            $("#listaMaterias li[data-id='" + idMateria + "']").remove();

            $("#confirmacionEliminarModalMateria").modal("hide");

        });



    });


    $("#btnAgregarOferta").click(function (event) {

        event.preventDefault();
        let validacion = ValidarFormularioAgregarOferta();
        if (validacion == -2) {
            //no se seleccionaron materias

            if ($("#mensaje").length) {

                $("#mensaje").remove();

                $("#btnAgregarOferta").before("<p class='alert alert-danger mt-2' id='mensaje'> Debes de seleccionar una materia como minímo</p>");
            }
            else {
                $("#btnAgregarOferta").before("<p class='alert alert-danger mt-2' id='mensaje'> Debes de seleccionar una materia como minímo</p>");
            }


        }
        else if (validacion == -1) {
            //no se llenaron todos los campos
            if ($("#mensaje").length) {

                $("#mensaje").remove();

                $("#btnAgregarOferta").before("<p class='alert alert-danger mt-2' id='mensaje'> Debes de completar todos los campos</p>");
            }
            else {
                $("#btnAgregarOferta").before("<p class='alert alert-danger mt-2' id='mensaje'> Debes de completar todos los campos</p>");
            }
        }
        else {
            //todo esta bien 

            CrearOferta();
            limpiarFormularioAgregarOferta();
        }





    });






    /////////////////////////////////////////// seccion de ver mis ofertas laborales ///////////////////////////////////////////////////

    if ($("#vistaActual").val() == "VerOfertasOferente") {

        CargarOfertasCreadasOferente();

    }






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


//el num va indicar cual tipo de titulo se va cargar, 1 secundaria, 2 universitario, 3 otros
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
    $.ajax({
        type: "GET",
        url: "/Oferente/CargarOfertas",
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
    $.ajax({
        type: "GET",
        url: "/Oferente/ObtenerDatosOferta",
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
    $.ajax({
        type: "GET",
        url: "/Oferente/CargarMaterias",
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
    $.ajax({
        type: "POST",
        url: "/Oferente/AgregarPostulacion",
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




function agregarMateriaALaLista(id, nombre) {
    var listaMaterias = document.getElementById("listaMaterias");

    // Verificar si el id ya existe en la lista
    var existeId = Array.from(listaMaterias.children).some(function (li) {
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
        btnEliminar.className = "btnEliminarMateria btn btn-danger btn-sm";
        btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';

        div.appendChild(btnEliminar);

        li.appendChild(span);
        li.appendChild(div);

        listaMaterias.appendChild(li);
    } else {
        // Muestra un mensaje o realiza alguna acción indicando que el id ya existe
        alert("La materia " + nombre + " ya la escogiste.");
    }
}



function CrearOferta() {
    var listaMaterias = $("#listaMaterias li").map(function () {
        return $(this).data("id");
    }).get();




    // Obtener el formulario y los datos del formulario
    var form = $("#formAgregarOferta")[0];
    var formData = new FormData(form);

    // Agregar lista de materias al formData
    formData.append("listaMaterias", JSON.stringify(listaMaterias));
    formData.append("identificacion", $("#identification").val());


    $.ajax({
        method: "POST",//tipo de solicitud
        url: "/Oferente/CrearOferta",
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

//retorna 1 si se completan todos los campos
//retorna -1 si se dejan campos sin completar
//retorna -2 si no se agrega ni una sola materia
function ValidarFormularioAgregarOferta() {
    // Validar campos principales

    var provincia = document.getElementById("provincias").value;
    var canton = document.getElementById("cantones").value;
    var descripcion = $("#descripcion").val();

    if (provincia === "null" || canton === "null" || descripcion === "") {
        return -1;
    }

    // Validar la lista de materias
    var listaMaterias = document.getElementById("listaMaterias");

    if (listaMaterias.getElementsByTagName("li").length === 0) {
  
        return -2;
    }

    // Si todos los campos están completos y hay al menos una materia, retornar true
    return 1;
}

function limpiarFormularioAgregarOferta() {
    // Limpiar campos principales
    $("#provincias").val("null");
    $("#cantones").val("null");
    $("#descripcion").val("");


    // Limpiar lista de materias
    var listaMaterias = document.getElementById("listaMaterias");
    while (listaMaterias.firstChild) {
        listaMaterias.removeChild(listaMaterias.firstChild);
    }
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




function CargarOfertasCreadasOferente() {
    
    $.ajax({
        type: "GET",
        url: "/Oferente/CargarMisOfertas",
        data: {
            identificacion: $("#identification").val()

        },
        success: function (data) {

            if (data.error) {

                console.log(data.error);

            } else {

                console.log(data);

            }

        },
        error: function (error) {
            console.log(error);
        }
    });
}

