$(document).ready(function () {

    $("#btnCambiarClave").click(function (event) {
        event.preventDefault();

        ValidarDatos();      
    });

    $("#btnInactivarPerfil").click(function (event) {
        event.preventDefault();

        InactivarCuenta();

    });

    $("#btnCerrarModalInactivacion").click(function (event) {
        
        // Redirigir al menu principal
        window.location.href = "/MenuPrincipal/MenuAcceso";

    });


});


//funciones vista cambiar contraseña


function ValidarDatos() {
    if ($("#nuevaClave").val() != "" && $("#confirmarClave").val()!="") {
        if ($("#claveActual").val() == $("#clave").val()) {
            //la clave actual si esta correcta

            //ahora validar que coincida las dos claves nuevas
            if ($("#nuevaClave").val() == $("#confirmarClave").val()) {

                //acciones para cambiar la clave
                CambiarClave();


            }
            else {
                if ($("#mensaje").length) {

                    $("#mensaje").remove();
                }
                $("#btnCambiarClave").after("<p class='alert alert-danger mt-2' id='mensaje'> La claves no coinciden</p>");
                limpiarCampos();
            }


        }
        else {
            if ($("#mensaje").length) {

                $("#mensaje").remove();
            }
            $("#btnCambiarClave").after("<p class='alert alert-danger mt-2' id='mensaje'> La clave actual no esta correcta</p>");
            limpiarCampos();
        }
    }
    else {
        if ($("#mensaje").length) {

            $("#mensaje").remove();
        }
        $("#btnCambiarClave").after("<p class='alert alert-danger mt-2' id='mensaje'> No pueden estar vacios los campos</p>");

    }
    
}



function CambiarClave() {
    $.ajax({
        type: "POST",
        url: "/Oferente/CambiarClave",
        data: {
            identificacion: $("#identification").val(),
            nuevaClave: $("#nuevaClave").val()
        },
        success: function (data) {

            if (data.exito == true) {
                //sale bien
                if ($("#mensaje").length) {

                    $("#mensaje").remove();
                }
                alert("Contraseña actualizada correctamente!!");
                limpiarCampos();
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

function limpiarCampos() {
    document.getElementById("claveActual").value = "";
    document.getElementById("nuevaClave").value = "";
    document.getElementById("confirmarClave").value = "";
}


function InactivarCuenta() {
    $.ajax({
        type: "PUT",
        url: "/Oferente/InactivarCuenta",
        data: {
            identificacion: $("#identification").val()
        },
        success: function (data) {

            if (data.exito == true) {
                //sale bien la inactivacion

                //mostrar modal 
                $("#modalInactivacion").modal("show");
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