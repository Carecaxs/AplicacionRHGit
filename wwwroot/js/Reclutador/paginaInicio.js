$(document).ready(function () {


    //poner el el nav el nombre del usuario
    var nombreUsuario = $("#nombreUsuario").val();
    $("#navNombre").text(nombreUsuario);

    ComprobacionMostrarCrearinstitucion();



    MaskAgregartarjeta();


    $("#dropdownCrearInstitucion").click(function (event) {


        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/AñadirInstitutoReclutador");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioReclutador");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownModificarInstitucion").click(function (event) {


        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/ModificarInstitutoReclutador");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioReclutador");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });

    $("#dropdownAdministrarMaterias").click(function (event) {


        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/AdministrarMateriasReclutador");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioReclutador");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });

    $("#dropdownVerVacantes").click(function (event) {


        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/VerVacantesReclutador");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioReclutador");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });

    $("#dropdownCrearVacantes").click(function (event) {


        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/CrearOfertaReclutador");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioReclutador");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });

    $("#dropdownAdministrarVacantes").click(function (event) {


        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/AdministrarOfertasReclutador");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioReclutador");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });

    $("#dropdownCerrarSesion").click(function (event) {


        event.preventDefault();
        event.stopPropagation();

        let url = ObtenerUrlSolicitud('Reclutador', "MenuPrincipal/MenuAcceso");
        window.location.href = url;


    });

    $("#dropdownExpedientes").click(function (event) {


        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/ExpedientesEmpleado");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioReclutador");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });


    $("#dropdownEditarEmpleados").click(function (event) {


        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/AgregarEditarEmpleado");

        var actionUrl = url;

        // Tu lógica para enviar el formulario
        var form = $("#formPaginaInicioReclutador");

        //asignar la accion al formulario
        form.prop('action', actionUrl);

        form.submit();
    });
  

});


////////////////////////////////////  funciones  ////////////////////////


//funcion para comprobar si se debe de mostrar o no el crear institucion, se muestra unicamente si no se ha creado aun
function ComprobacionMostrarCrearinstitucion() {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/InstitucionCreada");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            identificacion: $("#identification").val()
        },
        success: function (data) {

            if (data.resultado == true) {
                //significa que ya hay creada una instituucion ligada a ese oferente

                // Oculta el botón con el id "dropdownCrearInstitucion"
                $("#dropdownCrearInstitucion").hide();

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


function MaskAgregartarjeta() {

    // Máscara para la fecha de expiración (MM/YYYY)
    $('#fechaExpiracion').on('input', function (event) {
        var inputValue = this.value;

        // Eliminar cualquier caracter no numérico
        var numericValue = inputValue.replace(/\D/g, '');

        // Limitar la longitud a cuatro dígitos y agregar "/" después de dos dígitos
        if (numericValue.length > 2) {
            numericValue = numericValue.slice(0, 2) + '/' + numericValue.slice(2, 4) + numericValue.slice(4);
        }

        // Actualizar el valor del campo solo con números
        $(this).val(numericValue);
    });


    // Máscara para clave csv
    $('#codigoSeguridad').on('input', function (event) {
        var inputValue = this.value;

        // Eliminar cualquier caracter no numérico
        var numericValue = inputValue.replace(/\D/g, '');

        // Actualizar el valor del campo solo con números
        $(this).val(numericValue);


    });


    // Máscara para numero de tarjeta
    $('#numeroTarjeta').on('input', function (event) {
        var inputValue = this.value;

        // Eliminar cualquier caracter no numérico
        var numericValue = inputValue.replace(/\D/g, '');

        // Actualizar el valor del campo solo con números
        $(this).val(numericValue);


    });

    //evento que no permite ingsar numeros en el nombre titular al agregar tarjeta pago
    $('#nombreTitular').on('keydown', function (event) {
        // Verificar si la tecla presionada es un número
        if (event.key >= 0 && event.key <= 9) {
            event.preventDefault(); // Evitar que se ingrese el número
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