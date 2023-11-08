
$(document).ready(function () {
    var identificationField = $("#identification");//input donde se pone la identificacion
    $("#identificationType").change(function () {//al cambiar de seleccion en el campo tipo de cedula se aplica una diferente mascara segun su selección
        var selectedType = $(this).val();
        var mask = "";


        if (selectedType === "null") {
            identificationField.prop("disabled", true); // Deshabilitar el campo
        } else {
            identificationField.prop("disabled", false); // habilitar el campo
        }

        if (selectedType === "Cedula") {
            mask = "99-9999-9999";


        } else if (selectedType === "Dinex") {
            mask = "99-999999-9999";

        } else if (selectedType === "Pasaporte") {
            mask = "a999999";

        }


        $("#identification").inputmask({ mask: mask });

    });


    identificationField.on("input", function () {
        // Escuchar el evento "input" en el campo de identificación
        var inputValue = identificationField.val();

        var selectedType = $(#identificationType).val();//aceder al valor de tipo de identificacion

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



});

