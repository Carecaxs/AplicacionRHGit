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

});