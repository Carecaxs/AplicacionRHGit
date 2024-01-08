$(document).ready(function () {


    //poner el el nav el nombre del usuario
    var nombreUsuario = $("#nombreUsuario").val();
    $("#navNombre").text(nombreUsuario);

    ComprobacionMostrarCrearinstitucion();



    MaskAgregartarjeta();

});


////////////////////////////////////  funciones  ////////////////////////


//funcion para comprobar si se debe de mostrar o no el crear institucion, se muestra unicamente si no se ha creado aun
function ComprobacionMostrarCrearinstitucion() {
    $.ajax({
        type: "GET",
        url: "/Reclutador/InstitucionCreada",
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