import styled, { css } from "styled-components";

const Button = styled.button`
	outline: none;
	border: none;

	display: block;
	padding: 0.5rem 0.75rem;

	font-size: 1.25rem;
	text-align: center;

	border-radius: 4px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
	background: ${(props) => props.theme.palette.dark.contrast};
	color: ${(props) => props.theme.palette.dark.main};

	transition: all 0.125s ease-in-out;

	&:hover {
		background: ${(props) => props.theme.palette.dark.main};
		color: ${(props) => props.theme.palette.dark.contrast};
	}

	${(props) =>
		props.disabled &&
		css`
			pointer-events: none;
			opacity: 0.75;
		`}
`;

export default Button;
