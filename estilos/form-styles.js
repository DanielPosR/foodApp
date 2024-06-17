import { css } from "lit";

export const formStyles = css`
    main {
        display: flex;
        justify-content: center;
        align-items: center;
    }  

    form {
        background-color: #fff;
        max-width: 100%;
        width: 90%;
        padding: 20px;
        height: auto;
        border-radius: 10px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }

    @media(min-width: 768px) {
        form{        
            width: 40%;
        }
    }

    .campo {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 20px;
        font-size: clamp(1.5rem, 2.5vw, 2rem);
    }

    label {
        color: #000;
    }

    input, 
    textarea {
        all: unset;
        background-color: #e9e9e9;
        padding: 10px;
        border-radius: 10px;
    }

    .btnEnviar {
        border: none;
        background-color: #000;
        padding: 10px 30px;
        color: #fff;
        text-transform: uppercase;
        font-size: 15px;
        font-weight: bold;
        transition: all .3s ease-in-out;
        border-radius: 10px;
    }

    .btnEnviar:hover {
        background-color: #fa0000;
        cursor: pointer;        
    }
`;