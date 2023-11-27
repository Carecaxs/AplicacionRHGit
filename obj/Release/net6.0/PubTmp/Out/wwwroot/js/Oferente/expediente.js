

$(document).ready(function () {

    //asignar a los campos nombre y appelidos valores
    $("#nombre").val($("#nombreOferente").val());
    $("#apellidos").val($("#apellidosOferente").val());


    if ($("#nombreVista").val() == "DatosPersonalesOferente") {


        //cargar titulos
        $.ajax({
            type: "Get",
            url: "/Oferente/MostrarIdiomaLista",
            data: {
                identificacion: $("#identification").val(),
                clave: $("#clave").val()
            },
            success: function (data) {
                //recargar titulos

                procesarRespuestaIdiomas(data);
            },
            error: function (error) {
                console.log("Error al cargar idiomas: " + error);
            }
        });


        //cargar provincias
        //URL de tu API que devuelve las provincias
        var apiProvincia = "https://apisproyectorg.somee.com/api/Ubicaciones/Provincias/";

        // Elemento <select> de provincias
        var provinciasDropdown = $("#provincias");
        var cantonesDropdown = $("#cantones");
        var distritosDropdown = $("#distritos");



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


        $("#provincias").change(function () {
            if ($("#provincias").val() != "null") {//verificar que la opcion no sea "seleccione una provincia"

                //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
                // Elimina todas las opciones excepto la primera (índice 0)
                $("#cantones").find("option:not(:first)").remove();
                $("#distritos").find("option:not(:first)").remove();

                var idProvincia = $("#provincias").val();//agarrar el id de la provincia elegida

                const apiCanton = 'https://apisproyectorg.somee.com/api/Ubicaciones/Cantones/';

                fetch(apiCanton + (idProvincia))
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('No se pudo obtener los cantones.');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);

                        // Llena el ComboBox con los cantones recibidos de la API
                        data.forEach(cantones => {
                            cantonesDropdown.append($("<option>").val(cantones.idCanton).text(cantones.nombreCanton));
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            else {
                //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
                // Elimina todas las opciones excepto la primera (índice 0)
                $("#cantones").find("option:not(:first)").remove();
                $("#distritos").find("option:not(:first)").remove();



            }

        });


        //evento al cambiar de seleccion en cantones
        $("#cantones").change(function () {

            //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
            // Elimina todas las opciones excepto la primera (índice 0)
            $("#distritos").find("option:not(:first)").remove();

            var idCanton = $("#cantones").val();//agarrar el id del cannton elegido

            const apiDistrito = 'https://apisproyectorg.somee.com/api/Ubicaciones/Distritos/';

            fetch(apiDistrito + (idCanton))
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pudo obtener los distritos.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    // Llena el ComboBox con los cantones recibidos de la API
                    data.forEach(distritos => {
                        distritosDropdown.append($("<option>").val(distritos.idDistrito).text(distritos.nombreDistrito));
                    });
                })
                .catch(error => {
                    console.error(error);
                });

        });



        $.ajax({
            type: "Get",//tipo de solicitud
            url: "/Oferente/ObtenerDatosPersonalesEx", 
            data: {//se envia el parametro
                identificacion: $("#identification").val(),
           
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
                    var partesFecha = data.nacimiento.split('T');

                    var nacimiento = partesFecha[0];
                    var provincia = data.idProvincia;
                    var canton = data.idCanton;
                    var distrito = data.idDistrito;
                    var direccion = data.direccion;
                    var genero = data.genero;
      
         

                    //asignar los valores a los inputs
                    $("#nacimiento").val((nacimiento != null) ? nacimiento : "");
                    $("#direccion").val((direccion != null) ? direccion : "");
                    $("#genero").val((genero != 0) ? genero : 0);
           
 


                    
                    //cargar los lugares del exopediente
                    if (canton != null) {
                        const apiCanton = 'https://apisproyectorg.somee.com/api/Ubicaciones/Cantones/';

                        fetch(apiCanton + (provincia))
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('No se pudo obtener los cantones.');
                                }
                                return response.json();
                            })
                            .then(data => {
                                console.log(data);

                                // Llena el ComboBox con los cantones recibidos de la API
                                data.forEach(cantones => {
                                    cantonesDropdown.append($("<option>").val(cantones.idCanton).text(cantones.nombreCanton));
                                });
                                $("#provincias").val(provincia);

                                $("#cantones").val(canton);
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }
                    

                    if (distrito != null) {
                        const apiDistrito = 'https://apisproyectorg.somee.com/api/Ubicaciones/Distritos/';

                        fetch(apiDistrito + (canton))
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('No se pudo obtener los distritos.');
                                }
                                return response.json();
                            })
                            .then(data => {
                                console.log(data);

                                // Llena el ComboBox con los cantones recibidos de la API
                                data.forEach(distritos => {
                                    distritosDropdown.append($("<option>").val(distritos.idDistrito).text(distritos.nombreDistrito));
                                });
                                $("#distritos").val(distrito);

                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }


                   

                }
            },
            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });





    }
            



    //evento de Guardar Cambios en el expediente ( datos personales )
    $("#btnGuardarCambios").click(function (event) {

        event.preventDefault();


        $.ajax({
            type: "Post",//tipo de solicitud
            url: "/Oferente/GuardarCambiosDatosPersonalesEx",
            data: {//se envia el parametro
                identificacion: $("#identification").val(),
                nacimiento: $("#nacimiento").val(),
                genero: $("#genero").val(),
                provincia: $("#provincias").val(),
                canton: $("#cantones").val(),
                distrito: $("#distritos").val(),
                direccion: $("#direccion").val()

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
                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#direccion").after("<p class='alert alert-success mt-2' id='mensaje'>" + data.mensaje + "</p>");
                    }
                    else {
                        $("#direccion").after("<p class='alert alert-success mt-2' id='mensaje'>" + data.mensaje + "</p>");

                    }

                }
            },

            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });

    });




 /*   seccion titulos*/


    $("#agregarTitulo").click(function (event) {

        event.preventDefault();

        //retorna true si estan completados todos los campos
        if (verificarCamposModalTitulos()) {

            // Obtener el formulario y los datos del formulario
            var form = $("#formAgregarTitulo")[0];
            var formData = new FormData(form);

            // Agregar identificacion y clave al formData
            formData.append("identificacion", $("#identification").val());
            formData.append("clave", $("#clave").val());


            $.ajax({
                method: "POST",//tipo de solicitud
                url: "/Oferente/AgregarTitulo",
                data: formData,
                processData: false,  // Necesario para enviar FormData correctamente
                contentType: false,  // Necesario para enviar FormData correctamente
                success: function (data) {//en caso de que sale bien

                    if (data.error) { //si data.error contiene algo

                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                        }
                        else {
                            $("#agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                        }



                    }
                    else {
                      
                        ///recargar la lista de titulos

                        // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de títulos

                        $.ajax({
                            type: "GET",
                            url: "/Oferente/CargarTitulos",
                            data: {
                                identificacion: $("#identification").val(),
                                clave: $("#clave").val()
                            },
                            success: function (data) {
                                //recargar titulos
                                procesarRespuestaTitulos(data);
                            },
                            error: function (error) {
                                console.log("Error al cargar títulos: " + error);
                            }
                        });

                    }
                },

                error: function (xhr, status, error) { //error en la solicitud de ajax
                    console.error(error);
                }
            });
        } else {
            if ($("#mensaje").length) {

                $("#mensaje").remove();

                $("#agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");
            }
            else {
                $("#agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");

            }

        }

       

    });



    //evento para eliminar titulo
    // Evento para el botón de eliminar (delegación de eventos)
    $("#listaTitulos").on("click", "#btnEliminarTitulo", function () {

        // Obtén el data-id del li padre
        var idTitulo = $(this).closest("li").data("id");

        // Muestra el modal de confirmación
        $("#confirmacionEliminarModal").modal("show");

        $("#confirmarEliminar").click(function (event) {

            $.ajax({
                type: "POST",
                url: "/Oferente/EliminarTitulo",
                data: {
                    idTitulo: idTitulo,
                    identificacion: $("#identification").val()
                },
                success: function (data) {

                    if (data.error) {
                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#listaTitulos").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                        }
                        else {
                            $("#listaTitulos").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                        }
                    }
                    else {
                        $("#confirmacionEliminarModal").modal("hide");

                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#listaTitulos").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Titulo eliminado exitosamente" + "</p>");
                        }
                        else {
                            $("#listaTitulos").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Titulo eliminado exitosamente" + "</p>");

                        }


                        ///recargar la lista de titulos

                        // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de títulos

                        $.ajax({
                            type: "GET",
                            url: "/Oferente/CargarTitulos",
                            data: {
                                identificacion: $("#identification").val(),
                                clave: $("#clave").val()
                            },
                            success: function (data) {
                                //recargar titulos
                                procesarRespuestaTitulos(data);
                            },
                            error: function (error) {
                                console.log("Error al cargar títulos: " + error);
                            }
                        });

                    }
                },
                error: function (xhr, status, error) { //error en la solicitud de ajax
                    console.error(error);
                }
            });

        });

        

    });


    //evento para editar titulo
    $("#listaTitulos").on("click", "#btnEditarTitulo", function () {

        // Obtén el data-id del li padre
        var idTitulo = $(this).closest("li").data("id");


        $.ajax({
            type: "GET",
            url: "/Oferente/MostrarTitulo",
            data: {
                idTitulo: idTitulo,
                identificacion: $("#identification").val()
            },
            success: function (data) {
                console.log(data);
                if (data.error) {
                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#listaTitulos").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                    }
                    else {
                        $("#listaTitulos").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                    }

                }
                else {
                    //en caso de todo salir bien se asigna los resultados del data a los inputs del modal


                    var partesFecha = data.fechA_OBTENCION.split('T');
                    var fechaTitulo = partesFecha[0];

                    $("#nivelEducacion").val(data.tipO_TITULO);
                    $("#titulo").val(data.especialidad);
                    $("#institucion").val(data.nombrE_INSTITUCION);
                    $("#fechaObtenido").val(fechaTitulo);
                    $("#folio").val(data.folio);
                    $("#asiento").val(data.asiento);


                    //mostrar el modal 
                    $("#agregarTituloModal").modal("show");
                    eliminarMsjModal();

                    //esconder boton de agregar titulo en el modal y mostrar el de guardar cambios
                    $("#agregarTitulo").hide();
                    $("#actualizarTitulo").show();

                }
            },
            error: function (error) {
                console.log( error);
            }
        });



        //evento al precionar guardar cambios en el titulo
        $("#actualizarTitulo").click(function (event) {

            event.preventDefault();

            //retorna true si estan completados todos los campos
            if (verificarCamposModalTitulosActualizar()) {

                // Obtener el formulario y los datos del formulario
                var form = $("#formAgregarTitulo")[0];
                var formData = new FormData(form);

                // Agregar identificacion y clave al formData
                formData.append("identificacion", $("#identification").val());
                formData.append("clave", $("#clave").val());
                formData.append("idTitulo", idTitulo);



                $.ajax({
                    method: "POST",//tipo de solicitud
                    url: "/Oferente/ActualizarTitulo",
                    data: formData,
                    processData: false,  // Necesario para enviar FormData correctamente
                    contentType: false,  // Necesario para enviar FormData correctamente
                    success: function (data) {//en caso de que sale bien

                        if (data.error) { //si data.error contiene algo

                            if ($("#mensaje").length) {

                                $("#mensaje").remove();

                                $("#agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                            }
                            else {
                                $("#agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                            }



                        }
                        else {

                            ///recargar la lista de titulos

                            // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de títulos

                            $.ajax({
                                type: "GET",
                                url: "/Oferente/CargarTitulos",
                                data: {
                                    identificacion: $("#identification").val(),
                                    clave: $("#clave").val()
                                },
                                success: function (data) {
                                    //recargar titulos
                                    procesarRespuestaTitulos(data);
                                },
                                error: function (error) {
                                    console.log("Error al cargar títulos: " + error);
                                }
                            });

                        }
                    },

                    error: function (xhr, status, error) { //error en la solicitud de ajax
                        console.error(error);
                    }
                });
            } else {
                if ($("#mensaje").length) {

                    $("#mensaje").remove();

                    $("#agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");
                }
                else {
                    $("#agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");

                }

            }

        });




    });


    //al dar click en el boton de agregar titulo se esconde el boton de actualizar que esta dentro del modal
    $("#abrirModalAgregarTitulo").click(function (event) {
        $("#actualizarTitulo").hide();
        $("#agregarTitulo").show();


        eliminarMsjModal();

    });


    $("#btnAgregarIdiomaModal").click(function (event) {
        
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: "/Oferente/AñadirIdiomaExpediente",
            data: {
                identificacion: $("#identification").val(),
                idIdioma: $("#nombreIdioma").val()
            },
            success: function (data) {
                //recargar titulos

                if (data.error) {

                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#btnAgregarIdiomaModal").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                    }
                    else {
                        $("#btnAgregarIdiomaModal").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                    }
                }
                else {

                    $.ajax({
                        type: "Get",
                        url: "/Oferente/MostrarIdiomaLista",
                        data: {
                            identificacion: $("#identification").val(),
                            clave: $("#clave").val()
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
               
  
            },
            error: function (error) {
                console.log(error);
            }
        });



    });





    //evento para eliminar Idioma de expediente
    $("#listaIdiomas").on("click", "#btnEliminarIdioma", function (event) {

        event.preventDefault();
        // Obtén el data-id del li padre
        var idIdioma = $(this).closest("li").data("id");

        // Muestra el modal de confirmación
        $("#confirmacionEliminarModalIdioma").modal("show");

        $("#confirmarEliminar").click(function (event) {

            $.ajax({
                type: "POST",
                url: "/Oferente/EliminarIdioma",
                data: {
                    idIdioma: idIdioma,
                    identificacion: $("#identification").val()
                },
                success: function (data) {

                    if (data.error) {
                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#listaIdiomas").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                        }
                        else {
                            $("#listaIdiomas").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                        }
                    }
                    else {
                        $("#confirmacionEliminarModalIdioma").modal("hide");

                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#listaIdiomas").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Titulo eliminado exitosamente" + "</p>");
                        }
                        else {
                            $("#listaIdiomas").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Titulo eliminado exitosamente" + "</p>");

                        }


                        ///recargar la lista de titulos

                        // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de idiomas

                        $.ajax({
                            type: "Get",
                            url: "/Oferente/MostrarIdiomaLista",
                            data: {
                                identificacion: $("#identification").val(),
                                clave: $("#clave").val()
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
                },
                error: function (xhr, status, error) { //error en la solicitud de ajax
                    console.error(error);
                }
            });

        });



    });






});


function limpiarModalTitulos() {
    // Limpiar valores de los campos de texto
    document.getElementById("nivelEducacion").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("institucion").value = "";
    document.getElementById("fechaObtenido").value = "";
    document.getElementById("folio").value = "";
    document.getElementById("asiento").value = "";

    // Limpiar selección del dropdown
    var dropdown = document.getElementById("nivelEducacion");
    dropdown.selectedIndex = 0;

    // Limpiar el input de tipo archivo
    document.getElementById("fotoTitulo").value = "";

}

function verificarCamposModalTitulos() {
    // Obtén los valores de los campos
    var nivelEducacion = document.getElementById("nivelEducacion").value;
    var titulo = document.getElementById("titulo").value;
    var institucion = document.getElementById("institucion").value;
    var fechaObtenido = document.getElementById("fechaObtenido").value;
    var folio = document.getElementById("folio").value;
    var asiento = document.getElementById("asiento").value;

    // Verifica que todos los campos tengan un valor
    if (
        nivelEducacion !== "" &&
        titulo !== "" &&
        institucion !== "" &&
        fechaObtenido !== "" &&
        folio !== "" &&
        asiento !== ""
    ){
        // Verifica si se ha seleccionado un archivo en el campo de imagen
        var fotoTitulo = document.getElementById("fotoTitulo");
        if (fotoTitulo.files.length > 0) {
            return true;
        } else {

            return false;
        }
    }
    else {
        return false;
    }
}


function verificarCamposModalTitulosActualizar() {
    // Obtén los valores de los campos
    var nivelEducacion = document.getElementById("nivelEducacion").value;
    var titulo = document.getElementById("titulo").value;
    var institucion = document.getElementById("institucion").value;
    var fechaObtenido = document.getElementById("fechaObtenido").value;
    var folio = document.getElementById("folio").value;
    var asiento = document.getElementById("asiento").value;

    // Verifica que todos los campos tengan un valor
    if (
        nivelEducacion !== "" &&
        titulo !== "" &&
        institucion !== "" &&
        fechaObtenido !== "" &&
        folio !== "" &&
        asiento !== ""
    ) {
        return true;
    }
    else {
        return false;
    }
}



function agregarTituloALaLista(titulo) {

    var listaTitulos = document.getElementById("listaTitulos");

    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.setAttribute("data-id", titulo.iD_DETALLE_TITULOS);

    var span = document.createElement("span");
    span.textContent = titulo.especialidad;

    var div = document.createElement("div");

    var btnEditar = document.createElement("button");
    btnEditar.id = "btnEditarTitulo";
    btnEditar.className = "btn btn-primary btn-sm";
    btnEditar.innerHTML = '<i class="fas fa-pencil-alt"></i>';

    var btnEliminar = document.createElement("button");
    btnEliminar.id = "btnEliminarTitulo";
    btnEliminar.className = "btn btn-danger btn-sm";
    btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';
    btnEliminar.style = "margin-left:1px";

    div.appendChild(btnEditar);
    div.appendChild(btnEliminar);

    li.appendChild(span);
    li.appendChild(div);

    listaTitulos.appendChild(li);
}

function procesarRespuestaTitulos(data) {
    console.log("entro al 1");



    var listaTitulos = document.getElementById("listaTitulos");
    listaTitulos.innerHTML = "";

    data.forEach(function (titulo) {
        agregarTituloALaLista(titulo);
    });

    $('#agregarTituloModal').modal('hide');
    limpiarModalTitulos();
}

function eliminarMsjModal() {
    //eliminar el nombre de archivo que se pone a la hora de editar un titulo
    if ($("#nombreArchivo").length) {

        $("#nombreArchivo").remove();

    }

    if ($("#mensaje").length) {

        $("#mensaje").remove();

    }
}

        
function agregarIdiomaALaLista(idioma) {
    var listaIdiomas = document.getElementById("listaIdiomas");

    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.setAttribute("data-id", idioma.idIdioma);

    var span = document.createElement("span");
    span.textContent = idioma.nombreIdioma;

    var div = document.createElement("div");



    var btnEliminar = document.createElement("button");
    btnEliminar.id = "btnEliminarIdioma";
    btnEliminar.className = "btn btn-danger btn-sm";
    btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';


    div.appendChild(btnEliminar);

    li.appendChild(span);
    li.appendChild(div);

    listaIdiomas.appendChild(li);
}

function procesarRespuestaIdiomas(data) {
    console.log(data);
    console.log("entro al 2");

    var listaIdiomas = document.getElementById("listaIdiomas");
    listaIdiomas.innerHTML = "";
    var p = document.createElement("p");
    p.innerHTML="Idiomas:";
    listaIdiomas.appendChild(p);


    data.forEach(function (idioma) {
        agregarIdiomaALaLista(idioma);
    });

    //agregar boton de agregar idioma
    var divBoton = document.createElement("div");
    divBoton.className = "form-group col-sm-12";
    divBoton.innerHTML = '<button id="" type="button" class="btn btn-primary mt-3 w-100" data-toggle="modal" data-target="#agregarIdiomaModal">Añadir Idioma</button>';
    listaIdiomas.appendChild(divBoton);


    $('#agregarIdiomaModal').modal('hide');

    if ($("#mensaje").length) {

        $("#mensaje").remove();
    }

}
        


    


    