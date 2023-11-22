

$(document).ready(function () {

    //asignar a los campos nombre y appelidos valores
    $("#nombre").val($("#nombreOferente").val());
    $("#apellidos").val($("#apellidosOferente").val());


    if ($("#nombreVista").val() == "DatosPersonalesOferente") {

        //cargar provincias
        //URL de tu API que devuelve las provincias
        var apiProvincia = "https://www.apprh.somee.com/api/Ubicaciones/Provincias";

        // Elemento <select> de provincias
        var provinciasDropdown = $("#provincias");
        var cantonesDropdown = $("#cantones");
        var distritosDropdown = $("#distritos");



        /*         Realiza una solicitud GET a la API*/
        fetch(apiProvincia)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener las provincias.');
                }
                return response.json();
            })
            .then(data => {
      

                // Llena el ComboBox con las provincias recibidas de la API
                data.forEach(provincia => {
                    provinciasDropdown.append($("<option>").val(provincia.idProvincia).text(provincia.nombreProvincia));
                });
            })
            .catch(error => {
                console.error(error);
            });


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



        $.ajax({
            type: "Get",//tipo de solicitud
            url: "/Oferente/ObtenerDatosPersonalesEx", 
            data: {//se envia el parametro
                identificacion: $("#identification").val(),
           
            },
            success: function (data) {//en caso de que sale bien

                if (data.error) { //si data.error contiene algo

                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#direccion").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                    }
                    else {
                        $("#direccion").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                    }



                }
                else {
                    //recibo la fecha en un formato yyyy-mm-ddT00:00:00 entonces solo nos interesa la parte que esta antes de la T
                    var partesFecha = data.nacimiento.split('T');

                    var nacimiento = partesFecha[0];
                    var correo = data.correo;
                    var telefono = data.telefono;
                    var provincia = data.idProvincia;
                    var canton = data.idCanton;
                    var distrito = data.idDistrito;
                    var direccion = data.direccion;

     

                    console.log(correo);
                    console.log(telefono);
                    console.log(provincia);
                    console.log(canton);
                    console.log(distrito);
                    console.log(direccion);



                    //asignar los valores a los inputs
                    $("#nacimiento").val((nacimiento != null) ? nacimiento : "");
                    $("#correo").val((correo != null) ? correo : "");
                    $("#telefono").val((telefono != null) ? telefono : "");
                    $("#direccion").val((direccion != null) ? direccion : "");
                    




                    //cargar los lugares del exopediente
                    if (canton != null) {
                        const apiCanton = 'https://www.apprh.somee.com/api/Ubicaciones/Cantones/';

                        fetch(apiCanton + (provincia))
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
                                $("#provincias").val(provincia);

                                $("#cantones").val(canton);
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }
                    

                    if (distrito != null) {
                        const apiDistrito = 'https://www.apprh.somee.com/api/Ubicaciones/Distritos/';

                        fetch(apiDistrito + (canton))
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
                                $("#distritos").val(distrito);

                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }


                   

                }
            },
            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });


    }
            



    //evento de Guardar Cambios en el expediente ( datos personales )
    $("#btnGuardarCambios").click(function (event) {

        event.preventDefault();


        $.ajax({
            type: "Post",//tipo de solicitud
            url: "/Oferente/GuardarCambiosDatosPersonalesEx",
            data: {//se envia el parametro
                identificacion: $("#identification").val(),
                nacimiento: $("#nacimiento").val(),
                correo: $("#correo").val(),
                telefono: $("#telefono").val(),
                provincia: $("#provincias").val(),
                canton: $("#cantones").val(),
                distrito: $("#distritos").val(),
                direccion: $("#direccion").val()

            },
            success: function (data) {//en caso de que sale bien

                if (data.error) { //si data.error contiene algo

                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#direccion").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                    }
                    else {
                        $("#direccion").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                    }



                }
                else {
                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#direccion").after("<p class='alert alert-success mt-2' id='mensaje'>" + data.mensaje + "</p>");
                    }
                    else {
                        $("#direccion").after("<p class='alert alert-success mt-2' id='mensaje'>" + data.mensaje + "</p>");

                    }

                }
            },

            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });

    });




 /*   seccion titulos*/


    $("#agregarTitulo").click(function (event) {

        event.preventDefault();

        // Obtener el formulario y los datos del formulario
        var form = $("#formAgregarTitulo")[0];
        var formData = new FormData(form);

        // Agregar identificacion y clave al formData
        formData.append("identificacion", $("#identification").val());
        formData.append("clave", $("#clave").val());


        $.ajax({
            method: "POST",//tipo de solicitud
            url: "/Oferente/AgregarTitulo",
            data: formData,
            processData: false,  // Necesario para enviar FormData correctamente
            contentType: false,  // Necesario para enviar FormData correctamente
            success: function (data) {//en caso de que sale bien

                if (data.error) { //si data.error contiene algo

                    if ($("#mensaje").length) {

                        $("#mensaje").remove();

                        $("#direccion").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");
                    }
                    else {
                        $("#direccion").after("<p class='alert alert-danger mt-2' id='mensaje'>" + data.error + "</p>");

                    }



                }
                else {
                    //todo sale bien 
                    ///recargar la lista de titulos

                }
            },

            error: function (xhr, status, error) { //error en la solicitud de ajax
                console.error(error);
            }
        });

    });

   
});




        

        


    


    