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


});