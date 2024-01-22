
$(document).ready(function () {

    var identificationField = $("#identification");//input donde se pone la identificacion
    $("#identification").inputmask({ mask: "99-9999-9999" });



    identificationField.on("input", function () {



        var selectedType = $("#identificationType").val();//aceder al valor de tipo de identificacion

        if (selectedType === "Cedula") {
            MascaraCedula(identificationField);

        }


    });



    $("#identificationType").change(function () {//al cambiar de seleccion en el campo tipo de cedula se aplica una diferente mascara segun su selección
        $('#btnCrearUsuario').hide();
      
        var selectedType = $(this).val();
        var mask = "";
        $("#identification").val('');



        if (selectedType === "Cedula") {
            mask = "99-9999-9999";


        } else if (selectedType === "Dimex") {
            mask = "99-999999-9999";
        }
        $("#identification").inputmask({ mask: mask });
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

    if ($("#nombreVista").val() == "Ingresar") { //si esta en el documento de iniciar sesion

        $("#identification").focus();

    }



    if ($("#nombreVista").val() == "Crear") { //si esta en el documento de creacion de perfil
        $('#btnCrearUsuario').hide();

        $("#identification").focus();


        $("#campoVerificarDimex").hide();

        MascarasPaginaCrear();

        esconderForm();

        $("#identificationType").change(function () {

            LimpiarCampos();

            // Obtener el valor seleccionado en el campo identificationType
            var selectedIdentificationType = $(this).val();

            // Habilitar o deshabilitar el campo de identificación según la opción seleccionada
            if (selectedIdentificationType === "Dimex") {
                // Habilitar el campo de identificación
                mostrarForm();
                $('#sexo').val("1");
                $("#nacimiento").prop("disabled", false);
                $("#sexo").prop("disabled", false);
                $("#campoVerificarDimex").show();


                // habilitar campos
                $("#nombre").prop("disabled", false);
                $("#apellidos").prop("disabled", false);

                $("#btnVerificarCedula").hide();

            } else {
                $("#nacimiento").prop("disabled", true);
                $("#sexo").prop("disabled", true);
                $("#campoVerificarDimex").hide();

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

    }








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
     
        $("#loader-container").show();  // Muestra el modal de carga
     
        var identificacion = $("#identification").val();//obtener el valor de la cedula

        var tipoIdentificacionSeleccionado = $("#identificationType").val();//acceder al tipo de identificacion seleccionado
        CargarDatosPersona(identificacion, tipoIdentificacionSeleccionado);
        

    });


    $('#identification').on('keyup', function () {
        verificarCondiciones();
    });

    $('#correo').on('keyup', function () {
        verificarCondiciones();
    });

    $('#telefono').on('keyup', function () {
        verificarCondiciones();
    });

    $('#nombre').on('keyup', function () {
        verificarCondiciones();
    });

    $('#apellidos').on('keyup', function () {
        verificarCondiciones();
    });

    $('#dimex').on('keyup', function () {
        verificarCondiciones();
    });
    $('#nacimiento').on('keyup', function () {
        verificarCondiciones();
    });



    $("#btnCrearUsuario").click(function (event) {

        // Deshabilitar la acción predeterminada del formulario
        event.preventDefault();



        //comprobacion de que la cedula se mande bien
        if (!ComprobarIdentificacion()) {

            if ($("#msjFormulario").length) {

                $("#msjFormulario").remove();

                $("#botones").before("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Cédula incompleta" + "</p>");
            }
            else {
                $("#botones").before("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Cédula incompleta" + "</p>");

            }
            return;
        }




        //si todos estan completados
        // Dividir los apellidos en un array
        var apellidosArray = $('#apellidos').val().split(" ");
        if (apellidosArray.length == 2) {

            if ($('#identification').val() != "" && $('#correo').val() != "" && $('#telefono').val() != "" && $('#nombre').val() != "" && $('#apellidos').val() != ""
                && $('#sexo').val() != "") {

                //si se esta registrando con dimex hay que verificar que coincidan los dos campos donde tiene que digitar el dimex
                if ($("#identificationType").val() == "Dimex") {
                    if ($("#identification").val() != $("#campoVerificarDimex").val()) {

                        if ($("#msjFormulario").length) {

                            $("#msjFormulario").remove();

                            $("#botones").before("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Los campos Dimex no coinciden" + "</p>");
                        }
                        else {
                            $("#botones").before("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Los campos Dimex no coinciden" + "</p>");

                        }
                    }
                }
                //retorna true si se valida el correo y telefono
                if (validarCorreoTelefono()) {

                    //si se encuentra un mensaje de error se elimina
                    if ($("#msjFormulario").length) {

                        $("#msjFormulario").remove();

                    }

                    let tipoUsuario = $('#tipoUsuario').val();

                    //campos para crear usuario
                    var usuario = {
                        identificacion: $('#identification').val().replace(/-/g, ""),
                        nombre: $('#nombre').val(),
                        apellido1: apellidosArray[0] || "",
                        apellido2: apellidosArray[1] || "",
                        correo: $('#correo').val(),
                        telefono: $('#telefono').val().replace("-", ""),
                        sexo: $('#sexo').val(),
                        nacimiento: $('#nacimiento').val()
                    };

                    let url = ObtenerUrlSolicitud('Login', "Login/AgregarUsuario");
                    $.ajax({
                        url: url,
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


                            }
                            else {

                                $("#botones").before("<p class='alert alert-danger mt-2' id='msjFormulario'>" + data.error + "</p>");

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

                    $("#botones").before("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Debes de llenar todos los campos" + "</p>");
                }
                else {
                    $("#botones").before("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Debes de llenar todos los campos" + "</p>");

                }



            }
        }
        else {
            alert("Debes de ingresar los dos apellidos!!");
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

            let url = ObtenerUrlSolicitud('Login', "Login/ConfirmacionCuenta");
            $.ajax({
                url: url,
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
                let url = ObtenerUrlSolicitud('Login', "Login/GuardarContraseña");
                $.ajax({
                    url:url,
                    method: 'POST',
                    data: {
                        identificacion: $('#identificacion').val(),
                        clave: $('#contraseña1').val(),
                        tipoUsuario: $('#tipoUsuario').val()

                    },
                    success: function (data) {

                        if (data.exitoso == true) {


                            //////////////////aca me debe de redirigir a la cuenta del usuario///////////////////////////


                            // Obtener el tipo de usuario del campo oculto o de donde sea necesario
                            var tipoUsuario = $('#tipoUsuario').val();

                            //Construir la URL de destino en función del tipo de usuario                        
                            if (tipoUsuario == 'Reclutador') {
                                let url = ObtenerUrlSolicitud('Login', "Reclutador/MenuPrincipalReclutador");

                                var actionUrl = url;
                            }
                            else {
                                let url = ObtenerUrlSolicitud('Login', "Oferente/MenuPrincipalOferente");

                                var actionUrl = url;
                            }

                            // enviar el formulario
                            var form = $("#formGuardarContraseña");

                            //asignar la accion al formulario
                            form.prop('action', actionUrl);

                            form.submit();



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

        let url = ObtenerUrlSolicitud('Login', "Login/CambiarVerificadoFalse");

        $.ajax({
            url: url,
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
            let url = ObtenerUrlSolicitud('Login', "MenuPrincipal/MenuAcceso");

            window.location.href = url;
        }
        else if (nombreVista === "Crear") {
            let rutaController = 'Login/Ingresar?tipoUsuario=' + $("#tipoUsuario").val();
            let url = ObtenerUrlSolicitud('Login', rutaController);
            window.location.href = url;
        }

    });

    $("#restablecerClave").click(function (event) {

        //validar que el campo correo no este vacio
        if ($("#correo").val() != "") {

            let url = ObtenerUrlSolicitud('Login', "Login/OlvidarContraseña");

            $.ajax({
                type: "POST",
                url: url,
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

                let url = ObtenerUrlSolicitud('Login', "Login/GuardarContraseña");

                $.ajax({
                    url: url,
                    method: 'POST',
                    data: {
                        identificacion: $('#identificacion').val(),
                        clave: $('#clave1').val(),
                        tipoUsuario: $('#tipoUsuario').val()

                    },
                    success: function (data) {

                        if (data.exitoso == true) {

                            //////////////////aca me debe de redirigir a la cuenta del usuario///////////////////////////


                            // Obtener el tipo de usuario del campo oculto o de donde sea necesario
                            var tipoUsuario = $('#tipoUsuario').val();

                            //Construir la URL de destino en función del tipo de usuario                        
                            if (tipoUsuario == 'Reclutador') {

                                let url = ObtenerUrlSolicitud('Login', "Reclutador/MenuPrincipalReclutador");

                                var actionUrl = url;
                            }
                            else {
                                let url = ObtenerUrlSolicitud('Login', "Oferente/MenuPrincipalOferente");

                                var actionUrl = url;
                            }

                            // Tu lógica para enviar el formulario
                            var form = $("#formRestablecerClave");

                            //asignar la accion al formulario
                            form.prop('action', actionUrl);

                            form.submit();



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

            //verificar que el usuario exista

            let url = ObtenerUrlSolicitud('Login', "Login/IniciarSesion");

            $.ajax({
                url: url,
                method: 'Get',
                data: {
                    identificacion: identificacion,
                    clave: $('#password').val(),
                    tipoUsuario: $('#tipoUsuario').val()

                },
                success: function (data) {

                    if (data.exitoso == true) {

                        //////////////////aca me debe de redirigir a la cuenta del usuario///////////////////////////

                        // Obtener el tipo de usuario del campo oculto o de donde sea necesario
                        var tipoUsuario = $('#tipoUsuario').val();

                        //Construir la URL de destino en función del tipo de usuario                        
                        if (tipoUsuario == 'Reclutador') {
                            let url = ObtenerUrlSolicitud('Login', "Reclutador/MenuPrincipalReclutador");

                            var actionUrl = url;
                        }
                        else {
                            let url = ObtenerUrlSolicitud('Login', "Oferente/MenuPrincipalOferente");

                            var actionUrl = url;
                        }

                        // Tu lógica para enviar el formulario
                        var form = $("#formIngresar");

                        //asignar la accion al formulario
                        form.prop('action', actionUrl);

                        form.submit();



                    }
                    else {
                        if (data.mensaje) {

                            if ($("#msjInformativo").length) {

                                $("#msjInformativo").remove();

                                $("#btnIniciarSesion").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");
                            }
                            else {
                                $("#btnIniciarSesion").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + data.mensaje + "</p>");

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

                $("#btnIniciarSesion").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + "Debes de llenar los campos" + "</p>");
            }
            else {
                $("#btnIniciarSesion").after("<p class='alert alert-danger mt-2' id='msjInformativo'>" + "Debes de llenar los campos" + "</p>");

            }
        }
    });







});





function esconderForm() {
    $("#campoNombre").hide();//ocultar elemento que muestra el nombre
    $("#campoApellidos").hide();//ocultar elemento que muestra los apellidos
    $("#campoCorreo").hide();
    $("#campoTelefono").hide();
    $("#campoNacimiento").hide();
    $("#campoSexo").hide();

    console.log("hola");
}

function mostrarForm() {
    $("#campoNombre").show();//mostrar elemento que muestra el nombre
    $("#campoApellidos").show();//mostrar elemento que muestra los apellidos
    $("#campoCorreo").show();
    $("#campoTelefono").show();
    $("#campoNacimiento").show();
    $("#campoSexo").show();


}

function validarCorreo() {

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

            $("#botones").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Formato de correo y teléfono icorrecto" + "</p>");
        }
        else {
            $("#botones").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Formato de correo y teléfono icorrecto" + "</p>");

        }
        return false;

    }
    else if (!validarCorreo()) {
        if ($("#msjFormulario").length) {

            $("#msjFormulario").remove();

            $("#botones").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Formato de correo icorrecto" + "</p>");
        }
        else {
            $("#botones").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Formato de correo icorrecto" + "</p>");

        }
        return false;
    }
    else if (!validarTelefono()) {
        if ($("#msjFormulario").length) {

            $("#msjFormulario").remove();

            $("#botones").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Formato de teléfono icorrecto" + "</p>");
        }
        else {
            $("#botones").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + "Formato de teléfono icorrecto" + "</p>");

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
    $("#nacimiento").val('');
    $("#sexo").val('');

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

            return true;
        } else {

            return false;

        }
    }


}

// Función para cambiar el formato de fecha
function cambiarFormatoFecha(fechaEnFormatoOriginal) {
    // Dividir la cadena en mes, día y año

    var partes = fechaEnFormatoOriginal.split('/');

    // Crear una nueva cadena con el formato deseado
    var fechaEnNuevoFormato = partes[1] + '/' + partes[0] + '/' + partes[2];

    return fechaEnNuevoFormato;
}




function validarFechaNacimiento() {
    var nacimiento = $('#nacimiento').val();
    var regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;

    // Verificar si la fecha cumple con la máscara y contiene 8 dígitos en total
    if (regexFecha.test(nacimiento)) {
        return true;
    } else {
        return false;
    }
}


//funcion que detecta si todos los campos tienen contenido para mostrar boton de crear
function verificarCondiciones() {
    if (
        $('#identification').val() !== "" &&
        $('#correo').val() !== "" &&
        $('#telefono').val() !== "" &&
        $('#nombre').val() !== "" &&
        $('#apellidos').val() !== "" &&
        $('#sexo').val() !== "" &&
        validarFechaNacimiento()
    ) {
        $('#btnCrearUsuario').show();
    } else {
        $('#btnCrearUsuario').hide();
    }
}
function MascarasPaginaCrear() {
    // Aplicar la máscara al campo de teléfono
    $('#telefono').inputmask('9999-9999');
    $("#dimex").inputmask({ mask: "99-999999-9999" });
    $('#nacimiento').inputmask('99/99/9999', { placeholder: 'dd/mm/yyyy' });
}

function CargarDatosPersona(identificacion, tipoIdentificacionSeleccionado) {

  
    let url = ObtenerUrlSolicitud('Login', "Login/GetPersona");

    $.ajax({
        type: "Get",//tipo de solicitud
        url: url, //direccion del controlador
        data: {//se envia el parametro
            identificacion: identificacion,
            tipoIdentificacion: tipoIdentificacionSeleccionado
        },
        success: function (data) {//en caso de que sale bien

            if (data.error) { //si data.error contiene algo

                if ($("#msjFormulario").length) {

                    $("#msjFormulario").remove();

                    $("#botones").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + data.error + "</p>");
                }
                else {
                    $("#botones").after("<p class='alert alert-danger mt-2' id='msjFormulario'>" + data.error + "</p>");

                }
                $("#loader-container").hide(); 


            } else {


                if ($("#msjValidacionCedula").length) {

                    $("#msjValidacionCedula").remove();
                }
           



                // Actualizar el valor visual del campo #cedula
                if ($("#identificationType").val() == "Cédula de Identidad") {
                    $("#identificacion").val(cedula.startsWith("0") ? identificacion : "0" + identificacion);// Verificar si la cédula tiene un 0 al inicio
                }
                else {
                    $("#identificacion").val(identificacion);

                }

                // asignar valores a los inputs de la consulta
                $("#nombre").val(data.nombre).prop("disabled", true);
                $("#apellidos").val(data.apellido1 + " " + data.apellido2).prop("disabled", true);
                $("#sexo").val((data.genero == '1' ? 1 : 2)).prop("disabled", true);
                $("#nacimiento").val(cambiarFormatoFecha(data.fechaNacimiento)).prop("disabled", true);


                mostrarForm();

                $("#correo").focus();

                $("#loader-container").hide(); 
            }
        },
        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
            $("#loader-container").hide(); 
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

function MascaraCedula(identificationField) {
    // Escuchar el evento "input" en el campo de identificación
    var inputValue = identificationField.val();

    // Verificar si no comienza con "0" y no está vacío
    if (inputValue && inputValue.charAt(0) !== "0") {
        // Agregar un "0" al principio
        identificationField.val("0" + inputValue);
        // Posicionar el cursor en el tercer carácter
        identificationField[0].setSelectionRange(2, 2);
    }
}

