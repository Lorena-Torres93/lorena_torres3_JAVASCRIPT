document.addEventListener("DOMContentLoaded", function () {
    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const extras = document.querySelectorAll("input[name='extras']");
    const total = document.getElementById("total");
    const descuentoMensaje = document.getElementById("descuento-mensaje"); 
    const desglose = document.getElementById("desglose");
    const listaServicios = document.getElementById("lista-servicios");
    const descuentoDetalle = document.getElementById("descuento-detalle");
    const form = document.getElementById("form-presupuesto");

    function calcularPresupuesto() {
        let precioBase = parseFloat(producto.value);
        let productoSeleccionado = producto.options[producto.selectedIndex].text; // Nombre del producto seleccionado
        if (isNaN(precioBase) || precioBase <= 0) {
            total.textContent = "Por favor, seleccione un producto válido.";
            return;
        }

        let descuento = plazo.value >= 30 ? 0.1 : 0;  
        let extraCosto = 0;
        let serviciosSeleccionados = [];
        
        extras.forEach(extra => {
            if (extra.checked) {
                extraCosto += parseFloat(extra.value);
                serviciosSeleccionados.push(extra.parentElement.textContent.trim());
            }
        });

        let precioFinal = (precioBase + extraCosto) * (1 - descuento);

        // Mostrar el mensaje de descuento
        if (descuento > 0) {
            descuentoMensaje.textContent = "¡Se ha aplicado un descuento del 10% por plazo de entrega mayor o igual a 30 días!";
            descuentoMensaje.style.color = "green";
        } else {
            descuentoMensaje.textContent = "";
        }

        // Mostrar el desglose de los servicios seleccionados
        listaServicios.innerHTML = "";

        // Producto seleccionado
        let liProducto = document.createElement("li");
        liProducto.textContent = `Producto: ${productoSeleccionado} - ${precioBase.toLocaleString('es-ES', {style: 'currency', currency: 'EUR'})}`;
        listaServicios.appendChild(liProducto);

        // Extras seleccionados
        serviciosSeleccionados.forEach(servicio => {
            const li = document.createElement("li");
            li.textContent = servicio;
            listaServicios.appendChild(li);
        });

        // Mostrar el detalle del descuento
        if (descuento > 0) {
            descuentoDetalle.textContent = `Descuento aplicado: 10%`;
        } else {
            descuentoDetalle.textContent = "";
        }

        // Mostrar el presupuesto final
        total.textContent = precioFinal.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR'
        });
    }

    producto.addEventListener("change", calcularPresupuesto);
    plazo.addEventListener("input", calcularPresupuesto);
    extras.forEach(extra => extra.addEventListener("change", calcularPresupuesto));

    form.addEventListener("submit", function (event) {
        if (!document.getElementById("condiciones").checked) {
            alert("Debe aceptar las condiciones de privacidad para enviar el formulario.");
            event.preventDefault();
        }
    });

    calcularPresupuesto();
});
