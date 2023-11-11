
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

        //cargar provincias
        // URL de tu API que devuelve las provincias
        var apiProvincia = "https://www.apprh.somee.com/api/Ubicaciones/Provincias";

        // Elemento <select> de provincias
        var provinciasDropdown = $("#provincias");
        var cantonesDropdown = $("#cantones");
        var distritosDropdown = $("#distritos");



        // Realiza una solicitud GET a la API
        fetch(apiProvincia)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener las provincias.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                // Llena el ComboBox con las provincias recibidas de la API
                data.forEach(provincia => {
                    provinciasDropdown.append($("<option>").val(provincia.idProvincia).text(provincia.nombreProvincia));
                });
            })
            .catch(error => {
                console.error(error);
            });


    }


    $("#provincias").change(function () {
        if ($("#provincias").val() != "null") {//verificar que la opcion no sea "seleccione una provincia"

            //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
            // Elimina todas las opciones excepto la primera (índice 0)
            $("#cantones").find("option:not(:first)").remove();
            $("#distritos").find("option:not(:first)").remove();

            var idProvincia = $("#provincias").val();//agarrar el id de la provincia elegida

            const apiCanton = 'https://www.apprh.somee.com/api/Ubicaciones/Cantones/';

            fetch(apiCanton + (idProvincia))
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pudo obtener los cantones.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    // Llena el ComboBox con los cantones recibidos de la API
                    data.forEach(cantones => {
                        cantonesDropdown.append($("<option>").val(cantones.idCanton).text(cantones.nombreCanton));
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        }
        else {
            //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
            // Elimina todas las opciones excepto la primera (índice 0)
            $("#cantones").find("option:not(:first)").remove();
            $("#distritos").find("option:not(:first)").remove();



        }
       
    });


    //evento al cambiar de seleccion en cantones
    $("#cantones").change(function () {

        //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
        // Elimina todas las opciones excepto la primera (índice 0)
        $("#distritos").find("option:not(:first)").remove();

        var idCanton = $("#cantones").val();//agarrar el id del cannton elegido
 
        const apiDistrito = 'https://www.apprh.somee.com/api/Ubicaciones/Distritos/';

        fetch(apiDistrito + (idCanton))
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener los distritos.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                // Llena el ComboBox con los cantones recibidos de la API
                data.forEach(distritos => {
                    distritosDropdown.append($("<option>").val(distritos.idDistrito).text(distritos.nombreDistrito));
                });
            })
            .catch(error => {
                console.error(error);
            });

    });

});


