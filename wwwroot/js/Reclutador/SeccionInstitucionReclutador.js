$(document).ready(function () {


    if ($("#nombreVista").val() == "AñadirInstitutoReclutador") {
        CargarProvincias();

        Inputmask({ mask: '9999-9999' }).mask($('#contacto'));

        $("#provincias").change(function () {
            CambioProvincia();
            $("#contacto").val('');



            if ($("#provincias").val() != "0") {
                CargarInstitutosCombo();
            }
            else {
                $("#institucion").empty();
                cmbInstituciones.append($("<option>").val("0").text("Seleccione una opcion"));
            }


        });


        //evento al cambiar de seleccion en cantones
        $("#cantones").change(function () {
            CambiarCanton();
            CargarInstitutosCombo();
            $("#contacto").val('');

        });

        $("#distritos").change(function () {
            CargarInstitutosCombo();
            $("#contacto").val('');
        });

        $("#institucion").change(function () {
            var valorSeleccionado = $(this).val();

            if (valorSeleccionado != "0") {

                ObtenerTelefonoInstituto(valorSeleccionado).then(function (telefono) {

                    if (telefono != 0) {
                        $("#contacto").val(telefono);
                    }
                })

            }
        });

        $("#btnAgregarInstitucion").on("click", function (event) {
            event.preventDefault();

            if (validarCampos()) {
                AgregarInstitucion();
            }
            else {
                alert('Debes de llenar todos los campos');
            }

        });

    }




});



////////////////////////////////////  funciones  ////////////////////////
//funcion cambiar provincia
function CambioProvincia() {
    if ($("#provincias").val() != "0") {//verificar que la opcion no sea "seleccione una provincia"

        //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
        // Elimina todas las opciones excepto la primera (índice 0)
        $("#cantones").find("option:not(:first)").remove();
        $("#distritos").find("option:not(:first)").remove();

        var idProvincia = $("#provincias").val();//agarrar el id de la provincia elegida
        CargarCanton(idProvincia);


    }
    else {
        //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
        // Elimina todas las opciones excepto la primera (índice 0)
        $("#cantones").find("option:not(:first)").remove();
        $("#distritos").find("option:not(:first)").remove();



    }
}

function CargarProvincias() {
    var apiProvincia = "https://apisproyectorg.somee.com/api/Ubicaciones/Provincias/";

    // Elemento <select> de provincias
    var provinciasDropdown = $("#provincias");




    /*         Realiza una solicitud GET a la API*/
    fetch(apiProvincia)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener las provincias.');
            }
            return response.json();
        })
        .then(data => {
            provinciasDropdown.empty();
            provinciasDropdown.append($("<option>").val("0").text('Seleccione una opcion'));


            // Llena el ComboBox con las provincias recibidas de la API
            data.forEach(provincia => {
                provinciasDropdown.append($("<option>").val(provincia.idProvincia).text(provincia.nombreProvincia));
            });



        })
        .catch(error => {
            console.error(error);
        });
}


function CambiarCanton() {
    //eliminar opciones anteriores de cantones y distritos menos la primera que seria "selecciones una opción"
    // Elimina todas las opciones excepto la primera (índice 0)
    $("#distritos").find("option:not(:first)").remove();

    var idCanton = $("#cantones").val();//agarrar el id del cannton elegido

    const apiDistrito = 'https://apisproyectorg.somee.com/api/Ubicaciones/Distritos/';

    fetch(apiDistrito + (idCanton))
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los distritos.');
            }
            return response.json();
        })
        .then(data => {


            // Llena el ComboBox con los cantones recibidos de la API
            data.forEach(distritos => {
                $("#distritos").append($("<option>").val(distritos.idDistrito).text(distritos.nombreDistrito));
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function CargarCanton(idProvincia) {

    const apiCanton = 'https://apisproyectorg.somee.com/api/Ubicaciones/Cantones/';

    fetch(apiCanton + (idProvincia))
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los cantones.');
            }
            return response.json();
        })
        .then(data => {


            // Llena el ComboBox con los cantones recibidos de la API
            data.forEach(cantones => {
                $("#cantones").append($("<option>").val(cantones.idCanton).text(cantones.nombreCanton));
            });


        })
        .catch(error => {
            console.error(error);
        });
}



function CargarInstitutosCombo() {
    // Suponiendo que tienes un ComboBox con el id 'cmbInstituciones'
    var cmbInstituciones = $("#institucion");

    // Llamada AJAX para obtener los datos desde el controlador
    $.ajax({
        url: '/Reclutador/MostrarInstitutosSecundaria', // Asegúrate de reemplazar 'TuControlador' con el nombre correcto de tu controlador
        type: 'GET',
        data: {
            idProvincia: $("#provincias").val(), // Reemplaza 'valorIdProvincia' con el valor correcto
            idCanton: $("#cantones").val(),       // Reemplaza 'valorIdCanton' con el valor correcto
            idDistrito: $("#distritos").val()    // Reemplaza 'valorIdDistrito' con el valor correcto
        },
        success: function (data) {
            // Limpiar ComboBox antes de agregar nuevas opciones
            cmbInstituciones.empty();

            // Agregar las nuevas opciones al ComboBox
            cmbInstituciones.append($("<option>").val("0").text("Seleccione una opcion"));

            $.each(data, function (index, instituto) {
                cmbInstituciones.append($("<option>").val(instituto.codInstitucion).text(instituto.nombreInstitucion));
            });
        },
        error: function (error) {
            console.error('Error al obtener los datos:', error);
        }
    });
}


//esta funcion obtiene el numero de telefono de la institucion seleccionada
function ObtenerTelefonoInstituto(idInstituto) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/Reclutador/ObtenerTelefonoInstitucion',
            type: 'GET',
            data: {
                idProvincia: $("#provincias").val(),
                idCanton: $("#cantones").val(),
                idDistrito: $("#distritos").val(),
                idInstituto: idInstituto
            },
            success: function (data) {
                if (data.error) {
                    console.log(data.error);
                    reject(data.error);
                } else {
                    resolve(data);
                }
            },
            error: function (error) {
                console.error('Error al obtener los datos:', error);
                reject(error);
            }
        });
    });
}



function AgregarInstitucion() {

    var form = $("#formularioInstitucion")[0];
    var formData = new FormData(form);

    // Agregar identificacion y clave al formData
    formData.append("identificacion", $("#identification").val());

    $.ajax({
        url: '/Reclutador/AgregarInstitucion',
        type: 'POST',
        data: formData,
        processData: false,  // Necesario para enviar FormData correctamente
        contentType: false,  // Necesario para enviar FormData correctamente
        success: function (data) {
            if (data.error) {
                console.log(data.error);
                alert("Hubo un problema al agregar la institucion, vuelva a intentar!");
                limpiarFormularioAgregarInstituto();
            } else {
                alert("Institucion agregada con exito");
                // Tu lógica para enviar el formulario
                var form = $("#formRegresar");
                form.submit();

            }
        },
        error: function (error) {
            console.error('Error al obtener los datos:', error);
            reject(error);
        }
    });
}

function limpiarFormularioAgregarInstituto() {
    CargarProvincias();
    // Limpiar los campos de los selects
    $("#cantones").empty();
    $("#cantones").append($("<option>").val("0").text("Seleccione una opcion"));

    $("#distritos").empty();
    $("#distritos").append($("<option>").val("0").text("Seleccione una opcion"));

    $("#institucion").empty();
    $("#institucion").append($("<option>").val("0").text("Seleccione una opcion"));


    // Limpiar el campo de texto
    document.getElementById("contacto").value = "";

    // Limpiar el campo de texto de dirección
    document.getElementById("direccion").value = "";
}


function validarCampos() {
    var institutoValue = document.getElementById("institucion").value;
    var contactoValue = document.getElementById("contacto").value;
    var direccionValue = document.getElementById("direccion").value;

    var condicionesCumplidas =
        (institutoValue !== "0" && validarContacto(contactoValue) && direccionValue.trim() !== "");

    return condicionesCumplidas;
}

function validarContacto(contacto) {
    // Expresión regular para el formato 4444-4444
    var regex = /^\d{4}-\d{4}$/;

    // Validar el formato
    return regex.test(contacto);
}