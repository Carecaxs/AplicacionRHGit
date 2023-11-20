// Función para manejar el evento de tecla presionada
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        // Obtener el elemento que disparó el evento
        const currentElement = event.target;

        // Encontrar el siguiente elemento en el formulario
        const nextElement = getNextElement(currentElement);

        // Si hay un siguiente elemento, enfocarlo
        if (nextElement) {
            nextElement.focus();
        } else {
            // Si no hay un siguiente elemento, realizar alguna otra acción (por ejemplo, enviar el formulario)
            // Puedes agregar tu lógica aquí
        }

        // Evitar el comportamiento predeterminado del Enter (por ejemplo, enviar un formulario)
        event.preventDefault();
    }
}

// Función para obtener el siguiente elemento en el formulario
function getNextElement(currentElement) {
    // Obtener todos los elementos del documento
    const allElements = Array.from(document.querySelectorAll('input, select, textarea'));

    // Encontrar el índice del elemento actual
    const currentIndex = allElements.indexOf(currentElement);

    // Obtener el siguiente elemento
    const nextElement = allElements[currentIndex + 1];

    return nextElement;
}

// Agregar el evento "keydown" a los campos de entrada
document.querySelectorAll('input, select, textarea').forEach(function (element) {
    element.addEventListener('keydown', handleEnterKey);
});