

$(document).ready(function () {

    cargarImagenPerfil();
    $("#fotoPerfil").on("click", function () {
        // Obtener la URL de la imagen original
        var urlImagenOriginal = $(this).attr("src");

        // Asignar la URL de la imagen original al modal
        $("#imagenAmpliada").attr("src", urlImagenOriginal);
    });



    //seccion de enlaces
    $("#enlaceReferencias").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/ReferenciasOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });

    $("#enlaceDatosPersonales").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/DatosPersonalesOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#enlaceExpedienteAcademico").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/TitulosOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#enlaceExpLaboral").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/ExperienciaOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });



    //asignar a los campos nombre y appelidos valores
    $("#nombre").val($("#nombreOferente").val());
    $("#apellidos").val($("#apellidosOferente").val());





    ////// seccion de datos personales expediente ///////////


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

        SubirDimex();

        // Cierra el modal de confirmación
        $("#SubirDimexModal").modal("hide");

    });

    //evento al seleccionar una foto para el perfil
    $('#inputFotoPerfil').change(function () {

        mostrarFoto();
    });

    //evento al confirmar foto perfil
    $("#confirmarFotoPerfil").click(function (event) {

        SubirFotoPerfil();
        // metodo para cargar la imagen
        cargarImagenPerfil();

        //cerrar modal
        $("#seleccionarFotoModal").modal("hide");
    });



    if ($("#nombreVista").val() == "DatosPersonalesOferente") {


        //poner activo al enlace de los encabezados de datos personales

        $("#enlaceDatosPersonales").addClass("btn-info active");
        $("#enlaceDatosPersonales").removeClass("btn-dark");

        AgregarMascarasPaginaDatosPersonales();
        ObtenerDatosPersonales();
        MostrarGruposProfesionalesOferente();

        //cargar idiomas del oferente
        CargarIdiomasOferente();

        //se verifica que tipo de identificacion es, dinex o cedula
        //si es diferente a 10 es cedula
        if ($("#identification").val().length != 10) {

            
            let url = ObtenerUrlSolicitud('Oferente', "Oferente/ObtenerEstadoDimex");

            $.ajax({
                type: "Get",
                url: url,
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

        //evento para eliminar Idioma de expediente
        $("#listaIdiomas").on("click", ".btnEliminarIdioma", function (event) {

            event.preventDefault();
            // Obtén el data-id del li padre
            var idIdioma = $(this).closest("li").data("id");
            EliminarIdiomaOferente(idIdioma);


        });

        $("#listaGrupoProfesional").on("click", ".btnEliminarGrupo", function (event) {

            event.preventDefault();
            // Obtén el data-id del li padre
            var idGrupo = $(this).closest("li").data("id");
            EliminarGrupoProfesionalOferente(idGrupo);


        });



        $("#provincias").change(function () {
            if ($("#provincias").val() != "null") {//verificar que la opcion no sea "seleccione una provincia"

                //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
                // Elimina todas las opciones excepto la primera (índice 0)
                $("#cantones").find("option:not(:first)").remove();
                $("#distritos").find("option:not(:first)").remove();

                var idProvincia = $("#provincias").val();//agarrar el id de la provincia elegida
                CargarCanton(idProvincia);


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

       


    }




    //evento de Guardar Cambios en el expediente ( datos personales )
    $("#btnGuardarCambios").click(function (event) {

        event.preventDefault();

        ActualizarDatosPersonales();

    });




    /*   seccion titulos*/


    $('#institutoUniversitario').on('change', function () {
        if ($(this).val() != null && $(this).val() != "") {
            CargarCarrerasUniversitarias();
        }


    });


    $('#institutoDiploma').on('change', function () {
        if ($(this).val() != null && $(this).val() != "") {
            CargarCarrerasDiplomas();
        }


    });



    if ($("#vistaActual").val() == "TitulosOferente") {

        //poner activo al enlace de los encabezados de titulos

        $("#enlaceExpedienteAcademico").addClass("btn-info active");
        $("#enlaceExpedienteAcademico").removeClass("btn-dark");

        CargarProvincia();

        AgregarMascarasPaginaTitulos();


        //cargar titulos secundaria
        CargarTitulos(1);

        ////cargar titulos universitarios
        CargarTitulos(2);


        ////cargar otros titulos
        CargarTitulos(3);

    }

    $('#abrirModalAgregarTituloUniversitario').click(function () {

        CargarGradosUniversitarios();
        CargarUniversidades();
    });


    $('#abrirModalAgregarTituloDiploma').click(function () {

        CargarUniversidades();
    });


    //evento al elegir imagen de titulo

    $('.fotoTitulo').change(function () {

        var input = this;

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.previewImage').attr('src', e.target.result).show();
            };

            reader.readAsDataURL(input.files[0]);
        }
    });


    $(".provincias").change(function () {
        if ($(".provincias").val() != "null") {//verificar que la opcion no sea "seleccione una provincia"

            //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
            // Elimina todas las opciones excepto la primera (índice 0)
            $(".cantones").find("option:not(:first)").remove();


            var idProvincia = $(".provincias").val();//agarrar el id de la provincia elegida

            CargarCanton(idProvincia);
        }
        else {
            //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
            // Elimina todas las opciones excepto la primera (índice 0)
            $(".cantones").find("option:not(:first)").remove();



        }

    });


    $("#nivelEducacionUniversitaria").change(function () {
        if ($("#institutoUniversitario").val() != null && $("#institutoUniversitario").val() != "") {
            CargarCarrerasUniversitarias();
        }

    });

    $("#cantonesSecundaria").change(function () {
        if ($("#cantonesSecundaria").val() == "null") {//verificar que la opcion no sea "seleccione una provincia"

            //si no se escongun canton valido no se hace nada
            $("#cantonesSecundaria").find("option:not(:first)").remove();

        }
        else {


            //mostrar titulos de secundaria
            CargarInstitutosSecundaria($("#cantonesSecundaria").val());

        }

    });

    $("#agregarTituloSecundaria").click(function (event) {

        event.preventDefault();

        //retorna true si estan completados todos los campos
        if (verificarCamposModalTitulos($("#formAgregarTituloSecundaria"))) {
            AgregarTituloSecundaria();
            limpiarCamposModalSecundaria();

            // Cerrar modal
            $('#agregarTituloSecundariaModal').modal('hide');

        } else {
            if ($("#mensaje").length) {

                $("#mensaje").remove();

                $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");
            }
            else {
                $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");

            }

        }

    });


    //evento al tocar boton de agregar titulo universitario dentro del modal 
    $("#agregarTituloUniversitaria").click(function (event) {

        event.preventDefault();

        //retorna true si estan completados todos los campos
        if (verificarCamposModalTitulos($("#formAgregarTituloUniversitario"))) {

            AgregarTituloUniversidad();
            limpiarCamposModalUniversitario();

            // Cerrar modal
            $('#agregarTituloUniversitarioModal').modal('hide');

        } else {
            if ($("#mensaje").length) {


                $("#mensaje").remove();

                $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");
            }
            else {
                $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");

            }

        }

    });



    $("#agregarTituloDiploma").click(function (event) {

        event.preventDefault();

        //retorna true si estan completados todos los campos
        if (verificarCamposModalTitulos($("#formAgregarTituloDiploma"))) {
            AgregarTituloDiploma();
            limpiarCamposDiploma();

            // Cerrar modal
            $('#agregarTituloDiplomaModal').modal('hide');

        } else {
            if ($("#mensaje").length) {


                $("#mensaje").remove();

                $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");
            }
            else {
                $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");

            }

        }

    });


    $("#listaTitulosSecundaria").on("click", ".btnVerTitulo", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idTitulo = fila.attr("id");

        var identificacion = $("#identification").val();

        MostrarTitulo(identificacion, idTitulo);

    });

    $("#listaTitulosUniversitarios").on("click", ".btnVerTitulo", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idTitulo = fila.attr("id");

        var identificacion = $("#identification").val();

        MostrarTitulo(identificacion, idTitulo);

    });

    $("#listaTitulosVarios").on("click", ".btnVerTitulo", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idTitulo = fila.attr("id");

        var identificacion = $("#identification").val();

        MostrarTitulo(identificacion, idTitulo);

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
            let url = ObtenerUrlSolicitud('Oferente', "Oferente/EliminarTitulo");

            $.ajax({
                type: "POST",
                url: url,
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


                        CargarTitulos(1);






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
            let url = ObtenerUrlSolicitud('Oferente', "Oferente/EliminarTitulo");

            $.ajax({
                type: "POST",
                url: url,
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


                        CargarTitulos(2);

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
            let url = ObtenerUrlSolicitud('Oferente', "Oferente/EliminarTitulo");

            $.ajax({
                type: "POST",
                url: url,
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


                        CargarTitulos(3);

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

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/MostrarTitulo");

        $.ajax({
            type: "GET",
            url: url,
            data: {
                idTitulo: idTitulo,
                identificacion: $("#identification").val()
            },
            success: function (data) {

                if (data.error) {
                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#listaTitulosSecundaria").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                    }
                    else {
                        $("#listaTitulosSecundaria").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                    }

                }
                else {
                    //en caso de todo salir bien se asigna los resultados del data a los inputs del modal

                    CargarDatosTituloSecundaria(data[0]);
                    $('#agregarTituloSecundariaModal').modal('show');


                    //evento al precionar guardar cambios en el titulo de secundaria
                    $("#actualizarTituloSecundaria").click(function (event) {

                        event.preventDefault();

                        //retorna true si estan completados todos los campos
                        if (verificarCamposModalTitulos($("#formAgregarTituloSecundaria"))) {
                            ActualizarTituloSecundria(idTitulo);

                        } else {
                            if ($("#mensaje").length) {

                                $("#mensaje").remove();

                                $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");
                            }
                            else {
                                $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");

                            }

                        }

                    });
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

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/MostrarTitulo");

        $.ajax({
            type: "GET",
            url: url,
            data: {
                idTitulo: idTitulo,
                identificacion: $("#identification").val()
            },
            success: function (data) {

                if (data.error) {
                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#listaTitulosUniversitarios").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                    }
                    else {
                        $("#listaTitulosUniversitarios").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                    }

                }
                else {
                    //en caso de todo salir bien se asigna los resultados del data a los inputs del modal

                    CargarDatosTituloUniversitario(data[0]);
                    $('#agregarTituloUniversitarioModal').modal('show');


                    //evento al precionar guardar cambios en el titulo de secundaria
                    $("#actualizarTituloUniversitaria").click(function (event) {

                        event.preventDefault();

                        //retorna true si estan completados todos los campos
                        if (verificarCamposModalTitulos($("#formAgregarTituloUniversitario"))) {
                            ActualizarTituloUniversitario(idTitulo);

                        } else {

                            if ($("#mensaje").length) {

                                $("#mensaje").remove();

                                $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");
                            }
                            else {
                                $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");

                            }

                        }

                    });
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

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/MostrarTitulo");

        $.ajax({
            type: "GET",
            url: url,
            data: {
                idTitulo: idTitulo,
                identificacion: $("#identification").val()
            },
            success: function (data) {

                if (data.error) {
                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#listaTitulosUniversitarios").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                    }
                    else {
                        $("#listaTitulosUniversitarios").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                    }

                }
                else {
                    //en caso de todo salir bien se asigna los resultados del data a los inputs del modal

                    CargarDatosTituloDiploma(data[0]);
                    $('#agregarTituloDiplomaModal').modal('show');


                    //evento al precionar guardar cambios en el titulo de secundaria
                    $("#actualizarTituloDiploma").click(function (event) {

                        event.preventDefault();

                        //retorna true si estan completados todos los campos
                        if (verificarCamposModalTitulos($("#formAgregarTituloDiploma"))) {
                            ActualizarTituloDiploma(idTitulo);

                        } else {

                            if ($("#mensaje").length) {

                                $("#mensaje").remove();

                                $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");
                            }
                            else {
                                $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + "Debes de llenar todos los campos" + "</p>");

                            }

                        }

                    });
                }
            },
            error: function (error) {
                console.log(error);
            }
        });


    });







    $("#abrirModalAgregarTituloUniversitario").click(function (event) {
        $("#actualizarTituloUniversitaria").hide();
        $("#agregarTituloUniversitaria").show();


        //se muestran nuevamente los divs que se ocultan a la hora de actualizar
        $("#divEducacionUniversidad, #divInstitutoUniversitario, #divCarreraUniversitaria").show();

    });

    $("#abrirModalAgregarTituloDiploma").click(function (event) {
        $("#actualizarTituloDiploma").hide();
        $("#agregarTituloDiploma").show();


        //se muestran nuevamente los divs que se ocultan a la hora de actualizar
        $("#divInstitutoDiploma, #divCarreraDiploma").show();

    });




    $("#btnAgregarIdiomaModal").click(function (event) {

        event.preventDefault();

        AñadirIdioma();

    });


    $("#btnAgregarGrupoProfesional").click(function (event) {

        event.preventDefault();

        AñadirGrupoProfesional();

    });





    //evento al cerrar modal 
    $('#agregarTituloUniversitarioModal').on('hidden.bs.modal', function () {
        limpiarCamposModalUniversitario();
    });


    $('#agregarTituloSecundariaModal').on('hidden.bs.modal', function () {
        limpiarCamposModalSecundaria();
    });


    $('#agregarTituloDiplomaModal').on('hidden.bs.modal', function () {
        limpiarCamposDiploma();
    });


    //////////////////////////////////////////////  seccion de referencias //////////////////////////////////////////////////////////////
    if ($("#vistaActual").val() == "ReferenciasOferente") {
        //poner activo al enlace de los encabezados de referencias

        $("#enlaceReferencias").addClass("btn-info active");
        $("#enlaceReferencias").removeClass("btn-dark");

        //al cargar la pagina por defecto va estar seleccionado referencia personal y no profesional
        //por lo que vamos a esconder los campos que solo se necesitan llenar cuando es refrencia profesional
        $('#empresaDiv').hide();






        //aplicar mascara al input de numero telefonico 
        // Aplica la máscara de número telefónico específica para Costa Rica
        Inputmask({ mask: '9999-9999' }).mask($('#contacto'));


        //cargar referencias personales de la persona
        CargarReferencias(1);


        //cargar referencias profesionales de la persona
        CargarReferencias(2);


    }

    //al tocar boton de agregar referencia personal se esconde los campos que se usan para agregar referencia profesional 
    //y se asigna en 1 el tipo de referencia que este seria la personal
    $("#abrirModalAgregarReferenciaPersonal").click(function (event) {
        $("#empresaDiv").hide();
        $("#personaReferenciaDiv").show();

        $("#tipoReferencia").val(1);
    });

    //al tocar boton de agregar referencia profesional se esconde los campos que se usan para agregar referencia personal
    //y se asigna en 2 el tipo de referencia que este seria la profesional
    $("#abrirModalAgregarReferenciaProfesional").click(function (event) {
        $("#personaReferenciaDiv").hide();
        $("#empresaDiv").show();

        $("#tipoReferencia").val(2);
    });

    $("#agregarReferencia").click(function (event) {

        event.preventDefault();

        //retorna true si estan completados todos los campos
        if (VerificarCamposModalAgregarReferencia()) {

            AgregarReferencia();
           
            
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
            EliminarReferencia(idReferencia);
            
        });



    });



    $("#listaReferenciasPersonales").on("click", ".btnVerReferencia", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idReferencia = fila.attr("id");

        var identificacion = $("#identification").val();

        MostrarEvaluacion(identificacion, idReferencia);

    });


    $("#listaReferenciasProfesionales").on("click", ".btnVerReferencia", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idReferencia = fila.attr("id");

        var identificacion = $("#identification").val();

        MostrarEvaluacion(identificacion, idReferencia);

    });

    //evento eliminar una referencia profesional
    $("#listaReferenciasProfesionales").on("click", ".btnEliminarReferencia", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idReferencia = fila.attr("id");

        // Muestra el modal de confirmación
        $("#confirmacionEliminarModal").modal("show");

        $("#confirmarEliminar").click(function (event) {

            EliminarReferencia(idReferencia);

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

        //poner activo al enlace de los encabezados de experiencia
  
        $("#enlaceExpLaboral").addClass("btn-info active");
        $("#enlaceExpLaboral").removeClass("btn-dark");

        //cargar experiencias en la tabla
        let url = ObtenerUrlSolicitud('Oferente', "Oferente/CargarExperiencias");

        $.ajax({
            type: "GET",
            url: url,
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

            let url = ObtenerUrlSolicitud('Oferente', "Oferente/AgregarExperiencia");

            $.ajax({
                method: "POST",//tipo de solicitud
                url: url,
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
                        let url = ObtenerUrlSolicitud('Oferente', "Oferente/CargarExperiencias");

                        $.ajax({
                            type: "GET",
                            url: url,
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

            EliminarExperiencia(idExperiencia);
            
            

        });

    });



    $("#listaExperiencias").on("click", ".btnVerExperiencia", function () {

        // Obtener el id de la fila que va ser el id del titulo 
        var fila = $(this).closest("tr");

        var idExperiencia = fila.attr("id");

        var identificacion = $("#identification").val();
        MostrarExperiencia(identificacion, idExperiencia);

    });





});










//////////////////////////////////////////////  seccion de funciones //////////////////////////////////////////////////////////////




function verificarCamposModalTitulos(formulario) {
    var camposValidos = true;


    // Recorrer todos los campos visibles dentro del formulario
    formulario.find(':visible').each(function () {
        var elemento = $(this);

        // Verificar si el campo es de tipo file
        if (elemento.attr('type') === 'file') {
            if (formulario.find('.agregarTitulo:visible').length > 0) {

                if (elemento[0].files.length < 1) {
                    // si no hay archivos seleccionados
                    camposValidos = false;
                    return false;
                }
            }
        }

        if (elemento.attr('type') !== 'file' && elemento.prop('required') && elemento.val() === '') {
            // Manejar caso de campo requerido vacío

            camposValidos = false;
            return false; // Sale del bucle each
        }


        // Verificar campos de fecha con al menos 8 dígitos
        if (
            (elemento.attr('name') === 'fechaFin' || elemento.attr('name') === 'fechaInicio') &&
            elemento.val().replace(/\D/g, '').length < 8
        ) {
            camposValidos = false;
            return false; // Sale del bucle each
        }

    });

    return camposValidos;
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
        }
        else {
            //si titulos secundaria esta vacio se muestra el boton de agregar titulo
            mensajeTd.colSpan = 6;
            var formGroupDiv = document.createElement('div');
            formGroupDiv.classList.add('form-group', 'col-sm-12');

            // Crear el elemento button
            var addButton = document.createElement('button');
            addButton.id = 'abrirModalAgregarTituloSecundaria';
            addButton.type = 'button';
            addButton.classList.add('btn', 'btn-primary', 'w-100', 'btn-sm');
            addButton.setAttribute('data-toggle', 'modal');
            addButton.setAttribute('data-target', '#agregarTituloSecundariaModal');
            addButton.textContent = 'Añadir';
            addButton.onclick = abrirModalAñadirTituloSecundaria;

            formGroupDiv.appendChild(addButton);
            var tablaSecundaria = document.getElementById("tablaTitulosSecundaria");
            tablaSecundaria.parentNode.insertBefore(formGroupDiv, tablaSecundaria.nextSibling);
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


    $('#agregarIdiomaModal').modal('hide');

    if ($("#mensaje").length) {

        $("#mensaje").remove();
    }

}



function agregarGrupoProfALaLista(grupo) {

    var listaGrupos = document.getElementById("listaGrupoProfesional");

    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.setAttribute("data-id", grupo.idGrupoProfesional);

    var span = document.createElement("span");
    span.textContent = grupo.grupoProfesional;

    var div = document.createElement("div");



    var btnEliminar = document.createElement("button");
    btnEliminar.className = "btnEliminarGrupo btn btn-danger btn-sm";
    btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';


    div.appendChild(btnEliminar);

    li.appendChild(span);
    li.appendChild(div);

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

    // Verificar que se haya seleccionado una imagen
    var fotoReferencia = document.getElementById('fotoReferencia');
    if (fotoReferencia.files.length === 0) {
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

    var btnEliminar = document.createElement("button");
    btnEliminar.className = "btnEliminarReferencia btn btn-danger mt-1 btn-sm w-100";
    btnEliminar.innerHTML = 'Eliminar <i class="fas fa-trash-alt"></i>';




    // Agregar el contenedor div a la celda de acciones
    cellAcciones.appendChild(btnVer);
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
    var fotoEvaluacion = $("#fotoEvaluacion")[0].files;


    // Realiza la validación
    if (
        nombreEmpresa === "" ||
        contacto === "" ||
        inicio.replace(/\D/g, '').length !== 4 ||  // Validar que haya exactamente 4 números
        fin.replace(/\D/g, '').length !== 4 ||
        labores === "" ||
        !fotoEvaluacion || fotoEvaluacion.length === 0
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

    var btnEliminar = document.createElement("button");
    btnEliminar.className = "btnEliminarExperiencia btn btn-danger btn-sm mt-1 w-100";
    btnEliminar.innerHTML = 'Eliminar <i class="fas fa-trash-alt"></i>';



    // Agregar el contenedor div a la celda de acciones
    cellAcciones.appendChild(btnVer);
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




function CargarProvincia() {
    var apiProvincia = "https://apisproyectorg.somee.com/api/Ubicaciones/Provincias/";

    // Elemento <select> de provincias
    var provinciasDropdown = $(".provincias");
    console.log("jk");



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
                $(".cantones").append($("<option>").val(cantones.idCanton).text(cantones.nombreCanton));
            });


        })
        .catch(error => {
            console.error(error);
        });
}





function CargarInstitutosSecundaria(idCanton = 0) {
    return new Promise(function (resolve, reject) {
        let url = ObtenerUrlSolicitud('Oferente', "Oferente/MostrarInstitutosSecundaria");

        $.ajax({
            type: "GET",
            url: url,
            data: {
                idCanton: idCanton
            },
            success: function (data) {


                // Obtener el elemento select
                var selectInstitutos = $('#institutoSecundaria');

                // Limpiar opciones existentes
                selectInstitutos.empty();

                // Iterar sobre la lista de instituciones y agregar opciones al select
                $.each(data, function (index, instituciones) {

                    selectInstitutos.append('<option value="' + instituciones.codInstitucion + '">' + instituciones.nombreInstitucion + '</option>');
                });

            },
            error: function (error) {
                console.log(error);
            }
        });
    });
}


//mostrar carreras de diplomado (1) o bachillerato, licenciatura, maestria (2),
//y si es tecnico o secundaria(3)
function CargarTitulos(tipoTitulo) {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/CargarTitulos");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            identificacion: $("#identification").val(),
            clave: $("#clave").val(),
            tipo: tipoTitulo
        },
        success: function (data) {
            //recargar titulos
            //console.log(data);
            procesarRespuestaTitulos(data, tipoTitulo);
        },
        error: function (error) {
            console.log("Error al cargar títulos: " + error);
        }
    });
}



function AgregarTituloSecundaria() {
    // Obtener el formulario y los datos del formulario
    var form = $("#formAgregarTituloSecundaria")[0];
    var formData = new FormData(form);


    // Agregar identificacion y clave al formData
    formData.append("identificacion", $("#identification").val());
    formData.append("clave", $("#clave").val());

    let url = ObtenerUrlSolicitud('Oferente', "Oferente/AgregarTituloSecundaria");

    $.ajax({
        method: "POST",//tipo de solicitud
        url: url,
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

                CargarTitulos(1);

            }
        },

        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}

function AgregarTituloUniversidad() {
    // Obtener el formulario y los datos del formulario
    var form = $("#formAgregarTituloUniversitario")[0];
    var formData = new FormData(form);


    // Agregar identificacion y clave al formData
    formData.append("identificacion", $("#identification").val());
    formData.append("clave", $("#clave").val());
    formData.append("textoCarrera", $("#carrerasUniversitarias").find('option:selected').text());


    let url = ObtenerUrlSolicitud('Oferente', "Oferente/AgregarTituloUniversidad");

    $.ajax({
        method: "POST",//tipo de solicitud
        url: url,
        data: formData,
        processData: false,  // Necesario para enviar FormData correctamente
        contentType: false,  // Necesario para enviar FormData correctamente
        success: function (data) {//en caso de que sale bien

            if (data.error) { //si data.error contiene algo

                if ($("#mensaje").length) {

                    $("#mensaje").remove();

                    $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                }
                else {
                    $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                }



            }
            else {

                ///recargar la lista de titulos

                CargarTitulos(2);

            }
        },

        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}




function AgregarTituloDiploma() {
    // Obtener el formulario y los datos del formulario
    var form = $("#formAgregarTituloDiploma")[0];
    var formData = new FormData(form);


    // Agregar identificacion y clave al formData
    formData.append("identificacion", $("#identification").val());
    formData.append("clave", $("#clave").val());
    formData.append("textoCarrera", $("#carrerasDiploma").find('option:selected').text());
    formData.append("nivelEducacion", "2");



    let url = ObtenerUrlSolicitud('Oferente', "Oferente/AgregarTituloUniversidad");

    $.ajax({
        method: "POST",//tipo de solicitud
        url: url,
        data: formData,
        processData: false,  // Necesario para enviar FormData correctamente
        contentType: false,  // Necesario para enviar FormData correctamente
        success: function (data) {//en caso de que sale bien

            if (data.error) { //si data.error contiene algo

                if ($("#mensaje").length) {

                    $("#mensaje").remove();

                    $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                }
                else {
                    $(".agregarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                }



            }
            else {

                ///recargar la lista de titulos

                CargarTitulos(3);

            }
        },

        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}

function CargarDatosTituloSecundaria(data) {

    $(".divUbicacionSecundaria").hide();

    $("#divInstitutoSecundaria").hide();

    var fechaInicio = data.fechaInicio.split('T');
    let partesFechaInicio = fechaInicio[0].split('-');


    var fechaFin = data.fechaFin.split('T');
    let partesFechaFin = fechaFin[0].split('-');




    $("#fechaInicioSecundaria").val(partesFechaInicio[2] + partesFechaInicio[1] + partesFechaInicio[0]);
    $("#fechaFinSecundaria").val(partesFechaFin[2] + partesFechaFin[1] + partesFechaFin[0]);

    //esconder boton de agregar titulo en el modal y mostrar el de guardar cambios
    $("#agregarTituloSecundaria").hide();
    $("#actualizarTituloSecundaria").show();
}



function CargarDatosTituloUniversitario(data) {




    //se muestran nuevamente los divs que se ocultan a la hora de actualizar
    $("#divEducacionUniversidad, #divInstitutoUniversitario, #divCarreraUniversitaria").hide();

    var fechaInicio = data.fechaInicio.split('T');
    let partesFechaInicio = fechaInicio[0].split('-');


    var fechaFin = data.fechaFin.split('T');
    let partesFechaFin = fechaFin[0].split('-');




    $("#fechaInicioUniversitarias").val(partesFechaInicio[2] + partesFechaInicio[1] + partesFechaInicio[0]);
    $("#fechaFinUniversitarias").val(partesFechaFin[2] + partesFechaFin[1] + partesFechaFin[0]);
    $("#tomoUniversitario").val(data.tomo);
    $("#folioUniversitario").val(data.folio);
    $("#asientoUniversitario").val(data.asiento);


    //esconder boton de agregar titulo en el modal y mostrar el de guardar cambios
    $("#actualizarTituloUniversitaria").show();
    $("#agregarTituloUniversitaria").hide();
}



function CargarDatosTituloDiploma(data) {




    //se muestran nuevamente los divs que se ocultan a la hora de actualizar
    $("#divInstitutoDiploma, #divCarreraDiploma").hide();

    var fechaInicio = data.fechaInicio.split('T');
    let partesFechaInicio = fechaInicio[0].split('-');


    var fechaFin = data.fechaFin.split('T');
    let partesFechaFin = fechaFin[0].split('-');




    $("#fechaInicioDiploma").val(partesFechaInicio[2] + partesFechaInicio[1] + partesFechaInicio[0]);
    $("#fechaFinDiploma").val(partesFechaFin[2] + partesFechaFin[1] + partesFechaFin[0]);
    $("#tomoDiploma").val(data.tomo);
    $("#folioDiploma").val(data.folio);
    $("#asientoDiploma").val(data.asiento);


    //esconder boton de agregar titulo en el modal y mostrar el de guardar cambios
    $("#actualizarTituloDiploma").show();
    $("#agregarTituloDiploma").hide();
}


function AgregarMascarasPaginaTitulos() {
    // Aplicar la máscara al campo de fecha de inicio
    $('#fechaInicioSecundaria, #fechaFinSecundaria, #fechaInicioUniversitarias, #fechaFinUniversitarias, #fechaInicioDiploma, #fechaFinDiploma').inputmask('99/99/9999', { placeholder: 'dd/mm/yyyy' });

    // Escuchar al evento de foco en el campo
    $('#fechaInicioSecundaria').on('focus', function () {
        // Limpiar el valor para permitir cambios
        $(this).val('');
    });

    $('#fechaFinSecundaria').on('focus', function () {
        // Limpiar el valor para permitir cambios
        $(this).val('');
    });

    $('#fechaInicioUniversitarias').on('focus', function () {
        // Limpiar el valor para permitir cambios
        $(this).val('');
    });

    $('#fechaFinUniversitarias').on('focus', function () {
        // Limpiar el valor para permitir cambios
        $(this).val('');
    });

    $('#fechaInicioDiploma').on('focus', function () {
        // Limpiar el valor para permitir cambios
        $(this).val('');
    });

    $('#fechaFinDiploma').on('focus', function () {
        // Limpiar el valor para permitir cambios
        $(this).val('');
    });

    $('#tomoUniversitario, #folioUniversitario, #asientoUniversitario, #tomoDiploma, #folioDiploma, #asientoDiploma').inputmask('numeric', {
        'alias': 'numeric',
        'autoGroup': false,
        'digits': 0,
        'digitsOptional': false,
        'placeholder': ''
    });
}


function limpiarCamposModalSecundaria() {
    // Limpiar campos de provincia y cantón
    $('#provinciasSecudaria').val('null');
    $('#cantonesSecundaria').val('null');

    // Limpiar campo de institución
    $('#institutoSecundaria').val('');

    // Limpiar campos de fecha de inicio y fin
    $('#fechaInicioSecundaria').val('');
    $('#fechaFinSecundaria').val('');

    // Limpiar campo de foto
    // Ten en cuenta que, por razones de seguridad, no puedes establecer el valor de un campo de tipo 'file'
    // Para limpiarlo, puedes establecer un nuevo valor como una cadena vacía (aunque no puedes establecer el valor real del archivo).
    $('#fotoTituloSecundaria').val('');

    // Restablecer el formulario si es necesario
    // $('#formAgregarTituloSecundaria')[0].reset();
    // Limpiar la vista previa de la imagen
    $('.previewImage').attr('src', '').hide();

    if ($("#mensaje").length) {

        $("#mensaje").remove();

    }
}
function limpiarCamposDiploma() {
    // Limpiar campos de institución y carrera
    $('#institutoDiploma').val('');
    $('#carrerasDiploma').val('');

    // Limpiar campos de fecha de inicio y fin
    $('#fechaInicioDiploma').val('');
    $('#fechaFinDiploma').val('');

    // Limpiar campos de tomo, folio y asiento
    $('#tomoDiploma').val('');
    $('#folioDiploma').val('');
    $('#asientoDiploma').val('');

    // Limpiar campo de foto
    $('#fotoTituloDiploma').val('');

    // Ocultar la imagen de vista previa
    $('.previewImage').hide();

    // Restablecer el formulario si es necesario
    // $('#formAgregarTituloDiploma')[0].reset();
}




function limpiarCamposModalUniversitario() {
    // Limpiar campos de texto
    $('#formAgregarTituloUniversitario input[type="text"]').val('');

    // Limpiar campos de selección
    $('#formAgregarTituloUniversitario select').val('');

    // Limpiar campo de carga de archivos
    $('#formAgregarTituloUniversitario input[type="file"]').val('');

    // Ocultar la vista previa de la imagen
    $('#formAgregarTituloUniversitario .previewImage').hide();

    // Limpiar la vista previa de la imagen
    $('.previewImage').attr('src', '').hide();

    if ($("#mensaje").length) {

        $("#mensaje").remove();

    }
}




//funcion para mostrar vista previa de la imagen elegida
function previewImage(input, cropper) {
    var preview = $('#previewImage');

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            preview.attr('src', e.target.result).show();

            // Inicializa Cropper.js
            cropper = new Cropper(document.getElementById('previewImage'), {
                zoomable: false,
                scalable: false,
                aspectRatio: 1, // Puedes ajustar esto según tus necesidades
            });
        };

        reader.readAsDataURL(input.files[0]);
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


function CargarGradosUniversitarios() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/CargarGrados");

    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {


            // Obtener el elemento select
            var selectGrados = $('#nivelEducacionUniversitaria');

            // Limpiar opciones existentes
            selectGrados.empty();

            // Iterar sobre la lista de instituciones y agregar opciones al select
            $.each(data, function (index, grado) {
                if (grado.id != 1 && grado.id != 2) {
                    selectGrados.append('<option value="' + grado.id + '">' + grado.gradoAcademico + '</option>');
                }

            });

        },
        error: function (error) {
            console.log(error);
        }
    });

}

function CargarUniversidades() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/MostrarUniversidades");

    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {


            // Obtener el elemento select
            var selectInstitutos = $('.universidades');

            // Limpiar opciones existentes
            selectInstitutos.empty();
            selectInstitutos.append('<option value="0">' + "Seleccione un opción" + '</option>');


            // Iterar sobre la lista de instituciones y agregar opciones al select
            $.each(data, function (index, institucion) {
                selectInstitutos.append('<option value="' + institucion.id_universidad + '">' + institucion.siglas_universidad + '</option>');
            });


        },
        error: function (error) {
            console.log(error);
        }
    });
}





function CargarCarrerasUniversitarias() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/MostrarCarreras");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            instituto: $("#institutoUniversitario").find(":selected").text(),
            grado: $("#nivelEducacionUniversitaria").find(":selected").text()
        },
        success: function (data) {


            // Obtener el elemento select
            var selectCarreras = $('#carrerasUniversitarias');

            // Limpiar opciones existentes
            selectCarreras.empty();

            // Iterar sobre la lista de instituciones y agregar opciones al select
            $.each(data, function (index, carreras) {

                selectCarreras.append('<option value="' + carreras + '">' + carreras + '</option>');
            });


        },
        error: function (error) {
            console.log(error);
        }
    });
}


function CargarCarrerasDiplomas() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/MostrarCarreras");

    $.ajax({
        type: "GET",
        url:url,
        data: {
            instituto: $("#institutoDiploma").find(":selected").text(),
            grado: "Diplomado"
        },
        success: function (data) {


            // Obtener el elemento select
            var selectCarreras = $('#carrerasDiploma');

            // Limpiar opciones existentes
            selectCarreras.empty();

            // Iterar sobre la lista de instituciones y agregar opciones al select
            $.each(data, function (index, carreras) {

                selectCarreras.append('<option value="' + carreras + '">' + carreras + '</option>');
            });


        },
        error: function (error) {
            console.log(error);
        }
    });
}

function ActualizarTituloSecundria(idTitulo) {
    // Obtener el formulario y los datos del formulario
    var form = $("#formAgregarTituloSecundaria")[0];
    var formData = new FormData(form);

    // Agregar identificacion y clave al formData
    formData.append("identificacion", $("#identification").val());
    formData.append("clave", $("#clave").val());
    formData.append("idTitulo", idTitulo);


    let url = ObtenerUrlSolicitud('Oferente', "Oferente/ActualizarTituloSecundaria");

    $.ajax({
        method: "POST",//tipo de solicitud
        url: url,
        data: formData,
        processData: false,  // Necesario para enviar FormData correctamente
        contentType: false,  // Necesario para enviar FormData correctamente
        success: function (data) {//en caso de que sale bien

            if (data.error) { //si data.error contiene algo

                if ($("#mensaje").length) {

                    $("#mensaje").remove();

                    $(".actualizarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                }
                else {
                    $(".actualizarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                }



            }
            else {

                ///recargar la lista de titulos

                // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de títulos

                CargarTitulos(1);
                $('#agregarTituloSecundariaModal').modal('hide');
                alert("Titulo actualizado exitosamente");
            }
        },

        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}



function ActualizarTituloUniversitario(idTitulo) {
    // Obtener el formulario y los datos del formulario
    var form = $("#formAgregarTituloUniversitario")[0];
    var formData = new FormData(form);

    // Agregar identificacion y clave al formData
    formData.append("identificacion", $("#identification").val());
    formData.append("clave", $("#clave").val());
    formData.append("idTitulo", idTitulo);


    let url = ObtenerUrlSolicitud('Oferente', "Oferente/ActualizarTituloUniversitario");

    $.ajax({
        method: "POST",//tipo de solicitud
        url: url,
        data: formData,
        processData: false,  // Necesario para enviar FormData correctamente
        contentType: false,  // Necesario para enviar FormData correctamente
        success: function (data) {//en caso de que sale bien

            if (data.error) { //si data.error contiene algo

                if ($("#mensaje").length) {

                    $("#mensaje").remove();

                    $(".actualizarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                }
                else {
                    $(".actualizarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                }



            }
            else {

                ///recargar la lista de titulos

                // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de títulos

                CargarTitulos(2);
                $('#agregarTituloUniversitarioModal').modal('hide');
                alert("Titulo actualizado exitosamente");
            }
        },

        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}




function ActualizarTituloDiploma(idTitulo) {
    // Obtener el formulario y los datos del formulario
    var form = $("#formAgregarTituloDiploma")[0];
    var formData = new FormData(form);

    // Agregar identificacion y clave al formData
    formData.append("identificacion", $("#identification").val());
    formData.append("clave", $("#clave").val());
    formData.append("idTitulo", idTitulo);
    formData.append("nivelEducacion", "2");

    let url = ObtenerUrlSolicitud('Oferente', "Oferente/ActualizarTituloUniversitario");

    $.ajax({
        method: "POST",//tipo de solicitud
        url: url,
        data: formData,
        processData: false,  // Necesario para enviar FormData correctamente
        contentType: false,  // Necesario para enviar FormData correctamente
        success: function (data) {//en caso de que sale bien

            if (data.error) { //si data.error contiene algo

                if ($("#mensaje").length) {

                    $("#mensaje").remove();

                    $(".actualizarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                }
                else {
                    $(".actualizarTitulo").before("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                }



            }
            else {

                ///recargar la lista de titulos

                // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de títulos

                CargarTitulos(3);
                $('#agregarTituloDiplomaModal').modal('hide');
                alert("Titulo actualizado exitosamente");
            }
        },

        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}



function MostrarTitulo(identificacion, idTitulo) {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/ObtenerUrlTitulo");

    $.ajax({
        url: url,  // Reemplaza con la URL correcta de tu controlador
        type: 'GET',
        data: {
            identificacion: identificacion,
            idTitulo: idTitulo
        },
        success: function (data) {

            if (data.urlImagen) {
                // Configuración de OpenSeaDragon


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





////////////////        FUNCIONES PAGINA DATOS PERSONALES ////////////////////

function AgregarMascarasPaginaDatosPersonales() {
    // Aplicar la máscara al campo de fecha de inicio
    $('#nacimiento').inputmask('99/99/9999', { placeholder: 'dd/mm/yyyy' });

    // Escuchar al evento de foco en el campo
    $('#nacimiento').on('focus', function () {
        // Limpiar el valor para permitir cambios
        $(this).val('');
    });

    Inputmask({ mask: '9999-9999' }).mask($('#telefonoOpcional'));


}



function ObtenerDatosPersonales() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/ObtenerDatosPersonalesEx");

    $.ajax({
        type: "Get",//tipo de solicitud
        url: url,
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
                    var nacimiento = partesFecha[0].split('-');
                    $("#nacimiento").val((nacimiento != null) ? nacimiento[2] + "/" + nacimiento[1] + "/" + nacimiento[0] : "");

                }



                var provincia = data.idProvincia;
                var canton = data.idCanton;
                var distrito = data.idDistrito;
                var direccion = data.direccion;
                var genero = data.genero;
                var correoOpcional = data.correoOpcional;
                var telefonoOpcional = data.telefonoOpcional;





                //asignar los valores a los inputs

                $("#direccion").val((direccion != null) ? direccion : "");
                $("#genero").val((genero != 0) ? genero : 0);
                $("#correoOpcional").val((correoOpcional != null) ? correoOpcional : "");
                $("#telefonoOpcional").val((telefonoOpcional != null) ? telefonoOpcional : "");




                CargarDatosUbicaciones(provincia, canton, distrito);





            }
        },
        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}


function CargarIdiomasOferente() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/MostrarIdiomaLista");

    $.ajax({
        type: "Get",
        url: url,
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

function ActualizarDatosPersonales() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/GuardarCambiosDatosPersonalesEx");

    var formData = new FormData($("#expedienteForm")[0]);
    $.ajax({
        type: "Post",//tipo de solicitud
        url: url,
        data: formData,
        processData: false,
        contentType: false,
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
}

function MostrarIdiomasOferente() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/MostrarIdiomaLista");

    $.ajax({
        type: "Get",
        url: url,
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

function MostrarGruposProfesionalesOferente() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/CargarGrupoProfesionalOferente");

    $.ajax({
        type: "Get",
        url: url,
        data: {
            identificacion: $("#identification").val(),
            clave: $("#clave").val()
        },
        success: function (data) {
            //recargar titulos

            procesarRespuestaGruposProfesionales(data);
        },
        error: function (error) {
            console.log("Error al cargar los grupos: " + error);
        }
    });
}

function AñadirGrupoProfesional() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/AñadirGrupoProfesionalExpediente");

    $.ajax({
        type: "POST",
        url: url,
        data: {
            identificacion: $("#identification").val(),
            idGrupoProf: $("#grupoProfesional").val()
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
                MostrarGruposProfesionalesOferente();
            }


        },
        error: function (error) {
            console.log(error);
        }
    });
}


function AñadirIdioma() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/AñadirIdiomaExpediente");

    $.ajax({
        type: "POST",
        url: url,
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
                MostrarIdiomasOferente();
            }


        },
        error: function (error) {
            console.log(error);
        }
    });
}

function EliminarIdiomaOferente(idIdioma) {


    // Muestra el modal de confirmación
    $("#confirmacionEliminarModalIdioma").modal("show");

    $("#confirmarEliminar").click(function (event) {
        let url = ObtenerUrlSolicitud('Oferente', "Oferente/EliminarIdioma");

        $.ajax({
            type: "POST",
            url: url,
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

                    MostrarIdiomasOferente();

                }
            },
            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });

    });
}



function EliminarGrupoProfesionalOferente(idGrupo) {


    // Muestra el modal de confirmación
    $("#confirmacionEliminarModalGrupo").modal("show");

    $("#confirmarEliminarGrupo").click(function (event) {
        let url = ObtenerUrlSolicitud('Oferente', "Oferente/EliminarGrupoProfesionalOferente");

        $.ajax({
            type: "POST",
            url: url,
            data: {
                idGrupoProf: idGrupo,
                identificacion: $("#identification").val()
            },
            success: function (data) {

                if (data.error) {
                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#listaGrupoProfesional").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                    }
                    else {
                        $("#listaGrupoProfesional").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                    }
                }
                else {
                    $("#confirmacionEliminarModalGrupo").modal("hide");

                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#listaGrupoProfesional").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Titulo eliminado exitosamente" + "</p>");
                    }
                    else {
                        $("#listaGrupoProfesional").after("<p class='alert alert-success mt-2' id='mensaje'>" + "Titulo eliminado exitosamente" + "</p>");

                    }


                    ///recargar la lista de titulos

                    // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de idiomas

                    MostrarGruposProfesionalesOferente();

                }
            },
            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });

    });
}


function SubirDimex() {
    // Obtener el formulario y los datos del formulario
    var form = $("#expedienteForm")[0];
    var formData = new FormData(form);
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/SubirImagenDimex");

    $.ajax({
        url: url,  // Reemplaza con la URL correcta de tu controlador
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


}


function SubirFotoPerfil() {
    // Obtener el formulario y los datos del formulario
    var form = $("#fotoPerfilExpediente")[0];
    var formData = new FormData(form);
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/SubirFotoPerfil");

    $.ajax({
        url: url,  // Reemplaza con la URL correcta de tu controlador
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


}

function mostrarFoto() {
    var inputFoto = $('#inputFotoPerfil')[0];
    var previewFoto = $('.previewFoto');
    var modal = $('#seleccionarFotoModal');

    if (inputFoto.files && inputFoto.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            previewFoto.attr('src', e.target.result);
            previewFoto.css('display', 'block');

            // Ajusta el tamaño del modal
            modal.find('.modal-dialog').css('max-width', '65%');
        }


        reader.readAsDataURL(inputFoto.files[0]);
    }
}


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

//al dar click en el boton de agregar titulo se esconde el boton de actualizar que esta dentro del modal
function abrirModalAñadirTituloSecundaria() {
    $("#actualizarTituloSecundaria").hide();
    $("#agregarTituloSecundaria").show();


    //se muestran nuevamente los divs que se ocultan a la hora de actualizar
    $(".divUbicacionSecundaria").show();

    $("#divInstitutoSecundaria").show();
}




///////////////////////////   funciones seccion referencias //////////////////////


//recibe 1 para cargar referencia personal, 2 para profesional
function CargarReferencias(tipo) {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/CargarReferencias");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            identificacion: $("#identification").val(),
            clave: $("#clave").val(),
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


function MostrarEvaluacion(identificacion, idReferencia) {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/ObtenerUrlEvaluacion");

    $.ajax({
        url: url,  // Reemplaza con la URL correcta de tu controlador
        type: 'GET',
        data: {
            identificacion: identificacion,
            idReferencia: idReferencia
        },
        success: function (data) {

            if (data.urlImagen) {
                // Configuración de OpenSeaDragon


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

function AgregarReferencia() {
    // Obtener el formulario y los datos del formulario
    var form = $("#formAgregarReferencia")[0];
    var formData = new FormData(form);

    // Agregar identificacion y clave al formData
    formData.append("identificacion", $("#identification").val());
    formData.append("clave", $("#clave").val());

    let url = ObtenerUrlSolicitud('Oferente', "Oferente/AgregarReferecia");
    $.ajax({
        method: "POST",//tipo de solicitud
        url: url,
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

                ///recargar la lista de referencias

                // Después de guardar, realiza una solicitud Ajax para obtener la lista actualizada de referencias

                //tipo referencia guarda 1 si es personal, 2 si es profesional
                if ($("#tipoReferencia").val() == "1") {

                    CargarReferencias(1);



                } else {
                    //cargar referencias profesionales de la persona
                    CargarReferencias(2);

                }


            }
        },

        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}

function EliminarReferencia(idReferencia) {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/EliminarReferencia");

    $.ajax({
        type: "POST",
        url: url,
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

                CargarReferencias(1);


            }
        },
        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}




//////  funciones seccion experiencias  /////////////////////

function CargarExperiencias() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/CargarExperiencias");

    $.ajax({
        type: "GET",
        url: url,
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

function EliminarExperiencia(idExperiencia) {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/EliminarExperiencia");

    $.ajax({
        type: "POST",
        url: url,
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
                CargarExperiencias();



            }
        },
        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}




function MostrarExperiencia(identificacion, idExperiencia) {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/ObtenerUrlExperiencia");

    $.ajax({
        url: url,  // Reemplaza con la URL correcta de tu controlador
        type: 'GET',
        data: {
            identificacion: identificacion,
            idExperiencia: idExperiencia
        },
        success: function (data) {

            if (data.urlImagen) {
                // Configuración de OpenSeaDragon


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