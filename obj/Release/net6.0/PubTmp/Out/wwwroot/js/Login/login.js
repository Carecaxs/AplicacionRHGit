
$(document).ready(function () {
    var identificationField = $("#identification");//input donde se pone la identificacion
    $("#identificationType").change(function () {//al cambiar de seleccion en el campo tipo de cedula se aplica una diferente mascara segun su selección
        var selectedType = $(this).val();
        var mask = "";
        $("#identification").val('');

        if (selectedType === "null") {
            identificationField.prop("disabled", true); // Deshabilitar el campo
        } else {
            identificationField.prop("disabled", false); // habilitar el campo
        }

        if (selectedType === "Cedula") {
            mask = "99-9999-9999";


        } else if (selectedType === "Dimex") {
            mask = "99-999999-9999";

        } else if (selectedType === "Pasaporte") {
            mask = "a999999";

        }


        $("#identification").inputmask({ mask: mask });

    });


    identificationField.on("input", function () {
        // Escuchar el evento "input" en el campo de identificación
        var inputValue = identificationField.val();

        var selectedType = $("#identificationType").val();//aceder al valor de tipo de identificacion

        if (selectedType === "Cedula") {

            // Verificar si no comienza con "0" y no está vacío
            if (inputValue && inputValue.charAt(0) !== "0") {
                // Agregar un "0" al principio
                identificationField.val("0" + inputValue);
                // Posicionar el cursor en el tercer carácter
                identificationField[0].setSelectionRange(2, 2);
            }

        }


    });




    // Manejador de evento para mostrar/ocultar la contraseña
    $("#showPassword").click(function () {
        var passwordField = $("#password");
        var type = passwordField.attr("type");
        if (type === "password") {
            passwordField.attr("type", "text");
            $(this).text("Ocultar contraseña");
        } else {
            passwordField.attr("type", "password");
            $(this).text("Mostrar contraseña");
        }
    });


    if ($("#registroForm").length > 0) { //si esta en el documento de creacion de perfil

        // Aplicar la máscara al campo de teléfono
        $('#telefono').inputmask('9999-9999');

        esconderForm();

        $("#identificationType").change(function () {

            LimpiarCampos();

            // Obtener el valor seleccionado en el campo identificationType
            var selectedIdentificationType = $(this).val();

            // Habilitar o deshabilitar el campo de identificación según la opción seleccionada
            if (selectedIdentificationType === "Dimex" || selectedIdentificationType === "Pasaporte") {
                // Habilitar el campo de identificación
                mostrarForm();

                // habilitar campos
                $("#nombre").prop("disabled", false);
                $("#apellidos").prop("disabled", false);
                $("#btnVerificarCedula").hide();

            } else {
                // Deshabilitar campos

                $("#nombre").prop("disabled", true);
                $("#apellidos").prop("disabled", true);
                esconderForm();
                $("#btnVerificarCedula").show();

            }


            if ($("#msjValidacionCedula").length) {
                // Si existe, elimina el elemento
                $("#msjValidacionCedula").remove();
            }


        });






        //cargar provincias
        // URL de tu API que devuelve las provincias
        //var apiProvincia = "https://www.apprh.somee.com/api/Ubicaciones/Provincias";

        //// Elemento <select> de provincias
        //var provinciasDropdown = $("#provincias");
        //var cantonesDropdown = $("#cantones");
        //var distritosDropdown = $("#distritos");



        // Realiza una solicitud GET a la API
        //fetch(apiProvincia)
        //    .then(response => {
        //        if (!response.ok) {
        //            throw new Error('No se pudo obtener las provincias.');
        //        }
        //        return response.json();
        //    })
        //    .then(data => {
        //        console.log(data);

        //        // Llena el ComboBox con las provincias recibidas de la API
        //        data.forEach(provincia => {
        //            provinciasDropdown.append($("<option>").val(provincia.idProvincia).text(provincia.nombreProvincia));
        //        });
        //    })
        //    .catch(error => {
        //        console.error(error);
        //    });


    }


    //$("#provincias").change(function () {
    //    if ($("#provincias").val() != "null") {//verificar que la opcion no sea "seleccione una provincia"

    //        //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
    //        // Elimina todas las opciones excepto la primera (índice 0)
    //        $("#cantones").find("option:not(:first)").remove();
    //        $("#distritos").find("option:not(:first)").remove();

    //        var idProvincia = $("#provincias").val();//agarrar el id de la provincia elegida

    //        const apiCanton = 'https://www.apprh.somee.com/api/Ubicaciones/Cantones/';

    //        fetch(apiCanton + (idProvincia))
    //            .then(response => {
    //                if (!response.ok) {
    //                    throw new Error('No se pudo obtener los cantones.');
    //                }
    //                return response.json();
    //            })
    //            .then(data => {
    //                console.log(data);

    //                // Llena el ComboBox con los cantones recibidos de la API
    //                data.forEach(cantones => {
    //                    cantonesDropdown.append($("<option>").val(cantones.idCanton).text(cantones.nombreCanton));
    //                });
    //            })
    //            .catch(error => {
    //                console.error(error);
    //            });
    //    }
    //    else {
    //        //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
    //        // Elimina todas las opciones excepto la primera (índice 0)
    //        $("#cantones").find("option:not(:first)").remove();
    //        $("#distritos").find("option:not(:first)").remove();



    //    }

    //});


    //evento al cambiar de seleccion en cantones
    //$("#cantones").change(function () {

    //    //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
    //    // Elimina todas las opciones excepto la primera (índice 0)
    //    $("#distritos").find("option:not(:first)").remove();

    //    var idCanton = $("#cantones").val();//agarrar el id del cannton elegido

    //    const apiDistrito = 'https://www.apprh.somee.com/api/Ubicaciones/Distritos/';

    //    fetch(apiDistrito + (idCanton))
    //        .then(response => {
    //            if (!response.ok) {
    //                throw new Error('No se pudo obtener los distritos.');
    //            }
    //            return response.json();
    //        })
    //        .then(data => {
    //            console.log(data);

    //            // Llena el ComboBox con los cantones recibidos de la API
    //            data.forEach(distritos => {
    //                distritosDropdown.append($("<option>").val(distritos.idDistrito).text(distritos.nombreDistrito));
    //            });
    //        })
    //        .catch(error => {
    //            console.error(error);
    //        });

    //});



    // Detectar la pulsación de la tecla "Enter" en el campo de entrada
    $("#identification").keypress(function (event) {
        if (event.keyCode === 13) { // 13 es el código de tecla para "Enter"
            event.preventDefault(); // Evita que se realice la acción predeterminada (enviar el formulario)
            $("#btnVerificarCedula").click(); // Desencadena el clic en el botón "Consultar"
        }
    });



    //evento click
    $("#btnVerificarCedula").click(function (event) {

        // Evitar la recarga de la página
        event.preventDefault();

        var identificacion = $("#identification").val();//obtener el valor de la cedula

        var tipoIdentificacionSeleccionado = $("#identificationType").val();//acceder al tipo de identificacion seleccionado

        $.ajax({
            type: "Get",//tipo de solicitud
            url: "/Login/GetPersona", //direccion del controlador
            data: {//se envia el parametro
                identificacion: identificacion,
                tipoIdentificacion: tipoIdentificacionSeleccionado
            },
            success: function (data) {//en caso de que sale bien

                if (data.error) { //si data.error contiene algo

                    if ($("#msjValidacionCedula").length) {

                        $("#msjValidacionCedula").remove();

                        $("#campoNombre").before("<p class='alert alert-danger mt-2' id='msjValidacionCedula'>" + data.error + "</p>");
                    }
                    else {
                        $("#campoNombre").before("<p class='alert alert-danger mt-2' id='msjValidacionCedula'>" + data.error + "</p>");

                    }



                } else {
      

                    if ($("#msjValidacionCedula").length) {

                        $("#msjValidacionCedula").remove();
                    }

                    //se muestra el boton de confirmar
                    $('#btnCrearUsuario').show();


                    // Actualizar el valor visual del campo #cedula
                    if ($("#identificationType").val() == "Cédula de Identidad") {
                        $("#identificacion").val(cedula.startsWith("0") ? identificacion : "0" + identificacion);// Verificar si la cédula tiene un 0 al inicio
                    }
                    else {
                        $("#identificacion").val(identificacion);

                    }
                    

                    // asignar valores a los inputs de la consulta
                    $("#nombre").val(data.nombre);
                    $("#apellidos").val(data.apellido1 + " " + data.apellido2);
/*                    $("#nacimiento").val(data.fechaNacimiento);*/

                    mostrarForm();




                }
            },
            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });
    });



    $("#btnCrearUsuario").click(function (event) {

        // Deshabilitar la acción predeterminada del formulario
        event.preventDefault();
    

        //comprobacion de que la cedula se mande bien
        if (!ComprobarIdentificacion()) {

            if ($("#msjFormulario").length) {

                $("#msjFormulario").remove();

                $("#campoTelefono").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Cédula incompleta" + "</p>");
            }
            else {
                $("#campoTelefono").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Cédula incompleta" + "</p>");

            }
            return;
        }

  


        //si todos estan completados
        if ($('#identification').val() != "" && $('#correo').val() != "" && $('#telefono').val() != "" && $('#nombre').val() != "" && $('#apellidos').val() != "") {

            //retorna true si se valida el correo y telefono
            if (validarCorreoTelefono()) {

                //si se encuentra un mensaje de error se elimina
                if ($("#msjFormulario").length) {

                    $("#msjFormulario").remove();

                }

                //obtener el valor si se accedio como oferente o reclutador 
                var contenidoH2 = $("#seccionInicioSesion").text();
                if (contenidoH2 == 'Registrarse como Oferente') {
                    var tipoUsuario = 'Oferente';
                }
                else {
                    var tipoUsuario = 'Reclutador';
                }

                // Dividir los apellidos en un array
                var apellidosArray = $('#apellidos').val().split(" ");

                //campos para crear usuario
                var usuario = {
                    identificacion: $('#identification').val().replace(/-/g, ""),
                    nombre: $('#nombre').val(),
                    apellido1: apellidosArray[0] || "",
                    apellido2: apellidosArray[1] || "",
                    correo: $('#correo').val(),
                    telefono: $('#telefono').val().replace("-", "")
                };


                $.ajax({
                    url: '/Login/AgregarUsuario',
                    method: 'POST',
                    data: {
                        usuario: usuario,
                        tipoUsuario: tipoUsuario
                    },
                    success: function (data) {



                        if (data.exitoso == true) {
                            // Si no hay error, muestra el mensaje de éxito en el modal

                            // Muestra el modal
                            $("#confirmacionModal").modal("show");

                            $("#contenidoModal").text("Se ha enviado un correo de confirmación. Por favor, verifica tu correo electrónico y sigue las instrucciones para activar tu cuenta.");
                        }
                        else {

                            $("#campoTelefono").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + data.error + "</p>");

                        }


                    },
                    error: function (xhr, status, error) { //error en la solicitud de ajax
                        console.error(error);
                    }
                });
            }




        }
        else {//si algun campo no esta completado se muestra un mensaje 

            if ($("#msjFormulario").length) {

                $("#msjFormulario").remove();

                $("#campoTelefono").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Debes de llenar todos los campos" + "</p>");
            }
            else {
                $("#campoTelefono").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Debes de llenar todos los campos" + "</p>");

            }



        }



    });


    // Espera a que el modal se cierre completamente
    $('#confirmacionModal').on('hidden.bs.modal', function () {
        // Redirige a la acción "Crear" del controlador "Login"
        window.location.href = '/MenuPrincipal/MenuAcceso';
    });



    $("#validarCodigo").click(function (event) {

        //se valida que el input donde se ingresa el codigo no este vacio
        if ($('#codigo').val() != "") {


            $.ajax({
                url: '/Login/ConfirmacionCuenta',
                method: 'GET',
                data: {
                    identificacion: $('#identificacion').val(),
                    codigo: $('#codigo').val(),
                    tipoUsuario: $('#tipoUsuario').val()

                },
                success: function (data) {

                    if (data.exitoso == true) {
                        //mostrar modal
                        $("#modalContraseña").modal("show");

                       
                    }
                    else {
                        if (data.mensaje) {
                            //mostrar mensaje error
                            if ($("#msjInformativo").length) {

                                $("#msjInformativo").remove();

                                $("#validarCodigo").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");
                            }
                            else {
                                $("#validarCodigo").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");

                            }
                        }
                        else {
                            //mostrar mensaje de excepcion
                            if ($("#msjInformativo").length) {

                                $("#msjInformativo").remove();

                                $("#validarCodigo").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");
                            }
                            else {
                                $("#validarCodigo").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");

                            }

                        }
                    }
                },
                error: function (xhr, status, error) { //error en la solicitud de ajax
                    console.error(error);
                }
            });



        }
        else {
            if ($("#msjInformativo").length) {

                $("#msjInformativo").remove();

                $("#validarCodigo").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + "Debes de ingresar el código" + "</p>");
            }
            else {
                $("#validarCodigo").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + "Debes de ingresar el código" + "</p>");

            }
        }

    });

    $("#guardarContraseña").click(function () {
        //acciones para guardar la contraseña

        //comprobar que no este vacio el input de clave
        if ($('#contraseña1').val() != "" && $('#contraseña2').val() != "") {

            if ($('#contraseña1').val() == $('#contraseña2').val()) {//se combrueba que sea igual

                $.ajax({
                    url: '/Login/GuardarContraseña',
                    method: 'POST',
                    data: {
                        identificacion: $('#identificacion').val(),
                        clave: $('#contraseña1').val(),
                        tipoUsuario: $('#tipoUsuario').val()

                    },
                    success: function (data) {

                        if (data.exitoso == true) {


                            // Obtener el tipo de usuario del campo oculto o de donde sea necesario
                            var tipoUsuario = $('#tipoUsuario').val();

                            // Construir la URL de destino en función del tipo de usuario                         
                            if ($('#tipoUsuario').val() == 'Reclutador') {
                                var url = '/Reclutador/nombreVista';
                            }
                            else {
                                var url = '/Oferente/MenuPrincipalOferente';
                            }

                            // Agregar los parámetros a la URL
                            url += '?identificacion=' + encodeURIComponent($('#identificacion').val());

                            // Redirigir a la URL construida
                            window.location.href = url;


                            //cierra el modal
                            $("#modalContraseña").modal("hide");
                        }
                        else {
                            console.log("algo salio mal")

                            if (data.mensaje) {
                               
                                if ($("#msjInformativo").length) {

                                    $("#msjInformativo").remove();

                                    $("#contraseña2").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");
                                }
                                else {
                                    $("#contraseña2").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");

                                }
                            }
                        }


                    },
                    error: function (xhr, status, error) { //error en la solicitud de ajax
                        console.error(error);
                    }


                })
            }
            else {
                if ($("#msjInformativo").length) {

                    $("#msjInformativo").remove();

                    $("#contraseña2").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + "Las contraseñas no coinciden" + "</p>");
                }
                else {
                    $("#contraseña2").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + "Las contraseñas no coinciden" + "</p>");

                }
            }

           

        }




    });

    $("#cerrarModalContraseña").click(function (event) {

        //limpiar inputs
        $('#contraseña1').val("");
        $('#contraseña2').val("");

        if ($("#msjInformativo").length) {

            $("#msjInformativo").remove();
        }
      

        $.ajax({
            url: '/Login/CambiarVerificadoFalse',
            method: 'POST',
            data: {
                identificacion: $('#identificacion').val(),
                tipoUsuario: $('#tipoUsuario').val()
            },
            success: function (data) {

                if (data.mensaje) {
                    if ($("#msjInformativo").length) {

                        $("#msjInformativo").remove();

                        $("#validarCodigo").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");
                    }
                    else {
                        $("#validarCodigo").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");

                    }
                }

                $("#codigo").val("");


            },
            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });
    });



    $("#btnRegresar").click(function (event) {
        event.preventDefault();

        var nombreVista = $("#nombreVista").val();

        if (nombreVista === "Ingresar") {
            window.location.href = '/MenuPrincipal/MenuAcceso';
        }
        else if (nombreVista === "Crear") {
            window.location.href = '/Login/Ingresar?tipoUsuario=' + $("#tipoUsuario").val();
        }

    });

    $("#restablecerClave").click(function (event) {

        //validar que el campo correo no este vacio
        if ($("#correo").val() != "") {

            $.ajax({
                type: "POST",
                url: "/Login/OlvidarContraseña",
                data: {
                    correo: $("#correo").val(),
                    tipoUsuario: $("#tipoUsuario").val()
                },
                success: function (data) {

                    if (data.error) {

                        if ($("#msjInformativo").length) {

                            $("#msjInformativo").remove();

                            $("#correo").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.error + "</p>");
                        }
                        else {
                            $("#correo").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.error + "</p>");

                        }
                    }
                    else {
                        if ($("#msjInformativo").length) {

                            $("#msjInformativo").remove();

                            $("#correo").after("<p class='alert alert-success mt-2' id='msjInformativo'>" + "Se ha enviado al correo un link para restablecer la contraseña" + "</p>");
                        }
                        else {
                            $("#correo").after("<p class='alert alert-success mt-2' id='msjInformativo'>" + "Se ha enviado al correo un link para restablecer la contraseña" + "</p>");

                        }


                    }

                },
                error: function (xhr, status, error) { //error en la solicitud de ajax
                    console.error(error);
                }
            });
        }
        else {
            if ($("#msjInformativo").length) {

                $("#msjInformativo").remove();

                $("#correo").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + "Debes de ingresar un correo" + "</p>");
            }
            else {
                $("#correo").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + "Debes de ingresar un correo" + "</p>");

            }
        }



    });



    $("#cerrarModalRestablecerClave").click(function (event) {

        //cerrar modal
        $("#olvideContrasenaModal").modal("hide");
    });

    $("#abrirModalRestablecerClave").click(function (event) {

        //abrir modal
        $('#olvideContrasenaModal').modal('show');

    });



    //si esta en la vista de verificar clave al cargar el documento se va mostrar el modal
    if ($("#nombreVista").val() == "Restablecer Clave") {

        //configurar para que sea estatico
        $('#cambiarContrasenaModal').modal({
            backdrop: 'static',
            keyboard: false
        });

        //mostrar modal
        $('#cambiarContrasenaModal').modal('show');
    }



    //AL DAR CLICK EN EL BOTON DE CONFIRMAR LA NUEVA CLAVE AL ACCEDER EN LA PAGINA DE RESTABLECER CLAVE
    $("#confirmarClaveNueva").click(function (event) {


        //comprobar que no este vacio el input de clave
        if ($('#clave1').val() != "" && $('#clave2').val() != "") {

            if ($('#clave1').val() == $('#clave2').val()) {//se combrueba que sea igual

                $.ajax({
                    url: '/Login/GuardarContraseña',
                    method: 'POST',
                    data: {
                        identificacion: $('#identificacion').val(),
                        clave: $('#clave1').val(),
                        tipoUsuario: $('#tipoUsuario').val()

                    },
                    success: function (data) {

                        if (data.exitoso == true) {
                            console.log("todo salio bien")
                            //////////////////aca me debe de redirigir a la cuenta del usuario///////////////////////////

                            // Obtener el tipo de usuario del campo oculto o de donde sea necesario
                            var tipoUsuario = $('#tipoUsuario').val();

                            // Construir la URL de destino en función del tipo de usuario                         
                            if ($('#tipoUsuario').val() == 'Reclutador') {
                                var url = '/Reclutador/nombreVista';
                            }
                            else {
                                var url = '/Oferente/MenuPrincipalOferente';
                            }

                            // Agregar los parámetros a la URL
                            url += '?identificacion=' + encodeURIComponent($('#identificacion').val());

                            // Redirigir a la URL construida
                            window.location.href = url;
               

                        }
                        else {
                            if (data.mensaje) {

                                if ($("#msjInformativo").length) {

                                    $("#msjInformativo").remove();

                                    $("#clave2").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");
                                }
                                else {
                                    $("#clave2").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");

                                }
                            }
                        }


                    },
                    error: function (xhr, status, error) { //error en la solicitud de ajax
                        console.error(error);
                    }


                })
            }
            else {
                if ($("#msjInformativo").length) {

                    $("#msjInformativo").remove();

                    $("#clave2").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + "Las contraseñas no coinciden" + "</p>");
                }
                else {
                    $("#clave2").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + "Las contraseñas no coinciden" + "</p>");

                }
            }



        }
    });




    //INICIO DE SESION
    $("#btnIniciarSesion").click(function (event) {
        event.preventDefault();

        //se verifica que se hayan datos en los inputs
        if ($("#identification").val() != "" && $("#password").val() != "") {

            identificacion = $('#identification').val().replace(/-/g, "");

            $.ajax({
                url: '/Login/IniciarSesion',
                method: 'Get',
                data: {
                    identificacion: identificacion,
                    clave: $('#password').val(),
                    tipoUsuario: $('#tipoUsuario').val()

                },
                success: function (data) {

                    if (data.exitoso == true) {
                        console.log("todo salio bien")
                        //////////////////aca me debe de redirigir a la cuenta del usuario///////////////////////////

                        // Obtener el tipo de usuario del campo oculto o de donde sea necesario
                        var tipoUsuario = $('#tipoUsuario').val();

                        // Construir la URL de destino en función del tipo de usuario                         
                        if ($('#tipoUsuario').val() == 'Reclutador') {
                            var url = '/Reclutador/nombreVista';
                        }
                        else {
                            var url = '/Oferente/MenuPrincipalOferente';
                        }

                        // Agregar los parámetros a la URL
                        url += '?identificacion=' + encodeURIComponent(identificacion);

                        // Redirigir a la URL construida
                        window.location.href = url;


                    }
                    else {
                        if (data.mensaje) {

                            if ($("#msjInformativo").length) {

                                $("#msjInformativo").remove();

                                $("#btnIniciarSesion").before("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");
                            }
                            else {
                                $("#btnIniciarSesion").before("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");

                            }
                        }
                    }


                },
                error: function (xhr, status, error) { //error en la solicitud de ajax
                    console.error(error);
                }


            })

        } else {
            //si alguno de los campos esta vacio
            if ($("#msjInformativo").length) {

                $("#msjInformativo").remove();

                $("#btnIniciarSesion").before("<p class='alert alert-danger mt-2' id='msjInformativo'>" + "Debes de llenar los campos" + "</p>");
            }
            else {
                $("#btnIniciarSesion").before("<p class='alert alert-danger mt-2' id='msjInformativo'>" + "Debes de llenar los campos" + "</p>");

            }
        }
    });


    

});





function esconderForm() {
    $("#campoNombre").hide();//ocultar elemento que muestra el nombre
    $("#campoApellidos").hide();//ocultar elemento que muestra los apellidos
    $("#campoCorreo").hide();
    $("#campoTelefono").hide();
    //$("#campoProvincia").hide();
    //$("#campoCantones").hide();
    //$("#campoDistritos").hide();
    //$("#campoNacimiento").hide();
    //$("#campoDireccion").hide();
    $('#btnCrearUsuario').hide();
}

function mostrarForm() {
    $("#campoNombre").show();//mostrar elemento que muestra el nombre
    $("#campoApellidos").show();//mostrar elemento que muestra los apellidos
    $("#campoCorreo").show();
    $("#campoTelefono").show();
    //$("#campoProvincia").show();
    //$("#campoCantones").show();
    //$("#campoDistritos").show();
    //$("#campoNacimiento").show();
    //$("#campoDireccion").show();
    $('#btnCrearUsuario').show();

}

function validarCorreo(){

    var correo = $("#correo").val();

    // Expresión regular para validar el formato de correo
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Devuelve true si el correo es válido, de lo contrario, devuelve false
    return regexCorreo.test(correo);
}


function validarTelefono() {
    var telefono = $("#telefono").val();
    var regexTelefono = /^\d{4}-\d{4}$/;

    // Devuelve true si el teléfono es válido, de lo contrario, devuelve false
    return regexTelefono.test(telefono);
}


//retorna falso si esta incorrecto el correo o telefono
function validarCorreoTelefono() {
    if (!validarCorreo() && !validarTelefono()) {
        if ($("#msjFormulario").length) {

            $("#msjFormulario").remove();

            $("#btnCrearUsuario").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Formato de correo y teléfono icorrecto" + "</p>");
        }
        else {
            $("#btnCrearUsuario").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Formato de correo y teléfono icorrecto" + "</p>");

        }
        return false;

    }
    else if (!validarCorreo()) {
        if ($("#msjFormulario").length) {

            $("#msjFormulario").remove();

            $("#btnCrearUsuario").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Formato de correo icorrecto" + "</p>");
        }
        else {
            $("#btnCrearUsuario").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Formato de correo icorrecto" + "</p>");

        }
        return false;
    }
    else if (!validarTelefono()) {
        if ($("#msjFormulario").length) {

            $("#msjFormulario").remove();

            $("#btnCrearUsuario").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Formato de teléfono icorrecto" + "</p>");
        }
        else {
            $("#btnCrearUsuario").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Formato de teléfono icorrecto" + "</p>");

        }
        return false;

    }
    else {
        return true;
    }
}


function LimpiarCampos() {
    $("#identification").val('');
    $("#nombre").val('');
    $("#apellidos").val('');
    $("#correo").val('');
    $("#telefono").val('');
}


function ComprobarIdentificacion() {

    var identificationType = $('#identificationType').val();
    var identificationValue = $('#identification').val().replace(/-/g, "");

    if (identificationType === 'Cedula') {
        // Validar que la cédula tenga 10 números
        if (/^\d{10}$/.test(identificationValue)) {
            console.log("true");
            return true;
        } else {
            console.log("false");
            return false;

        }
    } else if (identificationType === 'Dimex') {
        // Validar que el DIMEX tenga la longitud deseada (ajusta según tus requisitos)
        if (identificationValue.length === 12) {
            console.log("true");
            return true;
        } else {
            console.log("false");
            return false;

        }
    } else if (identificationType === 'Pasaporte') {
        // Validar que el pasaporte tenga la longitud deseada (ajusta según tus requisitos)
        if (identificationValue.length >= 6 && identificationValue.length <= 12) {
            console.log("true");
            return true;
        } else {
            console.log("false");
            return false;
 
        }
    } 

}

