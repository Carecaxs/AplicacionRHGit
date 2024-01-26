$(document).ready(function () {

    //seccion de enlaces
    $("#enlaceVerExpedientes").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/ExpedientesEmpleado");

        var actionUrl = url;

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);
        var identificacion = $("#identification").val();
        var clave = $("#clave").val();

        form.append('<input type="hidden" name="identification" value="' + identificacion + '">');
        form.append('<input type="hidden" name="clave" value="' + clave + '">');


        form.submit();
    });

    $("#enlaceAgregarEditarEmpleado").click(function (event) {

        event.preventDefault();

        let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/AgregarEditarEmpleado");

        var actionUrl = url;

        // Tu lógica para enviar el formulario

        var form = $(".formEnlaces");

        //asignar la accion al formulario
        form.prop('action', actionUrl);
        var identificacion = $("#identification").val();
        var clave = $("#clave").val();

        form.append('<input type="hidden" name="identification" value="' + identificacion + '">');
        form.append('<input type="hidden" name="clave" value="' + clave + '">');


        form.submit();
    });




    if ($("#nombreVista").val() == "AgregarEditarEmpleado") {


        $("#enlaceAgregarEditarEmpleado").addClass("active");

        MascarasPaginaAgregarEmpleado();
        CargarProvincia();

        $("#idEmpleado, #idEmpleadoForm").inputmask({ mask: "99-9999-9999" });



        $("#idEmpleado").on("input", function () {

            var selectedType = $("#identificationType").val();//aceder al valor de tipo de identificacion

            if (selectedType === "Cedula") {
                MascaraCedula($(this));

            }

        });

        $("#idEmpleadoForm").on("input", function () {

            var selectedType = $("#identificationTypeForm").val();//aceder al valor de tipo de identificacion

            if (selectedType === "Cedula") {
                MascaraCedula($(this));

            }

        });

        $("#identificationType").change(function () {//al cambiar de seleccion en el campo tipo de cedula se aplica una diferente mascara segun su selección

            var selectedType = $(this).val();
            var mask = "";
            $("#idEmpleado").val('');



            if (selectedType === "Cedula") {
                mask = "99-9999-9999";
            } else if (selectedType === "Dimex") {
                mask = "99-999999-9999";
            }
            $("#idEmpleado").inputmask({ mask: mask });
        });

        $("#identificationTypeForm").change(function () {//al cambiar de seleccion en el campo tipo de cedula se aplica una diferente mascara segun su selección

            var selectedType = $(this).val();
            var mask = "";
            $("#idEmpleadoForm").val('');



            if (selectedType === "Cedula") {
                mask = "99-9999-9999";
                $("#btnVerificarCedula").show();
                // Para ocultar el formulario
                $("#empleadoForm").attr("hidden", true);
                LimpiarCampos();


            } else if (selectedType === "Dimex") {
                mask = "99-999999-9999";
                $("#btnVerificarCedula").hide();
                // Para mostrar el formulario
                $("#empleadoForm").removeAttr("hidden");

                $("#nombre").prop("disabled", false);
                $("#apellidos").prop("disabled", false);
                $("#genero").prop("disabled", false);
                $("#nacimiento").prop("disabled", false);
                LimpiarCampos();

            }
            $("#idEmpleadoForm").inputmask({ mask: mask });
        });


        $("#btnBuscarEmpleado").click(function (event) {

            // Evitar la recarga de la página
            event.preventDefault();

            var identificacion = $("#idEmpleado").val();//obtener el valor de la cedula

            if (ValidarIdentificacion($("#idEmpleado").val(), $("#identificationType").val())) {
                $("#loader-container").show();  // Muestra el modal de carga
                CargarDatosEmpleado(identificacion);
            }
            else {
                alert('Identificación inválida');
            }


            $("#idEmpleado").val('');

        });

        $("#btnVerificarCedula").click(function (event) {

            // Evitar la recarga de la página
            event.preventDefault();



            if (ValidarIdentificacion($("#idEmpleadoForm").val(), $("#identificationTypeForm").val())) {
                $("#loader-container").show();  // Muestra el modal de carga

                var identificacion = $("#idEmpleadoForm").val();//obtener el valor de la cedula
                CargarDatosPersona(identificacion);
            }
            else {
                alert('Identificación inválida');
                $("#idEmpleadoForm").val('');

            }

        });

        //al dar click en el boton de agregar empleado se va mostrar el boton de agregar y se pone el foco en identificacion
        $("#abrirModalAgregarEmpleado").click(function (event) {
            $("#btnAgregarEmpleado").attr("hidden", false);
            $("#btnEditarEmpleado").attr("hidden", true);
            $("#empleadoForm").attr("hidden", true);
            $("#identificationTypeForm").val('Cedula');
            $("#identificationTypeForm").change();

            LimpiarCampos();

            $("#camposBusqueda").show();
            $("#divEstado").hide();
            $("#idEmpleadoForm").focus();
        });

        $("#listaEmpleados").on("click", ".btnEditar", function () {
            $("#camposBusqueda").hide();
            $("#divEstado").show();

            $("#empleadoForm").attr("hidden", false);
            $("#btnAgregarEmpleado").attr("hidden", true);
            $("#btnEditarEmpleado").attr("hidden", false);
            //obtener fila donde se dio click
            var fila = $(this).closest("tr");

            let idEmpleado = fila.attr("id");

            //mostrar modal 
            $("#agregarEmpleadoModal").modal("show");
            MostrarDetallesEmpleado(idEmpleado);


        });


        $("#provincias").change(function () {
            if ($("#provincias").val() != "null") {//verificar que la opcion no sea "seleccione una provincia"

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

        });


        //evento al cambiar de seleccion en cantones
        $("#cantones").change(function () {

            if ($("#cantones").val() != "null") {
                $("#distritos").find("option:not(:first)").remove();
                var idCanton = $("#cantones").val();//agarrar el id del cannton elegido
                CargarDistrito(idCanton);
            } else {
                $("#distritos").find("option:not(:first)").remove();
            }

        });


        $("#btnAgregarEmpleado").click(function (event) {

            // Evitar la recarga de la página
            event.preventDefault();


            if (validarCamposAgregarEmpleado()) {

                AgregarEmpleado();

            }

        });

        $("#btnEditarEmpleado").click(function (event) {

            // Evitar la recarga de la página
            event.preventDefault();


            if (validarCamposEditarEmpleado()) {

                EditarEmpleado();

            }

        });
    }



    if ($("#nombreVista").val() == "ExpedientesEmpleado") {

        $("#enlaceVerExpedientes").addClass("active");

        $("#idEmpleado, #idEmpleadoForm").inputmask({ mask: "99-9999-9999" });
        ObtenerListaEmpleados();

        $("#idEmpleado").on("input", function () {

            var selectedType = $("#identificationType").val();//aceder al valor de tipo de identificacion

            if (selectedType === "Cedula") {
                MascaraCedula($(this));

            }

        });


        $("#identificationType").change(function () {//al cambiar de seleccion en el campo tipo de cedula se aplica una diferente mascara segun su selección

            var selectedType = $(this).val();
            var mask = "";
            $("#idEmpleado").val('');



            if (selectedType === "Cedula") {
                mask = "99-9999-9999";
            } else if (selectedType === "Dimex") {
                mask = "99-999999-9999";
            }
            $("#idEmpleado").inputmask({ mask: mask });
        });

        $("#btnBuscarEmpleado").click(function (event) {

            // Evitar la recarga de la página
            event.preventDefault();

            var identificacion = $("#idEmpleado").val();//obtener el valor de la cedula

            if (ValidarIdentificacion($("#idEmpleado").val(), $("#identificationType").val())) {
                $("#loader-container").show();  // Muestra el modal de carga
                CargarDatosEmpleadoExpediente(identificacion);
            }
            else {
                alert('Identificación inválida');
            }


            $("#idEmpleado").val('');

        });

        //click al boton de ver todos los empleados
        $("#btnVerTodo").click(function (event) {
            ObtenerListaEmpleados();
        });


        $("#listaEmpleados").on("click", ".btnDatosPersonales", function () {
            $
            //obtener fila donde se dio click
            var fila = $(this).closest("tr");

            let idEmpleado = fila.attr("id");

            limpiarCamposVerDatosPersonales();

            MostrarDatosPersonalesEmpleado(idEmpleado);
                     //mostrar modal 
            $("#verExpedienteModal").modal("show");

        });
    }
});




// funciones seccion agregar AgregarEditarEmpleado
function MascaraCedula(identificationField) {
    // Escuchar el evento "input" en el campo de identificación
    var inputValue = identificationField.val();

    // Verificar si no comienza con "0" y no está vacío
    if (inputValue && inputValue.charAt(0) !== "0") {
        // Agregar un "0" al principio
        identificationField.val("0" + inputValue);
        // Posicionar el cursor en el tercer carácter
        identificationField[0].setSelectionRange(2, 2);
    }
}


function CargarDatosEmpleado(identificacion) {


    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/GetEmpleado");

    $.ajax({
        type: "Get",//tipo de solicitud
        url: url, //direccion del controlador
        data: {//se envia el parametro
            identificacion,
            identificacionReclutador: $("#identification").val()
        },
        success: function (data) {//en caso de que sale bien

            procesarRespuestaEmpleado(data);
            $("#loader-container").hide();
        },
        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
            $("#loader-container").hide();
        }
    });
}


function ValidarIdentificacion(identificacion, selectedType) {
    identificacion = identificacion.replace(/[-_]/g, '');
    if (selectedType === "Cedula") {
        if (identificacion.length == 10) {

            return true;
        }
        else {

            return false;
        }


    } else if (selectedType === "Dimex") {
        if (identificacion.length == 12) {


            return true;
        }
        else {

            return false;
        }
    }
}

function agregarEmpleadoALaTabla(empleado) {
    var tbody = document.getElementById("listaEmpleados");

    var row = tbody.insertRow(-1);
    row.id = empleado.identificacion.trim();

    var cellIdentificacion = row.insertCell(0);
    cellIdentificacion.textContent = empleado.identificacion.trim();
    cellIdentificacion.style.textAlign = "center";
    cellIdentificacion.className = "text-sm";

    var cellNombre = row.insertCell(1);
    cellNombre.textContent = empleado.nombre + ' ' + empleado.apellido1 + ' ' + empleado.apellido2;
    cellNombre.style.textAlign = "center";
    cellNombre.className = "text-sm";


    var cellAcciones = row.insertCell(2);
    cellAcciones.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente

    var btnEditar = document.createElement("button");
    btnEditar.className = "btnEditar btn btn-link";
    btnEditar.innerHTML = 'Editar <i class="fas fa-pencil-alt"></i>';
    // Agregar el contenedor div a la celda de acciones
    cellAcciones.appendChild(btnEditar);

}



function procesarRespuestaEmpleado(data) {

    var tbody = document.getElementById("listaEmpleados");

    tbody.innerHTML = "";

    //verificar si se retorno algo en el data
    if (data.vacio) {

        //no hay titulos para mostrar
        var mensajeTr = document.createElement("tr");
        var mensajeTd = document.createElement("td");
        mensajeTd.colSpan = 3;
        mensajeTd.className = "text-center";
        mensajeTd.textContent = "No existe empleado con ese numero de identificación";

        mensajeTr.appendChild(mensajeTd);
        tbody.appendChild(mensajeTr);
    }
    else {
        agregarEmpleadoALaTabla(data);
    }

}


function CargarDatosPersona(identificacion) {


    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/GetPersona");

    $.ajax({
        type: "Get",//tipo de solicitud
        url: url, //direccion del controlador
        data: {//se envia el parametro
            identificacion
        },
        success: function (data) {//en caso de que sale bien

            if (data.vacio) { //si data.error contiene algo
                alert('No existe persona con ese numero de identificación')
                $("#idEmpleadoForm").val('');
                $("#loader-container").hide();


            } else {


                // asignar valores a los inputs de la consulta
                $("#nombre").val(data.nombre).prop("disabled", true);
                $("#apellidos").val(data.apellido1 + " " + data.apellido2).prop("disabled", true);
                $("#genero").val((data.genero == '1' ? 1 : 2)).prop("disabled", true);
                $("#nacimiento").val(cambiarFormatoFecha(data.fechaNacimiento)).prop("disabled", true);

                //mostrar el form
                $("#empleadoForm").removeAttr("hidden");


                $("#provincias").focus();

                $("#loader-container").hide();
            }
        },
        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
            $("#loader-container").hide();
        }
    });
}




function MascarasPaginaAgregarEmpleado() {
    // Aplicar la máscara al campo de teléfono
    $('#telefono').inputmask('9999-9999');
    $('#nacimiento').inputmask('99/99/9999', { placeholder: 'dd/mm/yyyy' });
}

// Función para cambiar el formato de fecha
function cambiarFormatoFecha(fechaEnFormatoOriginal) {
    // Dividir la cadena en mes, día y año

    var partes = fechaEnFormatoOriginal.split('/');

    // Crear una nueva cadena con el formato deseado
    var fechaEnNuevoFormato = partes[1] + '/' + partes[0] + '/' + partes[2];

    return fechaEnNuevoFormato;
}


function LimpiarCampos() {
    $("#idEmpleadoForm").val('');
    $("#nombre").val('');
    $("#apellidos").val('');
    $("#correo").val('');
    $("#telefono").val('');
    $("#nacimiento").val('');
    $("#direccion").val('');
    $("#genero").val('1');
    $("#provincias").val('0');
    $("#cantones").val('0');
    $("#distritos").val('0');
    $("#tipoEmpleado").val('');
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

function CargarProvincia() {
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


            // Llena el ComboBox con las provincias recibidas de la API
            data.forEach(provincia => {
                provinciasDropdown.append($("<option>").val(provincia.idProvincia).text(provincia.nombreProvincia));
            });



        })
        .catch(error => {
            console.error(error);
        });
}


function CargarDistrito(idCanton) {
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

function validarCamposAgregarEmpleado() {
    // Obtener los valores de los campos


    var typeIdentificacion = $("#identificationTypeForm").val();
    var identificacion = $("#idEmpleadoForm").val();

    if (!ValidarIdentificacion(identificacion, typeIdentificacion)) {

        alert('Identificación incorrecta');
        return false;

    } 
    identificacion = identificacion.replace(/[-_]/g, '');

    var nombre = $("#nombre").val();
    var apellidos = $("#apellidos").val();
    var nacimiento = $("#nacimiento").val();
    var provincia = $("#provincias").val();
    var canton = $("#cantones").val();
    var distrito = $("#distritos").val();
    var direccion = $("#direccion").val();
    var correo = $("#correo").val();
    var telefono = $("#telefono").val();
    var tipoEmpleado = $("#tipoEmpleado").val();


    if (!validarCorreo(correo)) {

        alert('Correo no válido');
        return false;
    } 

    if (!validarTelefono(telefono)) {

        alert('Teléfono no válido');
        return false;

    } 

    // Validar que todos los campos estén completos
    if (typeIdentificacion === "" || identificacion === "" || nombre === "" || apellidos === "" ||
        nacimiento === "" || provincia === "0" || canton === "0" || distrito === "0" ||
        direccion === "" || tipoEmpleado === "") {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return false;
    }

    var apellidosArray = apellidos.split(" ");
    if (apellidosArray.length != 2) {
        alert("Debes de ingresar los dos apellidos");

        return false;

    }

    return true;
}


function validarCamposEditarEmpleado() {
    // Obtener los valores de los campos

    var provincia = $("#provincias").val();
    var canton = $("#cantones").val();
    var distrito = $("#distritos").val();
    var direccion = $("#direccion").val();
    var correo = $("#correo").val();
    var telefono = $("#telefono").val();
    var tipoEmpleado = $("#tipoEmpleado").val();

    if (!validarCorreo(correo)) {

        alert('Correo no válido');
        return false;
    }

    if (!validarTelefono(telefono)) {

        alert('Teléfono no válido');
        return false;

    }

    // Validar que todos los campos estén completos
    if (provincia === "0" || canton === "0" || distrito === "0" ||
        direccion === "" || tipoEmpleado === "") {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return false;
    }



    return true;
}

function validarCorreo(correo) {

    // Expresión regular para validar el formato de correo
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Devuelve true si el correo es válido, de lo contrario, devuelve false
    return regexCorreo.test(correo);
}

function validarTelefono(telefono) {

    var regexTelefono = /^\d{4}-\d{4}$/;

    // Devuelve true si el teléfono es válido, de lo contrario, devuelve false
    return regexTelefono.test(telefono);
}

function AgregarEmpleado() {
    //desactivamos el disabled a los campo para que se envien correctamente
    $("#nombre").prop("disabled", false);
    $("#apellidos").prop("disabled", false);
    $("#genero").prop("disabled", false);
    $("#nacimiento").prop("disabled", false);

    // Obtener el formulario y los datos del formulario
    var form = $("#empleadoForm")[0];
    var formData = new FormData(form);
    formData.append("identificacion", $("#idEmpleadoForm").val());
    formData.append("identificacionReclutador", $("#identification").val());



    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/AgregarEmpleado");

    $.ajax({
        method: "POST",//tipo de solicitud
        url: url,
        data: formData,
        processData: false,  // Necesario para enviar FormData correctamente
        contentType: false,  // Necesario para enviar FormData correctamente
        success: function (data) {//en caso de que sale bien

            if (data.existe) {
                alert(data.existe);
            }
            else {
                alert('Empleado Agregado exitosamente');
                LimpiarCampos();
                $('#agregarEmpleadoModal').modal('hide');
                $("#empleadoForm").attr("hidden", true);
                $("#btnAgregarEmpleado").attr("hidden", true);


            }

        },

        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });

}


function EditarEmpleado() {

    // Obtener el formulario y los datos del formulario
    var form = $("#empleadoForm")[0];
    var formData = new FormData(form);
    formData.append("identificacion", $("#idEmpleadoForm").val());
    formData.append("identificacionReclutador", $("#identification").val());


    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/EditarEmpleado");

    $.ajax({
        method: "PUT",//tipo de solicitud
        url: url,
        data: formData,
        processData: false,  // Necesario para enviar FormData correctamente
        contentType: false,  // Necesario para enviar FormData correctamente
        success: function (data) {//en caso de que sale bien

            alert('Empleado Actualizado exitosamente');
        },

        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
        }
    });

}


function CargarDatosUbicaciones(provincia, canton, distrito) {

        //cargar provincias
        //URL de tu API que devuelve las provincias
        var apiProvincia = "https://apisproyectorg.somee.com/api/Ubicaciones/Provincias/";

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

                // Ahora que las opciones se han cargado, establece la selección
                provinciasDropdown.val((provincia != 0 && provincia != null) ? provincia : 0);

            })
            .catch(error => {
                console.error(error);
            });


        //cargar los lugares del exopediente
        if (provincia != null && provincia != 0) {
            const apiCanton = 'https://apisproyectorg.somee.com/api/Ubicaciones/Cantones/';

            fetch(apiCanton + (provincia))
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pudo obtener los cantones.');
                    }
                    return response.json();
                })
                .then(data => {


                    // Llena el ComboBox con los cantones recibidos de la API
                    data.forEach(cantones => {
                        cantonesDropdown.append($("<option>").val(cantones.idCanton).text(cantones.nombreCanton));
                    });

                    $("#cantones").val(canton);
                })
                .catch(error => {
                    console.error(error);
                });
        }


        if (canton != null && canton != 0) {
            const apiDistrito = 'https://apisproyectorg.somee.com/api/Ubicaciones/Distritos/';

            fetch(apiDistrito + (canton))
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pudo obtener los distritos.');
                    }
                    return response.json();
                })
                .then(data => {


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


function MostrarDetallesEmpleado(idEmpleado) {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/GetEmpleado");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            identificacion: idEmpleado
        },
        success: function (data) {

            $("#idEmpleadoForm").val(idEmpleado);
            $("#nombre").val(data.nombre);
            $("#apellidos").val(data.apellido1 + ' ' + data.apellido2);
            $("#genero").val(data.genero);
            $("#direccion").val(data.direccion);
            $("#correo").val(data.correo);
            $("#telefono").val(data.telefono);
            $("#tipoEmpleado").val(data.tipoEmpleado);
            $("#estado").val(data.estado == true ? '1':'0');

            var partesFecha = data.fechaNacimiento.split('T');
            var nacimiento = partesFecha[0].split('-');
            $("#nacimiento").val(nacimiento[2] + "/" + nacimiento[1] + "/" + nacimiento[0]);

            CargarDatosUbicaciones(data.idProvincia, data.idCanton, data.idDistrito);


            //poner en disabled campos que no se deberian poder editar
            $("#nombre").prop("disabled", true);
            $("#apellidos").prop("disabled", true);
            $("#genero").prop("disabled", true);
            $("#nacimiento").prop("disabled", true);


        },
        error: function (error) {
            console.log(error);
        
        }
    });
}



//funciones seccion expedientesEmpleado

function ObtenerListaEmpleados() {


    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/GetEmpleadosListaGeneral");

    $.ajax({
        type: "Get",//tipo de solicitud
        url: url, //direccion del controlador,
        data: {
            identificacionReclutador: $("#identification").val()
        },
        success: function (data) {//en caso de que sale bien

            procesarRespuestaEmpleadoExpedientes(data);
            $("#loader-container").hide();
        },
        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
            $("#loader-container").hide();
        }
    });
}

function CargarDatosEmpleadoExpediente(identificacion) {


    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/GetEmpleadoGeneral");

    $.ajax({
        type: "Get",//tipo de solicitud
        url: url, //direccion del controlador
        data: {//se envia el parametro
            identificacion,
            identificacionReclutador: $("#identification").val()
        },
        success: function (data) {//en caso de que sale bien

            procesarRespuestaEmpleadoExpedientes(data);
            $("#loader-container").hide();
        },
        error: function (xhr, status, error) { //error en la solicitud de ajax
            console.error(error);
            $("#loader-container").hide();
        }
    });
}


function agregarEmpleadoALaTablaExpedientes(empleado) {

    var tbody = document.getElementById("listaEmpleados");

    var row = tbody.insertRow(-1);
    row.id = empleado.id;

    var cellIdentificacion = row.insertCell(0);
    cellIdentificacion.textContent = empleado.identificacion.trim();
    cellIdentificacion.style.textAlign = "center";
    cellIdentificacion.className = "text-sm";

    var cellDatos = row.insertCell(1);
    cellDatos.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente
    var btnDatos = document.createElement("button");
    btnDatos.className = "btnDatosPersonales btn btn-link";
    btnDatos.innerHTML = 'Ver';
    // Agregar el contenedor div a la celda de acciones
    cellDatos.appendChild(btnDatos);

    var cellEvaluacion = row.insertCell(2);
    cellEvaluacion.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente
    var btnEvaluacion = document.createElement("button");
    btnEvaluacion.className = "btnEvaluacion btn btn-link";
    btnEvaluacion.innerHTML = 'Ver';
    // Agregar el contenedor div a la celda de acciones
    cellEvaluacion.appendChild(btnEvaluacion);


    var cellContrato = row.insertCell(3);
    cellContrato.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente
    var btnContrato = document.createElement("button");
    btnContrato.className = "btnContrato btn btn-link";
    btnContrato.innerHTML = 'Ver';
    // Agregar el contenedor div a la celda de acciones
    cellContrato.appendChild(btnContrato);


    var cellEntrevista = row.insertCell(4);
    cellEntrevista.style.textAlign = "center"; // Estilo en línea para centrar horizontalmente
    var btnEntrevista = document.createElement("button");
    btnEntrevista.className = "btnEntrevista btn btn-link";
    btnEntrevista.innerHTML = 'Ver';
    // Agregar el contenedor div a la celda de acciones
    cellEntrevista.appendChild(btnEntrevista);

}



function procesarRespuestaEmpleadoExpedientes(data) {

    var tbody = document.getElementById("listaEmpleados");

    tbody.innerHTML = "";

    //verificar si se retorno algo en el data
    if (data.vacio) {

        //no hay titulos para mostrar
        var mensajeTr = document.createElement("tr");
        var mensajeTd = document.createElement("td");
        mensajeTd.colSpan = 5;
        mensajeTd.className = "text-center";
        mensajeTd.textContent = "No existe empleado con ese numero de identificación";

        mensajeTr.appendChild(mensajeTd);
        tbody.appendChild(mensajeTr);
    }
    else {
        if (data.empleadoOferente) {
            if (Array.isArray(data.empleadoOferente)) {
     
                data.empleadoOferente.forEach(function (empleadoOferente) {
                    agregarEmpleadoALaTablaExpedientes(empleadoOferente);
                });
            } else {

                agregarEmpleadoALaTablaExpedientes(data.empleadoOferente);
            }
        }

        if (data.empleadoExterno) {
 
            if (Array.isArray(data.empleadoExterno)) {
                data.empleadoExterno.forEach(function (empleadoExterno) {
                    agregarEmpleadoALaTablaExpedientes(empleadoExterno);
                });
            } else {

                agregarEmpleadoALaTablaExpedientes(data.empleadoExterno);
            }
        }
       
  

    }

}



function MostrarDatosPersonalesEmpleado(idEmpleado) {
    let url = ObtenerUrlSolicitud('Reclutador', "Reclutador/GetDatosPersonalesEmpleado");

    $.ajax({
        type: "GET",
        url: url,
        data: {
            idEmpleado
        },
        success: function (data) {

            $("#nombre").val(data.empleado.nombre);
            $("#apellidos").val(data.empleado.apellidos);
            $("#genero").val(data.empleado.genero);
            $("#direccion").val(data.empleado.direccion);
            $("#correo").val(data.empleado.correo);
            $("#telefono").val(data.empleado.telefono);
            $("#tipoEmpleado").val(data.empleado.tipoEmpleado);
            $("#estado").val( (data.empleado.estado==1?'Activo':'Inactivo') );

            var partesFecha = data.empleado.fechaNacimiento.split('T');
            var nacimiento = partesFecha[0].split('-');
            $("#nacimiento").val(nacimiento[2] + "/" + nacimiento[1] + "/" + nacimiento[0]);

            CargarDatosUbicaciones(data.empleado.idProvincia, data.empleado.idCanton, data.empleado.idDistrito);


        },
        error: function (error) {
            console.log(error);
        }
    });
}

function limpiarCamposVerDatosPersonales(){
    // Limpiar campos de Información Personal
    $('#nombre, #apellidos, #nacimiento, #genero').val('');

    // Limpiar campos de Ubicación
    $('#provincias, #cantones, #distritos, #direccion').val('');

    // Limpiar campos de Contacto
    $('#correo, #telefono').val('');

    // Limpiar campos Laborales
    $('#tipoEmpleado, #estado').val('');
}