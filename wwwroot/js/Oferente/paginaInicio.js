$(document).ready(function () {


    //poner el el nav el nombre del usuario
    var nombreUsuario = $("#nombreUsuario").val();
    $("#navNombre").text(nombreUsuario);


    $("#btnExpedienteDP").click(function (event) {


        event.preventDefault();
      
 
        var actionUrl = '/Oferente/DatosPersonalesOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#btnExpedienteTitulos").click(function (event) {


        event.preventDefault();


        var actionUrl = '/Oferente/TitulosOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#btnExpedienteReferencias").click(function (event) {


        event.preventDefault();


        var actionUrl = '/Oferente/ReferenciasOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });





    $("#btnExpedienteExpe").click(function (event) {


        event.preventDefault();
  


        var actionUrl = '/Oferente/ExperienciaOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#btnBuscarVacantes").click(function (event) {


        event.preventDefault();



        var actionUrl = '/Oferente/VerOfertasOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#btnCrearOferta").click(function (event) {


        event.preventDefault();



        var actionUrl = '/Oferente/CrearOfertaOferente';

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
        var actionUrl = '/Oferente/ExperienciaOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        ////asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownExpedientePersonal").click(function (event) {


        event.preventDefault();
        event.stopPropagation();


        var actionUrl = '/Oferente/DatosPersonalesOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownExpedienteAcademico").click(function (event) {


        event.preventDefault();
        event.stopPropagation();


        var actionUrl = '/Oferente/TitulosOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownPerfilLaboral").click(function (event) {


        event.preventDefault();
        event.stopPropagation();


        var actionUrl = '/Oferente/ReferenciasOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });



    $("#dropdownBuscarVacante").click(function (event) {


        event.preventDefault();
        event.stopPropagation();


        var actionUrl = '/Oferente/VerOfertasOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownCrearOferta").click(function (event) {


        event.preventDefault();
        event.stopPropagation();


        var actionUrl = '/Oferente/CrearOfertaOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownVerVacantesAplicadas").click(function (event) {


        event.preventDefault();
        event.stopPropagation();


        var actionUrl = '/Oferente/VerVacantesAplicadasOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownVerMisOfertas").click(function (event) {


        event.preventDefault();
        event.stopPropagation();


        var actionUrl = '/Oferente/VerOfertasOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownCambiarClave").click(function (event) {


        event.preventDefault();
        event.stopPropagation();


        var actionUrl = '/Oferente/CambiarPasswordOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownInactivarCuenta").click(function (event) {


        event.preventDefault();
        event.stopPropagation();


        var actionUrl = '/Oferente/InactivarCuentaOferente';

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioOferente");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });




    if ($("#nombreVista").length) {

        if ($("#nombreVista").val() == "MenuPrincipalOferente") {


            if (ValidarEstadoPerfil()==false) {
       
                $("#modalActivacion").modal("show");
            }


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
function ValidarEstadoPerfil() {

    $.ajax({
        type: "GET",
        url: "/Oferente/ValidarEstadoPerfil",
        data: {
            identificacion: $("#identification").val()
        },
        success: function (data) {

            if (data.error) {
                console.error(data.error);

            }
            else {
    
                return data.resultado;
            }
        },
        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });
}


function ActivarCuenta() {
    $.ajax({
        type: "PUT",
        url: "/Oferente/ActivarCuenta",
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