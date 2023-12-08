

$(document).ready(function () {



    //seccion de enlaces
    $("#enlaceReferencias").click(function (event) {

        event.preventDefault();


        var actionUrl = '/Oferente/ReferenciasOferente';

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });

    $("#enlaceDatosPersonales").click(function (event) {

        event.preventDefault();


        var actionUrl = '/Oferente/DatosPersonalesOferente';

        // Tu lógica para enviar el formulario
        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#enlaceExpedienteAcademico").click(function (event) {

        event.preventDefault();


        var actionUrl = '/Oferente/TitulosOferente';

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#enlaceExpLaboral").click(function (event) {

        event.preventDefault();


        var actionUrl = '/Oferente/ExperienciaOferente';

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });



    //asignar a los campos nombre y appelidos valores
    $("#nombre").val($("#nombreOferente").val());
    $("#apellidos").val($("#apellidosOferente").val());


    $("#mostrarModalSubirDimex").click(function (event) {
        event.preventDefault();

        var inputFile = document.getElementById('fotoDimex');
        var file = inputFile.files[0];

        // Validar si se seleccionó un archivo
        if (file) {

            $("#SubirDimexModal").modal("show");
        } else {
            // Si no se seleccionó un archivo, mostrar un mensaje de error o realizar la acción que prefieras
            alert("Debes de seleccionar una imagen");
        }

    });

    // Evento de clic para confirmar la subida de la imagen
    $("#confirmarSubidaDimex").click(function (event) {

        // Obtener el formulario y los datos del formulario
        var form = $("#expedienteForm")[0];
        var formData = new FormData(form);

        $.ajax({
            url: '/Oferente/SubirImagenDimex',  // Reemplaza con la URL correcta de tu controlador
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {

                if (data.exito == true) {

                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#btnGuardarCambios").before("<p class='alert alert-success mt-2' id='mensaje'>" + "Imagen subida exitosamente" + "</p>");
                    }
                    else {
                        $("#btnGuardarCambios").before("<p class='alert alert-success mt-2' id='mensaje'>" + "Imagen subida exitosamente" + "</p>");

                    }
                }
                else {
                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#btnGuardarCambios").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Hubo un error al guardar la imagen" + "</p>");
                    }
                    else {
                        $("#btnGuardarCambios").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Hubo un error al guardar la imagen" + "</p>");

                    }
                }
            },
            error: function (error) {
                // Manejar errores si es necesario
                console.log(error);
            }
        });



        // Cierra el modal de confirmación
        $("#SubirDimexModal").modal("hide");
    });



    if ($("#nombreVista").val() == "DatosPersonalesOferente") {


        //se verifica que tipo de identificacion es, dinex o cedula
        //si es diferente a 10 es cedula
        if ($("#identification").val().length != 10) {

            $.ajax({
                type: "Get",
                url: "/Oferente/ObtenerEstadoDimex",
                data: {
                    identificacion: $("#identification").val()
                },
                success: function (data) {

                    if (data.error) {
                        console.log(data.error);
                    }
                    else {
                        if (data.estadoVerificacionDimex == 3) {
                            //estado 3 significa que ha sido rechazado el documento
                            $("#estadoDimex").val("Rechazado");
                        }
                        else if (data.estadoVerificacionDimex == 2) {
                            //estado 2 significa que ha sido verificado el documento
                            //no se va mostrar las opciones para subir imagen
                            $("#divSubirDinex").hide();
                            $("#mostrarModalSubirDimex").hide();
                            $("#estadoDimex").val("Verificado");

                        }
                        else if (data.estadoVerificacionDimex == 1) {
                            //estado 1 significa que ha sido enviado el documento
                            $("#divSubirDinex").hide();
                            $("#mostrarModalSubirDimex").hide();
                            $("#estadoDimex").val("Enviado");
                        }
                        else {
                            $("#estadoDimex").val("Pendiente");

                        }

                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });

        } else {
            //si se encuentra en un perfil con cedula y no dinex no se mostrara la seccion de dinex
            $("#seccionDinex").hide();
        }


        //cargar idiomas
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



                        // Llena el ComboBox con los cantones recibidos de la API
                        data.forEach(cantones => {
                            $("#cantones").append($("<option>").val(cantones.idCanton).text(cantones.nombreCanton));
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


                    // Llena el ComboBox con los cantones recibidos de la API
                    data.forEach(distritos => {
                        $("#distritos").append($("<option>").val(distritos.idDistrito).text(distritos.nombreDistrito));
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
                    if (data.nacimiento != "" && data.nacimiento != null) {
                        var partesFecha = data.nacimiento.split('T');
                        var nacimiento = partesFecha[0];
                        $("#nacimiento").val((nacimiento != null) ? nacimiento : "");
                    }



                    var provincia = data.idProvincia;
                    var canton = data.idCanton;
                    var distrito = data.idDistrito;
                    var direccion = data.direccion;
                    var genero = data.genero;
                    var grupo = data.grupoProfesional;




                    //asignar los valores a los inputs

                    $("#direccion").val((direccion != null) ? direccion : "");
                    $("#genero").val((genero != 0) ? genero : 0);
                    $("#grupoProfesional").val((grupo != 0) ? grupo : 0);


                    CargarDatosUbicaciones(provincia, canton, distrito);





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
                direccion: $("#direccion").val(),
                grupoP: $("#grupoProfesional").val()

            },
            success: function (data) {//en caso de que sale bien

                if (data.error) { //si data.error contiene algo

                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#btnGuardarCambios").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                    }
                    else {
                        $("#btnGuardarCambios").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                    }



                }
                else {
                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#btnGuardarCambios").before("<p class='alert alert-success mt-2' id='mensaje'>" + data.mensaje + "</p>");
                    }
                    else {
                        $("#btnGuardarCambios").before("<p class='alert alert-success mt-2' id='mensaje'>" + data.mensaje + "</p>");

                    }

                }
            },

            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });

    });




    /*   seccion titulos*/

    $('#nivelEducacion').on('change', function () {
        $("#divInstituto").hide();
        $("#divCarrera").hide();
        $("#divTitulo").hide();
        $("#divInstituto2").hide();
        //1.secundaria
        //2.diplomado
        //3.profesorado
        //4.bachillerato
        //5.licenciatura
        //6.maestria
        //7.doctorado

        var seleccion = parseInt($(this).val(), 10);
        switch (seleccion) {
            case 2:
                tipoCarrera = 1;

                $.ajax({
                    type: "GET",
                    url: "/Oferente/MostrarInstitutosDiplomados",
                    success: function (data) {


                        // Obtener el elemento select
                        var selectInstitutos = $('#instituto');

                        // Limpiar opciones existentes
                        selectInstitutos.empty();
                        selectInstitutos.append('<option value="0">' + "Seleccione un opción" + '</option>');


                        // Iterar sobre la lista de instituciones y agregar opciones al select
                        $.each(data, function (index, institucion) {

                            selectInstitutos.append('<option value="' + institucion + '">' + institucion + '</option>');
                        });

                        $("#divInstituto").show();
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:

                tipoCarrera = 2;

                $.ajax({
                    type: "GET",
                    url: "/Oferente/MostrarUniversidades",
                    success: function (data) {


                        // Obtener el elemento select
                        var selectInstitutos = $('#instituto');

                        // Limpiar opciones existentes
                        selectInstitutos.empty();
                        selectInstitutos.append('<option value="0">' + "Seleccione un opción" + '</option>');


                        // Iterar sobre la lista de instituciones y agregar opciones al select
                        $.each(data, function (index, institucion) {
                            selectInstitutos.append('<option value="' + institucion + '">' + institucion + '</option>');
                        });

                        $("#divInstituto").show();
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
                break;

            default:
                $("#divTitulo").show();
                $("#divInstituto2").show();
        }


    });



    $('#instituto').on('change', function () {



        switch (tipoCarrera) {
            case 1:


                $.ajax({
                    type: "GET",
                    url: "/Oferente/MostrarCarrerasDiplomados",
                    data: {
                        instituto: $(this).find(":selected").text()
                    },
                    success: function (data) {


                        // Obtener el elemento select
                        var selectCarreras = $('#carreras');

                        // Limpiar opciones existentes
                        selectCarreras.empty();

                        // Iterar sobre la lista de instituciones y agregar opciones al select
                        $.each(data, function (index, carreras) {

                            selectCarreras.append('<option value="' + carreras + '">' + carreras + '</option>');
                        });

                        $("#divCarrera").show();
                        $("#divFolio").show();
                        $("#divAsiento").show();
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

                break;
            case 2:

                $.ajax({
                    type: "GET",
                    url: "/Oferente/MostrarCarreras",
                    data: {
                        instituto: $(this).find(":selected").text()
                    },
                    success: function (data) {


                        // Obtener el elemento select
                        var selectCarreras = $('#carreras');

                        // Limpiar opciones existentes
                        selectCarreras.empty();

                        // Iterar sobre la lista de instituciones y agregar opciones al select
                        $.each(data, function (index, carreras) {

                            selectCarreras.append('<option value="' + carreras + '">' + carreras + '</option>');
                        });

                        $("#divCarrera").show();
                        $("#divFolio").show();
                        $("#divAsiento").show();
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
                break;

        }


    });




    if ($("#vistaActual").val() == "TitulosOferente") {

        $("#divInstituto").hide();
        $("#divCarrera").hide();

        $("#divFolio").hide();
        $("#divAsiento").hide();



        let tipoCarrera;//variable guarda si se va mostrar carreras de diplomado (1) o bachillerato, licenciatura, maestria (2),
        //y si es tecnico o secundaria(3)

        //cargar titulos secundaria
        $.ajax({
            type: "GET",
            url: "/Oferente/CargarTitulos",
            data: {
                identificacion: $("#identification").val(),
                clave: $("#clave").val(),
                tipo: 1
            },
            success: function (data) {
                //recargar titulos
                //console.log(data);
                procesarRespuestaTitulos(data, 1);
            },
            error: function (error) {
                console.log("Error al cargar títulos: " + error);
            }
        });

        //cargar titulos universitarios
        $.ajax({
            type: "GET",
            url: "/Oferente/CargarTitulos",
            data: {
                identificacion: $("#identification").val(),
                clave: $("#clave").val(),
                tipo: 2
            },
            success: function (data) {
                //recargar titulos
                //console.log(data);
                procesarRespuestaTitulos(data, 2);
            },
            error: function (error) {
                console.log("Error al cargar títulos: " + error);
            }
        });

        //cargar otros titulos
        $.ajax({
            type: "GET",
            url: "/Oferente/CargarTitulos",
            data: {
                identificacion: $("#identification").val(),
                clave: $("#clave").val(),
                tipo: 3
            },
            success: function (data) {
                //recargar titulos
                //console.log(data);
                procesarRespuestaTitulos(data, 3);
            },
            error: function (error) {
                console.log("Error al cargar títulos: " + error);
            }
        });
    }

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
                        if ($("#nivelEducacion").val() == "1") {
                            $.ajax({
                                type: "GET",
                                url: "/Oferente/CargarTitulos",
                                data: {
                                    identificacion: $("#identification").val(),
                                    clave: $("#clave").val(),
                                    tipo: 1
                                },
                                success: function (data) {
                                    //recargar titulos
                                    //console.log(data);
                                    procesarRespuestaTitulos(data, 1);
                                },
                                error: function (error) {
                                    console.log("Error al cargar títulos: " + error);
                                }
                            });
                        }
                        else if ($("#nivelEducacion").val() == "2" || $("#nivelEducacion").val() == "3") {
                            //cargar otros titulos
                            $.ajax({
                                type: "GET",
                                url: "/Oferente/CargarTitulos",
                                data: {
                                    identificacion: $("#identification").val(),
                                    clave: $("#clave").val(),
                                    tipo: 3
                                },
                                success: function (data) {
                                    //recargar titulos
                                    //console.log(data);
                                    procesarRespuestaTitulos(data, 3);
                                },
                                error: function (error) {
                                    console.log("Error al cargar títulos: " + error);
                                }
                            });
                        }
                        else {
                            //cargar titulos universitarios
                            $.ajax({
                                type: "GET",
                                url: "/Oferente/CargarTitulos",
                                data: {
                                    identificacion: $("#identification").val(),
                                    clave: $("#clave").val(),
                                    tipo: 2
                                },
                                success: function (data) {
                                    //recargar titulos
                                    //console.log(data);
                                    procesarRespuestaTitulos(data, 2);
                                },
                                error: function (error) {
                                    console.log("Error al cargar títulos: " + error);
                                }
                            });
                        }


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
    $("#listaTitulosSecundaria").on("click", ".btnEliminarTitulo", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idTitulo = fila.attr("id");

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

                            $("#tablaTitulos").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                        }
                        else {
                            $("#tablaTitulos").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                        }
                    }
                    else {
                        $("#confirmacionEliminarModal").modal("hide");

                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#tablaTitulos").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Titulo eliminado exitosamente" + "</p>");
                        }
                        else {
                            $("#tablaTitulos").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Titulo eliminado exitosamente" + "</p>");

                        }


                        ///recargar la lista de titulos

                        // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de títulos


                        $.ajax({
                            type: "GET",
                            url: "/Oferente/CargarTitulos",
                            data: {
                                identificacion: $("#identification").val(),
                                clave: $("#clave").val(),
                                tipo: 1
                            },
                            success: function (data) {
                                //recargar titulos
                                //console.log(data);
                                procesarRespuestaTitulos(data, 1);
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



    $("#listaTitulosUniversitarios").on("click", ".btnEliminarTitulo", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idTitulo = fila.attr("id");

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

                            $("#tablaTitulos").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                        }
                        else {
                            $("#tablaTitulos").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                        }
                    }
                    else {
                        $("#confirmacionEliminarModal").modal("hide");

                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#tablaTitulos").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Titulo eliminado exitosamente" + "</p>");
                        }
                        else {
                            $("#tablaTitulos").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Titulo eliminado exitosamente" + "</p>");

                        }


                        ///recargar la lista de titulos

                        // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de títulos


                        $.ajax({
                            type: "GET",
                            url: "/Oferente/CargarTitulos",
                            data: {
                                identificacion: $("#identification").val(),
                                clave: $("#clave").val(),
                                tipo: 2
                            },
                            success: function (data) {
                                //recargar titulos
                                //console.log(data);
                                procesarRespuestaTitulos(data, 2);
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




    $("#listaTitulosVarios").on("click", ".btnEliminarTitulo", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idTitulo = fila.attr("id");

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

                            $("#tablaTitulos").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                        }
                        else {
                            $("#tablaTitulos").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                        }
                    }
                    else {
                        $("#confirmacionEliminarModal").modal("hide");

                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#tablaTitulos").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Titulo eliminado exitosamente" + "</p>");
                        }
                        else {
                            $("#tablaTitulos").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Titulo eliminado exitosamente" + "</p>");

                        }


                        ///recargar la lista de titulos

                        // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de títulos


                        $.ajax({
                            type: "GET",
                            url: "/Oferente/CargarTitulos",
                            data: {
                                identificacion: $("#identification").val(),
                                clave: $("#clave").val(),
                                tipo: 3
                            },
                            success: function (data) {
                                //recargar titulos
                                //console.log(data);
                                procesarRespuestaTitulos(data, 3);
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
    $("#listaTitulosSecundaria").on("click", ".btnEditarTitulo", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idTitulo = fila.attr("id");


        $.ajax({
            type: "GET",
            url: "/Oferente/MostrarTitulo",
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
                console.log(error);
            }
        });


    });


    $("#listaTitulosUniversitarios").on("click", ".btnEditarTitulo", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idTitulo = fila.attr("id");


        $.ajax({
            type: "GET",
            url: "/Oferente/MostrarTitulo",
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
                console.log(error);
            }
        });


    });



    $("#listaTitulosVarios").on("click", ".btnEditarTitulo", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idTitulo = fila.attr("id");


        $.ajax({
            type: "GET",
            url: "/Oferente/MostrarTitulo",
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
                console.log(error);
            }
        });


    });




    //al dar click en el boton de agregar titulo se esconde el boton de actualizar que esta dentro del modal
    $("#abrirModalAgregarTitulo").click(function (event) {
        $("#actualizarTitulo").hide();
        $("#agregarTitulo").show();


        eliminarMsjModal();

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
                                clave: $("#clave").val(),
                                tipo: 1
                            },
                            success: function (data) {
                                //recargar titulos
                                //console.log(data);
                                procesarRespuestaTitulos(data, 1);
                            },
                            error: function (error) {
                                console.log("Error al cargar títulos: " + error);
                            }
                        });


                        //cargar otros titulos
                        $.ajax({
                            type: "GET",
                            url: "/Oferente/CargarTitulos",
                            data: {
                                identificacion: $("#identification").val(),
                                clave: $("#clave").val(),
                                tipo: 3
                            },
                            success: function (data) {
                                //recargar titulos
                                //console.log(data);
                                procesarRespuestaTitulos(data, 3);
                            },
                            error: function (error) {
                                console.log("Error al cargar títulos: " + error);
                            }
                        });


                        //cargar titulos universitarios
                        $.ajax({
                            type: "GET",
                            url: "/Oferente/CargarTitulos",
                            data: {
                                identificacion: $("#identification").val(),
                                clave: $("#clave").val(),
                                tipo: 2
                            },
                            success: function (data) {
                                //recargar titulos
                                //console.log(data);
                                procesarRespuestaTitulos(data, 2);
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
    $("#listaIdiomas").on("click", ".btnEliminarIdioma", function (event) {

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



    //evento al cerrar modal 
    $('#agregarTituloModal').on('hidden.bs.modal', function () {
        limpiarModalTitulos();
    });




    //////////////////////////////////////////////  seccion de referencias //////////////////////////////////////////////////////////////
    if ($("#vistaActual").val() == "ReferenciasOferente") {

        //al cargar la pagina por defecto va estar seleccionado referencia personal y no profesional
        //por lo que vamos a esconder los campos que solo se necesitan llenar cuando es refrencia profesional
        $('#empresaDiv').hide();


        //evento que detecta el cambio de seleccion en el tipo de referencia
        $('#tipoReferencia').on('change', function () {

            //esta funcion muestra y oculta elementos al agregar una referencia dependiendo si es personal o profesional
            CambioTipoReferencia();

        });


        //aplicar mascara al input de numero telefonico 
        // Aplica la máscara de número telefónico específica para Costa Rica
        Inputmask({ mask: '9999-9999' }).mask($('#contacto'));

        //cargar referencias personales de la persona
        $.ajax({
            type: "GET",
            url: "/Oferente/CargarReferencias",
            data: {
                identificacion: $("#identification").val(),
                clave: $("#clave").val(),
                tipoReferencia: '1'
            },
            success: function (data) {

                //recargar refrencias
                procesarRespuestaReferencia(data, 1);
            },
            error: function (error) {
                console.log("Error al cargar referencias: " + error);
            }
        });


        //cargar referencias profesionales de la persona
        $.ajax({
            type: "GET",
            url: "/Oferente/CargarReferencias",
            data: {
                identificacion: $("#identification").val(),
                clave: $("#clave").val(),
                tipoReferencia: '2'
            },
            success: function (data) {

                //recargar refrencias
                procesarRespuestaReferencia(data, 2);
            },
            error: function (error) {
                console.log("Error al cargar referencias: " + error);
            }
        });

    }



    $("#agregarReferencia").click(function (event) {

        event.preventDefault();

        //retorna true si estan completados todos los campos
        if (VerificarCamposModalAgregarReferencia()) {

            // Obtener el formulario y los datos del formulario
            var form = $("#formAgregarReferencia")[0];
            var formData = new FormData(form);

            // Agregar identificacion y clave al formData
            formData.append("identificacion", $("#identification").val());
            formData.append("clave", $("#clave").val());


            $.ajax({
                method: "POST",//tipo de solicitud
                url: "/Oferente/AgregarReferecia",
                data: formData,
                processData: false,  // Necesario para enviar FormData correctamente
                contentType: false,  // Necesario para enviar FormData correctamente
                success: function (data) {//en caso de que sale bien

                    if (data.error) { //si data.error contiene algo

                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#agregarReferencia").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                        }
                        else {
                            $("#agregarReferencia").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                        }



                    }
                    else {
                        console.log("exito");
                        ///recargar la lista de referencias

                        // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de referencias

                        //tipo referencia guarda 1 si es personal, 2 si es profesional
                        if ($("#tipoReferencia").val() == 1) {

                            $.ajax({
                                type: "GET",
                                url: "/Oferente/CargarReferencias",
                                data: {
                                    identificacion: $("#identification").val(),
                                    clave: $("#clave").val()
                                },
                                success: function (data) {

                                    //recargar titulos
                                    procesarRespuestaReferencia(data, 1);
                                },
                                error: function (error) {
                                    console.log("Error al cargar títulos: " + error);
                                }
                            });


                        } else {
                            //cargar referencias profesionales de la persona
                            $.ajax({
                                type: "GET",
                                url: "/Oferente/CargarReferencias",
                                data: {
                                    identificacion: $("#identification").val(),
                                    clave: $("#clave").val(),
                                    tipoReferencia: '2'
                                },
                                success: function (data) {

                                    //recargar refrencias
                                    procesarRespuestaReferencia(data, 2);
                                },
                                error: function (error) {
                                    console.log("Error al cargar referencias: " + error);
                                }
                            });
                        }


                    }
                },

                error: function (xhr, status, error) { //error en la solicitud de ajax
                    console.error(error);
                }
            });
        } else {
            if ($("#mensaje").length) {

                $("#mensaje").remove();

                $("#agregarReferencia").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");
            }
            else {
                $("#agregarReferencia").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");

            }

        }



    });


    //evento eliminar una referencia personal
    $("#listaReferenciasPersonales").on("click", ".btnEliminarReferencia", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idReferencia = fila.attr("id");

        // Muestra el modal de confirmación
        $("#confirmacionEliminarModal").modal("show");

        $("#confirmarEliminar").click(function (event) {

            $.ajax({
                type: "POST",
                url: "/Oferente/EliminarReferencia",
                data: {
                    idReferencia: idReferencia,
                    identificacion: $("#identification").val()
                },
                success: function (data) {

                    if (data.error) {
                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#tablaReferencias").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                        }
                        else {
                            $("#tablaReferencias").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                        }
                    }
                    else {
                        $("#confirmacionEliminarModal").modal("hide");

                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#tablaReferencias").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Referencia eliminada exitosamente" + "</p>");
                        }
                        else {
                            $("#tablaReferencias").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Referencia eliminada exitosamente" + "</p>");

                        }


                        ///recargar la lista de referencias

                        // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de referencias

                        $.ajax({
                            type: "GET",
                            url: "/Oferente/CargarReferencias",
                            data: {
                                identificacion: $("#identification").val(),
                                clave: $("#clave").val(),
                                tipoReferencia: '1'
                            },
                            success: function (data) {

                                //recargar titulos
                                procesarRespuestaReferencia(data, 1);
                            },
                            error: function (error) {
                                console.log("Error al cargar las referencias: " + error);
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


    //evento eliminar una referencia profesional
    $("#listaReferenciasProfesionales").on("click", ".btnEliminarReferencia", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idReferencia = fila.attr("id");

        // Muestra el modal de confirmación
        $("#confirmacionEliminarModal").modal("show");

        $("#confirmarEliminar").click(function (event) {

            $.ajax({
                type: "POST",
                url: "/Oferente/EliminarReferencia",
                data: {
                    idReferencia: idReferencia,
                    identificacion: $("#identification").val()
                },
                success: function (data) {

                    if (data.error) {
                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#tablaReferencias").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                        }
                        else {
                            $("#tablaReferencias").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                        }
                    }
                    else {
                        $("#confirmacionEliminarModal").modal("hide");

                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#tablaReferencias").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Referencia eliminada exitosamente" + "</p>");
                        }
                        else {
                            $("#tablaReferencias").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Referencia eliminada exitosamente" + "</p>");

                        }


                        ///recargar la lista de referencias

                        // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de referencias

                        $.ajax({
                            type: "GET",
                            url: "/Oferente/CargarReferencias",
                            data: {
                                identificacion: $("#identification").val(),
                                clave: $("#clave").val(),
                                tipoReferencia: '2'
                            },
                            success: function (data) {

                                //recargar titulos
                                procesarRespuestaReferencia(data, 2);
                            },
                            error: function (error) {
                                console.log("Error al cargar las referencias: " + error);
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


    //evento al cerrar modal 
    $('#agregarReferenciaModal').on('hidden.bs.modal', function () {
        limpiarCamposModalReferencias();
    });




    //////////////////////////////////////////////  seccion de experiencia laboral //////////////////////////////////////////////////////////////

    if ($("#vistaActual").val() == "ExperienciaOferente") {

        $('#inicio').inputmask('9999', { placeholder: 'YYYY' });
        $('#contacto').inputmask('9999-9999');
        $('#fin').inputmask('9999', { placeholder: 'YYYY' });



        //cargar experiencias en la tabla
        $.ajax({
            type: "GET",
            url: "/Oferente/CargarExperiencias",
            data: {
                identificacion: $("#identification").val(),
                clave: $("#clave").val()
            },
            success: function (data) {

                if (data.error) {

                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#tablaExperiencias").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                    }

                    else {
                        $("#tablaExperiencias").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                    }


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



    $("#agregarExperiencia").click(function (event) {

        event.preventDefault();

        //retorna true si estan completados todos los campos
        if (ValidarCamposAgregarExperiencia()) {

            // Obtener el formulario y los datos del formulario
            var form = $("#formAgregarExperiencia")[0];
            var formData = new FormData(form);

            // Agregar identificacion y clave al formData
            formData.append("identificacion", $("#identification").val());
            formData.append("clave", $("#clave").val());


            $.ajax({
                method: "POST",//tipo de solicitud
                url: "/Oferente/AgregarExperiencia",
                data: formData,
                processData: false,  // Necesario para enviar FormData correctamente
                contentType: false,  // Necesario para enviar FormData correctamente
                success: function (data) {//en caso de que sale bien

                    if (data.error) { //si data.error contiene algo

                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#agregarExperiencia").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                        }
                        else {
                            $("#agregarExperiencia").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                        }



                    }
                    else {

                        ///recargar la lista de titulos

                        // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de títulos

                        $.ajax({
                            type: "GET",
                            url: "/Oferente/CargarExperiencias",
                            data: {
                                identificacion: $("#identification").val(),
                                clave: $("#clave").val()
                            },
                            success: function (data) {

                                if (data.error) {

                                    if ($("#mensaje").length) {

                                        $("#mensaje").remove();

                                        $("#tablaExperiencias").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                                    }

                                    else {
                                        $("#tablaExperiencias").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                                    }


                                } else {

                                    //recargar titulos
                                    procesarRespuestaExperiencia(data);

                                }

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

                $("#agregarExperiencia").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");
            }
            else {
                $("#agregarExperiencia").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");

            }

        }



    });



    $("#listaExperiencias").on("click", ".btnEliminarExperiencia", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idExperiencia = fila.attr("id");

        // Muestra el modal de confirmación
        $("#confirmacionEliminarModal").modal("show");

        $("#confirmarEliminar").click(function (event) {

            $.ajax({
                type: "POST",
                url: "/Oferente/EliminarExperiencia",
                data: {
                    idExperiencia: idExperiencia,
                    identificacion: $("#identification").val()
                },
                success: function (data) {

                    if (data.error) {
                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#tablaExperiencias").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                        }
                        else {
                            $("#tablaExperiencias").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                        }
                    }
                    else {
                        $("#confirmacionEliminarModal").modal("hide");

                        if ($("#mensaje").length) {

                            $("#mensaje").remove();

                            $("#tablaExperiencias").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Experiencia eliminada exitosamente" + "</p>");
                        }
                        else {
                            $("#tablaExperiencias").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Experiencia eliminada exitosamente" + "</p>");

                        }


                        ///recargar la lista de experiencias

                        $.ajax({
                            type: "GET",
                            url: "/Oferente/CargarExperiencias",
                            data: {
                                identificacion: $("#identification").val(),
                                clave: $("#clave").val()
                            },
                            success: function (data) {

                                if (data.error) {

                                    if ($("#mensaje").length) {

                                        $("#mensaje").remove();

                                        $("#tablaExperiencias").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                                    }

                                    else {
                                        $("#tablaExperiencias").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                                    }


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
                },
                error: function (xhr, status, error) { //error en la solicitud de ajax
                    console.error(error);
                }
            });

        });



    });





    



});










//////////////////////////////////////////////  seccion de funciones //////////////////////////////////////////////////////////////

function limpiarModalTitulos() {
    // Limpiar valores de los campos de texto
    document.getElementById("nivelEducacion").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("institucion").value = "";
    document.getElementById("fechaObtenido").value = "";
    document.getElementById("folio").value = "";
    document.getElementById("asiento").value = "";
    $("#divInstituto").hide();
    $("#divCarrera").hide();

    $("#divTitulo").show();
    $("#divInstituto2").show();

    // Limpiar selección del dropdown
    var dropdown = document.getElementById("nivelEducacion");
    dropdown.selectedIndex = 0;

    // Limpiar el input de tipo archivo
    document.getElementById("fotoTitulo").value = "";

}

function verificarCamposModalTitulos() {
    // Obtén los valores de los campos
    //var nivelEducacion = document.getElementById("nivelEducacion").value;
    //var titulo = document.getElementById("titulo").value;
    //var institucion = document.getElementById("institucion").value;
    //var fechaObtenido = document.getElementById("fechaObtenido").value;
    //var folio = document.getElementById("folio").value;
    //var asiento = document.getElementById("asiento").value;

    //// Verifica que todos los campos tengan un valor
    //if (
    //    nivelEducacion !== "" &&
    //    titulo !== "" &&
    //    institucion !== "" &&
    //    fechaObtenido !== "" &&
    //    folio !== "" &&
    //    asiento !== ""
    //) {
    //    // Verifica si se ha seleccionado un archivo en el campo de imagen
    //    var fotoTitulo = document.getElementById("fotoTitulo");
    //    if (fotoTitulo.files.length > 0) {
    //        return true;
    //    } else {

    //        return false;
    //    }
    //}
    //else {
    //    return false;
    //}
    var camposValidos = true;

    // Itera sobre los elementos con clase "form-group" que están visibles
    $(".form-group:visible").each(function () {
        // Comprueba el tipo de elemento y realiza validaciones según sea necesario
        var elemento = $(this).find(":input");

        if (elemento.prop("required") && elemento.val() === "") {
            // Manejar caso de campo requerido vacío
            camposValidos = false;
            return false; // Sale del bucle each
        }

        // Agregar más validaciones según sea necesario

    });

    return camposValidos;
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


function agregarTituloALaTabla(titulo, num) {
    if (num == 1) {
        var tbody = document.getElementById("listaTitulosSecundaria");
    } else if (num == 2) {
        var tbody = document.getElementById("listaTitulosUniversitarios");
    } else {
        var tbody = document.getElementById("listaTitulosVarios");
    }

    var row = tbody.insertRow(-1);
    row.id = titulo.iD_DETALLE_TITULOS;

    var cellEspecialidad = row.insertCell(0);
    cellEspecialidad.textContent = titulo.especialidad;
    cellEspecialidad.style.textAlign = "center";

    var cellTipo = row.insertCell(1);
    cellTipo.textContent = titulo.gradoAcademico;
    cellTipo.style.textAlign = "center";

    var cellEstado = row.insertCell(2);
    if (titulo.estado == 'P') {
        cellEstado.textContent = "Pendiente";
        cellEstado.classList.add('estado-pendiente');
    } else if (titulo.estado == 'R') {
        cellEstado.textContent = "Revisado";
        cellEstado.classList.add('estado-revisado');
    } else if (titulo.estado == 'V') {
        cellEstado.textContent = "Verificado";
        cellEstado.classList.add('estado-verificado');
    }
    cellEstado.style.textAlign = "center"; // Estilo en línea para centrar verticalmente

    var cellAcciones = row.insertCell(3);
    cellAcciones.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente

    // Crear un contenedor div para los botones de editar y eliminar
    var divBotones = document.createElement("div");
    divBotones.className = "row";
    divBotones.style.justifyContent = "center"; // Estilo en línea para centrar horizontalmente
    divBotones.style.alignItems = "center"; // Estilo en línea para centrar verticalmente

    var divEditar = document.createElement("div");
    divEditar.className = "col-sm-6";
    var btnEditar = document.createElement("button");
    btnEditar.className = "btnEditarTitulo btn btn-primary btn-sm w-100";
    btnEditar.innerHTML = 'Editar <i class="fas fa-pencil-alt"></i>';
    divEditar.appendChild(btnEditar);

    var divEliminar = document.createElement("div");
    divEliminar.className = "col-sm-6";
    var btnEliminar = document.createElement("button");
    btnEliminar.className = "btnEliminarTitulo btn btn-danger btn-sm w-100";
    btnEliminar.innerHTML = 'Eliminar <i class="fas fa-trash-alt"></i>';

    divEliminar.appendChild(btnEliminar);

    divBotones.appendChild(divEditar);
    divBotones.appendChild(divEliminar);

    // Agregar el contenedor div a la celda de acciones
    cellAcciones.appendChild(divBotones);


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
        mensajeTd.colSpan = 4;
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
    btnEliminar.className = "btnEliminarIdioma btn btn-danger btn-sm";
    btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';


    div.appendChild(btnEliminar);

    li.appendChild(span);
    li.appendChild(div);

    listaIdiomas.appendChild(li);
}

function procesarRespuestaIdiomas(data) {


    var listaIdiomas = document.getElementById("listaIdiomas");
    listaIdiomas.innerHTML = "";

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




function CargarDatosUbicaciones(provincia, canton, distrito) {
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

            // Ahora que las opciones se han cargado, establece la selección
            provinciasDropdown.val((provincia != 0 && provincia != null) ? provincia : 0);

        })
        .catch(error => {
            console.error(error);
        });


    //cargar los lugares del exopediente
    if (provincia != null && provincia != 0) {
        const apiCanton = 'https://apisproyectorg.somee.com/api/Ubicaciones/Cantones/';

        fetch(apiCanton + (provincia))
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener los cantones.');
                }
                return response.json();
            })
            .then(data => {


                // Llena el ComboBox con los cantones recibidos de la API
                data.forEach(cantones => {
                    cantonesDropdown.append($("<option>").val(cantones.idCanton).text(cantones.nombreCanton));
                });

                $("#cantones").val(canton);
            })
            .catch(error => {
                console.error(error);
            });
    }


    if (canton != null && canton != 0) {
        const apiDistrito = 'https://apisproyectorg.somee.com/api/Ubicaciones/Distritos/';

        fetch(apiDistrito + (canton))
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener los distritos.');
                }
                return response.json();
            })
            .then(data => {


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



function CambioTipoReferencia() {
    if ($('#tipoReferencia').val() == 2) {
        //si se selecciona referencia profesional
        $('#empresaDiv').show();

        //se esconde campo requerido en referencia personal
        $('#personaReferenciaDiv').hide();
    }
    else {
        //si se selecciona referencia personal
        $('#personaReferenciaDiv').show();

        //se esconde campo requerido en referencia profesional
        $('#empresaDiv').hide();
    }
}



function VerificarCamposModalAgregarReferencia() {
    // Obtener todos los campos obligatorios
    var camposObligatorios = document.querySelectorAll('[required]');


    // Verificar cada campo obligatorio
    camposObligatorios.forEach(function (campo) {
        // Verificar si el campo está visible
        if ($(campo).is(':visible')) {
            if (!campo.value.trim()) {
                return false;
            }
        }
    });

    //verificar que el campo contacto se complete

    if (!(/^\d{8}$/).test($("#contacto").val().replace(/\D/g, ''))) {
        return false;
    }

    return true;
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
        cellEstado.textContent = "No Verificado";
        cellEstado.classList.add('estado-pendiente');
    } else {
        cellEstado.textContent = "Verificado";
        cellEstado.classList.add('estado-verificado');
    }
    cellEstado.style.textAlign = "center"; // Estilo en línea para centrar verticalmente

    var cellAcciones = row.insertCell(3);
    cellAcciones.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente




    var btnEliminar = document.createElement("button");
    btnEliminar.className = "btnEliminarReferencia btn btn-danger btn-sm  w-100";
    btnEliminar.innerHTML = 'Eliminar <i class="fas fa-trash-alt"></i>';




    // Agregar el contenedor div a la celda de acciones
    cellAcciones.appendChild(btnEliminar);


}


//el num va ser para indicar cual referencia quiere cargar, 1 personales, 2 profesionales
function procesarRespuestaReferencia(data, num) {
    var tbody = num == 1 ? document.getElementById("listaReferenciasPersonales") : document.getElementById("listaReferenciasProfesionales");
    tbody.innerHTML = "";
    console.log(data);
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


    $('#agregarReferenciaModal').modal('hide');
    limpiarCamposModalReferencias();
}

function limpiarCamposModalReferencias() {
    // Establecer valores en blanco para los campos
    document.getElementById('tipoReferencia').value = '';
    document.getElementById('nombreEmpresa').value = '';
    document.getElementById('nombrePersonaRefiere').value = '';
    document.getElementById('contacto').value = '';
    document.getElementById('fotoReferencia').value = '';  // Limpiar el campo de archivo (input type="file") no es posible por razones de seguridad
}




function ValidarCamposAgregarExperiencia() {
    // Función de validación al hacer clic en el botón "Guardar Experiencia"
    // Obtén los valores de los campos
    var nombreEmpresa = $("#nombreEmpresa").val();
    var contacto = $("#contacto").val();
    var inicio = $("#inicio").val();
    var fin = $("#fin").val();
    var labores = $("#labores").val();

    // Obtén solo los dígitos del campo de inicio
    var inicioDigits = inicio.replace(/\D/g, '');

    // Realiza la validación
    if (
        nombreEmpresa === "" ||
        contacto === "" ||
        inicio.replace(/\D/g, '').length !== 4 ||  // Validar que haya exactamente 4 números
        fin.replace(/\D/g, '').length !== 4 ||
        labores === ""
    ) {


        return false;
    } else {


        return true;
    }
}






function agregarExperienciaALaTabla(experiencia) {
    var tbody = document.getElementById("listaExperiencias");

    var row = tbody.insertRow(-1);
    row.id = experiencia.iD_DETALLE_EXPERIENCIA;

    var cellEmpresa = row.insertCell(0);
    cellEmpresa.textContent = experiencia.nombrE_EMPRESA + " ( " + experiencia.telefono.replace(/(\d{4})(\d{4})/, '$1-$2') + " )";
    cellEmpresa.style.textAlign = "center";

    var cellPuesto = row.insertCell(1);
    cellPuesto.textContent = experiencia.descripcioN_LABORES;
    cellPuesto.style.textAlign = "center";

    var cellYears = row.insertCell(2);
    cellYears.textContent = experiencia.inicio + " / " + experiencia.fin;
    cellYears.style.textAlign = "center"; // Estilo en línea para centrar verticalmente

    var cellAcciones = row.insertCell(3);
    cellAcciones.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente


    var btnEliminar = document.createElement("button");
    btnEliminar.className = "btnEliminarExperiencia btn btn-danger btn-sm  w-100";
    btnEliminar.innerHTML = 'Eliminar <i class="fas fa-trash-alt"></i>';



    // Agregar el contenedor div a la celda de acciones
    cellAcciones.appendChild(btnEliminar);


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


    $('#agregarExperienciaModal').modal('hide');
    limpiarCamposModalExperiencia();


}


function limpiarCamposModalExperiencia() {
    // Limpiar los valores de los campos
    $("#nombreEmpresa").val("");
    $("#contacto").val("");
    $("#inicio").val("");
    $("#fin").val("");
    $("#labores").val("");
}





