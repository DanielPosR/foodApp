import { css } from "lit";

export const recetasStyles = css`
    .recetas {
        display: flex;
        flex-direction: column;  
        gap: 3rem;  
    }

    @media(min-width: 768px) {
        .recetas {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            justify-content: center;
        }
    }

    .receta {
        display: flex;
        background-color: #fff;
        
        gap: 20px;
        border-radius: 10px;
        overflow: hidden;
    }

    @media(min-width: 768px) {
        .receta {
            flex-direction: column;
            padding: 0;
        }

        .info {
            padding: 20px;
            max-height: auto;
            height: 150px;
        }
    }
     
    .receta img {
        width: 150px;
        height: auto;
    }

    @media (min-width: 768px) {
        .receta img {
            border-radius: unset;
            width: inherit;
            height: 300px;
        }
    }

    h3 {
        font-size: clamp(1.8rem, 3vw, 2.5rem);
        text-align: center;
    }

    p {
        font-size: clamp(1.5rem, 2.5vw, 2rem)
    }

    span {
        color: #FA0000;
    }

    .eliminar {
        display: flex;
        align-items: flex-end;
    }
    
    @media (min-width: 768px) {
        .eliminar {
            justify-content: flex-end;
            padding: 10px;
        }
    }

    .acciones {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }

    .eliminar svg, 
    .editar svg {
        cursor: pointer;
    }
`;