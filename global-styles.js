import { css } from "lit";

export const globalStyles = css`
    .contenedor {
        max-width: 1900px;
        margin: 0 auto;
        max-width: 90%;
        margin-bottom: 30px;
    }

    img {
        display: block;
        max-width: 100%;
        width: 400px;
        height: 300px;
        object-fit: cover;
    }

    h1 {
        font-size: 3rem;
        margin: 0;
    }

    h2 {
        font-size: 1.8rem;
    }

    .barra {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
    }
`;