import { LitElement, html, css } from "lit";

import { navStyles } from "../estilos/nav.styles.js";

export class AppNav extends LitElement {
    static properties = {
        logo: {},
        isActive: { type: Boolean }
    }

    constructor() {
        super();

        this.logo = 'MiLogo';
        this.isActive = false;
    }

    static styles = [
        navStyles,
        css`
            .titulo {
                color: #3c3c3c;
                font-size: 20px;
                font-weight: bold;
            }

            @media(min-width: 768px) {
                .titulo {
                    display: none;
                }
            }
            a.contact {
                border-top: 1px solid gray;
                padding: 10px;
            }

            ul li:last-of-type {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            @media(min-width: 768px) {
                a.contact {
                    border: none;
                }
            }
        `
    ];

    render() {
        return html`

        <div class="menuBtn ${this.isActive ? "active" : ''}" @click=${() => this.isActive = !this.isActive}>

            <div class="bar ${this.isActive ? "active" : ''}"></div>
            <div class="bar ${this.isActive ? "active" : ''}"></div>
            <div class="bar ${this.isActive ? "active" : ''}"></div>

            <nav class="nav ${this.isActive ? "active" : ''}">

                <ul>
                    <li class="titulo">FoodApp</li>
                    
                    <li>
                        <a  href="/">Home</a>
                    </li>
                    
                    <li>
                        <a  href="/about.html">About</a>
                    </li>

                    <li>
                        ${this.isActive
                ?
                html` <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>`
                :
                html` <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>`
            }
                       
                        <a class="contact" href="/contacto.html">Contact</a>
                    </li>

                </ul>
            </nav>
        </div>
        `;
    }
}

customElements.define('app-nav', AppNav)