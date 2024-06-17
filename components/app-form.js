import { LitElement, css, html } from "lit";
import { formStyles } from "../estilos/form-styles";
import { globalStyles } from "../global-styles";

export class AppForm extends LitElement {

    static styles = [
        formStyles,
        globalStyles,
        css`
            textarea {
                height: 200px;
            }

            .error {
                border: 2px solid #FA7070;
            }
        `
    ]

    constructor() {
        super();
    }



    _validarForm(e) {

        if (e.target.value === '') {
            e.target.placeholder = 'Este campo es obligatorio';
            e.target.classList.add('error');
        } else {
            e.target.classList.remove('error');
        }

    }


    _handleSubmit(e) {
        e.preventDefault();

        const formulario = this.shadowRoot.querySelector('#formulario');
        
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Mensaje Enviado",
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            formulario.reset()
        }, 1500);

    }

    render() {
        return html`
            <main class="contenedor">

                <form id="formulario" @submit=${this._handleSubmit}>

                    <div class="campo">
                        <label for="nombre">Nombre:</label>
                        <input id="nombre" required @blur=${this._validarForm} type="text" placeholder="Tu nombre">
                    </div>


                    <div class="campo">
                        <label for="apellidos">Apellidos:</label>
                        <input id="apellidos" required @blur=${this._validarForm} type="text" placeholder="Tus apellidos">
                    </div>


                    <div class="campo">
                        <label for="email">Email:</label>
                        <input id="email" required @blur=${this._validarForm} type="email" placeholder="Ej. correo@correo.com">
                    </div>


                    <div class="campo">
                        <label for="nombre">Mensaje:</label>
                        <textarea id="mensaje" @blur=${this._validarForm} required placeholder="Esribe tu mensaje"></textarea>
                    </div>

                    <div id="mensaje" class="alert ${this.tipo}">
                        ${this.alert}
                    </div>

                    <button type="submit" class="btnEnviar">Enviar</button>
                </form>

            </main>
        `
    }
}

customElements.define('app-form', AppForm);