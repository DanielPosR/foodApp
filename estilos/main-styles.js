import { css } from "lit";

export const mainStyles = css`
    h2 {
        text-align: center;
        font-weight: bold;
        font-size: 30px;
        color: #3c3c3c;
    }

    .nueva-receta {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        transition: all .3s ease-in-out
    }

    .nueva-receta:hover {
        
    transform: rotate(90deg);
    }

    .nueva-receta img {
        width: 40px;
        height: auto;
        background-color: #000;
        border-radius: 50%;
        cursor: pointer;
    }

    @media (min-width: 768px) {
        .nueva-receta img {
                width: 50px;
            }
        }
`;