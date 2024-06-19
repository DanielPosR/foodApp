import { LitElement, html } from "lit";
import { map } from "lit/directives/map.js";
import { recetasStyles } from '../estilos/recetas-styles.js';
import { globalStyles } from '../global-styles.js';



export class AppRecetas extends LitElement {

    static properties = {
        recetas: { type: Object },
        url: { type: String },
        modal: { type: Boolean },
        nuevaReceta: { type: Object }
    }

    static styles = [
        globalStyles,
        recetasStyles
    ]

    constructor() {
        super();
        this.recetas = [];
        this.url = "http://localhost:3000/recetas";
        this.modal = false;
        this.nuevaReceta = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this.obtenerRecetas();
    }

    async obtenerRecetas() {
        const respuesta = await fetch(this.url);
        const resultado = await respuesta.json();

        return this.recetas = resultado.recetas;
    }


    render() {
        return html`
            <div class="recetas">
                ${map(this.recetas, (receta) => {

            return html`
                                
                        <div class="receta">
                            <img src=${receta.img} alt="Imagen sobre ${receta.nombre}"/>

                            <div class="info">
                                <h3>${receta.nombre}</h3>

                                <p><span>Ingredientes: </span>${receta.ingredientes}</p>
                            </div>


                            <div class="acciones">

                                <div class="editar" @click=${() => this._editForm(receta.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                                </div>

                                <div class="eliminar" @click=${(e) => this._deleteRecipe(e, receta.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FA0000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                </div>

                            </div>
                        </div>
                    `;
        })}

                <slot @click=${() => this._mostrarForm()} name="boton"></slot>
                
            </div>
        `;
    }

    async _mostrarForm() {
        const { value: formValues } = await Swal.fire({
            title: "Nueva Receta",
            html: `
              <input id="nombre"  class="swal2-input" placeholder="Nombre Receta">
              <input id="ing"  class="swal2-input" placeholder="Ingredientes, ej. sal, aceite, agua..">
              <input id="imgURL" class="swal2-input" placeholder="URL imagen, ej. http://recetas.com/imagen.jpg">
            `,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Añadir Receta',
            confirmButtonColor: '#FA0000',
            focusConfirm: false,
            preConfirm: () => {

                const nombre = document.getElementById("nombre").value;
                const ingredientes = document.getElementById("ing").value;
                let imgURL = document.getElementById("imgURL").value;

                if (!nombre || !ingredientes || !imgURL) {
                    Swal.showValidationMessage('Por favor, completa todos los campos');
                    return null;
                }

                if (!imgURL.startsWith('http')) {
                    imgURL = null;
                }

                const id = Date.now(Math.floor(Math.random() * 10));
                return {
                    id,
                    nombre,
                    ingredientes,
                    img: imgURL ?? 'https://static.vecteezy.com/system/resources/previews/025/919/549/non_2x/cookbook-of-recipes-cartoon-illustration-vector.jpg'
                };

            }
        });

        this.nuevaReceta = formValues ?? '';
        this._addRecipe();
    }



    async _addRecipe() {

        if (this.nuevaReceta) {
            try {
                const respuesta = await fetch(this.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.nuevaReceta)
                });

                if (!respuesta.ok) {
                    return
                }

                const nuevaReceta = await respuesta.json();
                this.recetas = [...this.recetas, nuevaReceta];

                Swal.fire('Exito', 'Receta agregada correctamente', 'success')

            } catch (error) {
                console.log(error);
                Swal.fire('Oops!', 'Algo salio mal, intelo nuevamente', 'error')
            }
        }

        //* this.recetas = [...this.recetas, this.nuevaReceta]; VERSION ESTATICA SIN FETCH
    }




    async _editForm(idEditar) {
        const recetaEditar = this.recetas.filter(receta => receta.id === idEditar);
        const { id, nombre, ingredientes, img } = recetaEditar[0];


        const { value: formValues } = await Swal.fire({
            title: "Editar Receta",
            html: `
              <input type="text" id="nombre"  class="swal2-input" placeholder="Nombre Receta" value="${nombre}">
              <input type="text" id="ing"  class="swal2-input" placeholder="Ingredientes, ej. sal, aceite, agua.." value="${ingredientes}">
              <input type="text" id="imgURL" class="swal2-input" placeholder="URL imagen, ej. http://recetas.com/imagen.jpg" value="${img}">
            `,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Guardar Cambios',
            focusConfirm: false,
            preConfirm: () => {

                const nombre = document.getElementById("nombre").value;
                const ingredientes = document.getElementById("ing").value;
                let imgURL = document.getElementById("imgURL").value;

                if (!nombre || !ingredientes || !imgURL) {
                    Swal.showValidationMessage('Por favor, completa todos los campos');
                    return null;
                }

                if (!imgURL.startsWith('http')) {
                    imgURL = null;
                }


                const idNuevo = Date.now(Math.floor(Math.random() * 10));

                return {
                    id: id ?? idNuevo,
                    nombre,
                    ingredientes,
                    img: imgURL ?? 'https://static.vecteezy.com/system/resources/previews/025/919/549/non_2x/cookbook-of-recipes-cartoon-illustration-vector.jpg'
                };

            }
        });


        this.editarReceta(id, formValues);
    }




    async editarReceta(id, recetaActualizada) {

        try {
            const response = await fetch(`${this.url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recetaActualizada)
            });

            if (!response.ok) {
                Swal.fire('Algo salío mal', 'Error al editar la receta', 'error');
            }

            const recetaEditada = await response.json();
            this.recetas = this.recetas.map(receta => receta.id === id ? recetaEditada : receta);
            Swal.fire('Exito', 'Cambios Guardados', 'success');
        } catch (error) {
            console.log(error);
        }
    }





    async _deleteRecipe(e, id) {
        if (e.target.classList.contains('eliminar')) return;

        const confirmarEliminar = await Swal.fire({
            title: "¿Deseas eliminar esta receta?",
            text: "¡Esta acción no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Borrado!",
                    text: "La receta se elimino correctamente.",
                    icon: "success"
                });

                return true;
            }
        });

        if (confirmarEliminar) {
            //this.recetas = this.recetas.filter(receta => receta.id !== id); -- VERSION ESTATICA SIN FETCH

            try {
                const respuesta = await fetch(`${this.url}/${id}`, {
                    method: 'DELETE'
                });

                if (!respuesta.ok) {
                    throw new Error('Error al eliminar la receta')
                }

                this.recetas = this.recetas.filter(receta => receta.id !== id);

            } catch (error) {
                console.log(error);
            }
        }

    }


}

customElements.define('app-recetas', AppRecetas);