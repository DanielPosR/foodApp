import { LitElement, html, css } from "lit";
import { globalStyles } from "../global-styles.js";
import { mainStyles } from "../estilos/main-styles.js";

import "./app-recetas.js";

export class AppMain extends LitElement {

    static styles = [
        globalStyles,
        mainStyles
    ]

    render() {

        return html`
        
            <main class="contenedor">
                <h2>Recetas</h2>  
                
                <app-recetas>
                    <div slot="boton" class="nueva-receta">
                        <img src="./img/add-icon.png" alt="Añadir Receta"/>
                    </div>
                <app-recetas>

            </main>
            
        `
    }
}

customElements.define('app-main', AppMain);