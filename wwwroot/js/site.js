

$('input, select').keydown(function (event) {
    // Verifica si la tecla presionada es "Enter"
    if (event.which === 13) {
        console.log("Enter presionado");
        var currentTabIndex = $(this).attr("tabindex");

        // Si es un selector (select)
        if ($(this).is('select')) {
            // Selecciona la opción actual
            $(this).find('option:selected').prop('selected', true);
        }

        var nextElement = $('[tabindex="' + (parseInt(currentTabIndex) + 1) + '"]');
        console.log(nextElement);

        if (nextElement.length > 0 && nextElement.is(":visible")) {
            nextElement.focus();
        } else {
            var tabIndex = parseInt(currentTabIndex) + 1;
            while (tabIndex <= 12) {
                var nextVisibleElement = $('[tabindex="' + tabIndex + '"]');
                if (nextVisibleElement.length > 0 && nextVisibleElement.is(":visible")) {
                    nextVisibleElement.focus();
                    break;
                }
                tabIndex++;
            }
        }

        event.preventDefault();
    }

});