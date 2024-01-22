$(document).ready(function () {


    //poner el el nav el nombre del usuario
    var nombreUsuario = $("#nombreUsuario").val();
    $("#navNombre").text(nombreUsuario);


    $("#btnExpedienteDP").click(function (event) {


        event.preventDefault();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/DatosPersonalesOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#btnExpedienteTitulos").click(function (event) {


        event.preventDefault();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/TitulosOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#btnExpedienteReferencias").click(function (event) {


        event.preventDefault();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/ReferenciasOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });





    $("#btnExpedienteExpe").click(function (event) {


        event.preventDefault();


        let url = ObtenerUrlSolicitud('Oferente', "Oferente/ExperienciaOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#btnBuscarVacantes").click(function (event) {


        event.preventDefault();


        let url = ObtenerUrlSolicitud('Oferente', "Oferente/VerOfertasOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#btnCrearOferta").click(function (event) {


        event.preventDefault();


        let url = ObtenerUrlSolicitud('Oferente', "Oferente/CrearOfertaOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    //////// liks del nav
    $("#dropdownExperienciaLaboral").click(function (event) {


        event.preventDefault();

        event.stopPropagation();
        let url = ObtenerUrlSolicitud('Oferente', "Oferente/ExperienciaOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        ////asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownExpedientePersonal").click(function (event) {


        event.preventDefault();
        event.stopPropagation();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/DatosPersonalesOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownExpedienteAcademico").click(function (event) {


        event.preventDefault();
        event.stopPropagation();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/TitulosOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownPerfilLaboral").click(function (event) {


        event.preventDefault();
        event.stopPropagation();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/ReferenciasOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });



    $("#dropdownBuscarVacante").click(function (event) {


        event.preventDefault();
        event.stopPropagation();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/VerOfertasOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownCrearOferta").click(function (event) {


        event.preventDefault();
        event.stopPropagation();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/CrearOfertaOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownVerVacantesAplicadas").click(function (event) {


        event.preventDefault();
        event.stopPropagation();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/VerVacantesAplicadasOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownVerMisOfertas").click(function (event) {


        event.preventDefault();
        event.stopPropagation();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/VerOfertasOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownCambiarClave").click(function (event) {


        event.preventDefault();
        event.stopPropagation();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/CambiarPasswordOferente");

        var actionUrl =url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownInactivarCuenta").click(function (event) {


        event.preventDefault();
        event.stopPropagation();

        let url = ObtenerUrlSolicitud('Oferente', "Oferente/InactivarCuentaOferente");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownCerrarSesion").click(function (event) {


        event.preventDefault();
        event.stopPropagation();

        let url = ObtenerUrlSolicitud('Oferente', "MenuPrincipal/MenuAcceso");
        window.location.href =url;

      
    });




    if ($("#nombreVista").length) {
        if ($("#nombreVista").val() == "MenuPrincipalOferente") {
            ValidarEstadoPerfil(function (estado) {
                if (!estado) {

                    $("#modalActivacion").modal("show");
                }
                // Continúa con el resto de tu código aquí
            });
        }
    }

    $("#btnNoActivarCuenta").click(function (event) {

        // Redirigir al menu principal
        window.location.href = "/MenuPrincipal/MenuAcceso";

    });

    $("#btnActivarCuenta").click(function (event) {
        ActivarCuenta();

    });

});


////////////////////////////////////  funciones  ////////////////////////


//funcion retorna true si esta activa, false si esta inactiva
function ValidarEstadoPerfil(callback) {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/ValidarEstadoPerfil");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            identificacion: $("#identification").val()
        },
        success: function (data) {
            if (data.error) {
                console.error(data.error);
                callback(false);
            } else {
                callback(data.resultado);
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
            callback(false);
        }
    });
}


function ActivarCuenta() {
    let url = ObtenerUrlSolicitud('Oferente', "Oferente/ActivarCuenta");

    $.ajax({
        type: "PUT",
        url: url,
        data: {
            identificacion: $("#identification").val()
        },
        success: function (data) {

            if (data.exito == true) {
                //sale bien la activacion

                //cerrar modal 
                $("#modalActivacion").modal("hide");

            }
            else if (data.error) {
                console.log(data.error);
            }
        },
        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
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