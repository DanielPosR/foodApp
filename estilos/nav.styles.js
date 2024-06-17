import { css } from "lit";

export const navStyles = css`
    .menuBtn {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        padding: 10px;
        position: relative;
    }

    @media (min-width: 768px) {
        .menuBtn {
            position: inherit;
            padding: 0;
        }
    }

    .bar {
        width: 30px;
        height: 3px;
        background-color: #fff;
        margin: 1px;
        transition: 0.4s;
    }

    .bar:nth-child(1).active {
    transform: rotate(45deg);
    }

    .bar:nth-child(2).active {
    transform: rotate(-45deg);
    }

    .bar:nth-child(3).active {
    display: none;
    }



    @media (min-width: 768px) {
    .bar {
        display: none;
    }
    }

    .nav {
        position: fixed;
        top: 0;
        left: -100%;
        width: 25rem;
        height: 100%;
        transition: 0.4s;
        background-color: #fff;
        color: #000;
        text-align: center;
        z-index: 1;
    }

    @media (min-width: 768px) {
    .nav {
        position: inherit;
        max-width: 100%;
        width: 95%;
        background-color: transparent;
    }

    .nav ul {
        display: flex;
        align-items: center;
        gap: 3rem;
    }
    }

    .nav.active {
    left: 0;
    }

    .nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    }

    .nav li {
        padding: 1.5rem;
        margin: 0;
    }

    @media (min-width: 768px) {
    .nav li {
        padding: 0;
    }
    }

    .nav a {
    color: gray;
    text-decoration: none;
    font-size: 1.8rem;
    font-weight: normal;
    transition: all .3s ease-in;
    }

    @media (min-width: 768px) {
        .nav a {
            color: #fff;
        }
    }

    .nav a:hover {
        color: #fa7070;
    }

    .nav ul {
        margin-top: 2rem;
    }

    @media (min-width: 768px) {
        .nav ul {
            margin-top: 0;
        }
    }
`