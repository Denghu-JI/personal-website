import styled, { keyframes, css } from 'styled-components';

// Keyframes
const bounce = keyframes`
	35%, 65% {
		scale: 0.5;
	}
`;

const flip = keyframes`
	to {
		rotate: 360deg;
	}
`;

const rotate = keyframes`
	to {
		transform: rotate(90deg);
	}
`;

const floatOut = keyframes`
	to {
		transform: rotate(360deg);
	}
`;

// Global styles
export const GlobalStyle = css`
	*, *:after, *:before {
		box-sizing: border-box;
	}

	body {
		transition: background 0.25s;
		overflow: hidden;
	}

	svg {
		overflow: visible !important;
	}
`;

// Styled components
export const Button = styled.button`
	background: hsl(260, 97%, 12%);
	font-size: 2rem;
	font-weight: 500;
	border: 0;
	cursor: pointer;
	padding: 0.9em 1.3em;
	display: flex;
	align-items: center;
	gap: 0.25em;
	white-space: nowrap;
	border-radius: 100px;
	position: relative;
	box-shadow: 0 0 0em 0em hsl(260, 97%, 61% / 0.75);
	transition: box-shadow 0.25s, transform 0.25s, background 0.25s;
	transform: scale(1.1);

	&:active {
		transform: scale(1);
	}

	&:hover path, &:focus-visible path {
		animation-name: ${bounce};
	}
	
	&:before {
		content: "";
		position: absolute;
		inset: -0.25em;
		z-index: -1;
		border: 0.25em solid hsl(260, 97%, 50% / 0.5);
		border-radius: 100px;
		transition: opacity 0.25s;
	}
`;

export const Sparkle = styled.div`
    path {
        color: hsl(0 0% calc((var(--active, 0) * 70%) + var(--base)));
        transform-box: fill-box;
        transform-origin: center;
        fill: currentColor;
        stroke: currentColor;
        animation-delay: calc((var(--transition) * 1.5) + (var(--delay) * 1s));
        animation-duration: 0.6s;
        transition: color var(--transition);
    }

    path:nth-of-type(1) {
        --scale: 0.5;
        --delay: 0.1;
        --base: 40%;
    }

    path:nth-of-type(2) {
        --scale: 1.5;
        --delay: 0.2;
        --base: 20%;
    }

    path:nth-of-type(3) {
        --scale: 2.5;
        --delay: 0.35;
        --base: 30%;
    }
`;

export const Spark = styled.div`
    position: absolute;
    inset: 0;
    border-radius: 100px;
    rotate: 0deg;
    overflow: hidden;
    mask: linear-gradient(white, transparent 50%);
    animation: ${flip} calc(var(--spark) * 2) infinite steps(2, end);

    &:before {
        content: "";
        position: absolute;
        width: 200%;
        aspect-ratio: 1;
        top: 0%;
        left: 50%;
        translate: -50% -15%;
        rotate: 0;
        transform: rotate(-90deg);
        opacity: calc((var(--active)) + 0.4);
        background: conic-gradient(
            from 0deg,
            transparent 0 340deg,
            white 360deg
        );
        transition: opacity var(--transition);
        animation: ${rotate} var(--spark) linear infinite both;
    }

    &:after {
        content: "";
        position: absolute;
        inset: var(--cut);
        border-radius: 100px;
    }
`;

export const Backdrop = styled.div`
    position: absolute;
    inset: var(--cut);
    background: var(--bg);
    border-radius: 100px;
    transition: background var(--transition);
`;


export const Bodydrop = styled.div`
    background: hsl(260, calc(var(--active) * 97%), 6%);
    position: fixed;
    inset: 0;
    z-index: -1;
`;

export const SparkleButton = styled.div`
    position: relative;
`;

export const ParticlePen = styled.div`
    position: absolute;
    width: 200%;
    aspect-ratio: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-mask: radial-gradient(white, transparent 65%);
    z-index: -1;
    opacity: var(--active, 0);
    transition: opacity 0.25s;
`;

export const Particle = styled.div`
    fill: white;
    width: calc(var(--size, 0.25) * 1rem);
    aspect-ratio: 1;
    position: absolute;
    top: calc(var(--y) * 1%);
    left: calc(var(--x) * 1%);
    opacity: var(--alpha, 1);
    animation: ${floatOut} calc(var(--duration, 1) * 1s) calc(var(--delay) * -1s) infinite linear;
    transform-origin: var(--origin-x, 1000%) var(--origin-y, 1000%);
    z-index: -1;
    animation-play-state: var(--play-state, paused);

    &:nth-of-type(even) {
        animation-direction: reverse;
    }

    path {
        fill: hsl(0, 0%, 90%);
        stroke: none;
    }
`;

export const Text = styled.div`
    transform: translate(2%, -6%);
    letter-spacing: 0.01ch;
    background: linear-gradient(90deg, hsl(0, 0%, calc((var(--active) * 100%) + 65%)), hsl(0, 0%, calc((var(--active) * 100%) + 26%)));
    -webkit-background-clip: text;
    color: transparent;
    transition: background 0.25s;
`;

export const ButtonSvg = styled.svg`
    inline-size: 1.25em;
    transform: translate(-25%, -5%);
`;