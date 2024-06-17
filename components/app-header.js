import { LitElement, html, css } from "lit";
import { globalStyles } from "../global-styles.js";

import './app-nav.js';

export class AppHeader extends LitElement {

    static properties = {
        logo: {type: String},
        enlaces: {type: Object}
    }

    static styles = [
        globalStyles,
        css`
            header{
                background-color: #000;
                color: #fff;
            }
            
            a {
                text-decoration: none;
                color: #fff
            }
        `
    ]

    constructor() {
        super();

        this.logo = 'FoodApp'
    }


    render() {
        return html`
        
            <header>

                <div class="contenedor barra">

                    <a href="/">
                        <h1>${this.logo}</h1>
                    </a>
                    <app-nav></app-nav>

                </div>

            </header>

            <slot></slot>
        `;
    }
}

customElements.define('app-header', AppHeader);