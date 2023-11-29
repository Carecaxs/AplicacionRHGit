﻿$(document).ready(function () {

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

});