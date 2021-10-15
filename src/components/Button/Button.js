import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const ButtonStyle = css`
	outline: none;
	border: none;

	display: block;
	padding: 0.25rem 0.5rem;
	min-width: 6rem;

	font-size: 1.25rem;
	text-align: center;

	border-radius: 4px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
	background: ${({ theme, $light }) => ($light ? theme.palette.dark.contrast : theme.palette.dark.main)};
	color: ${({ theme, $light }) => ($light ? theme.palette.dark.main : theme.palette.dark.contrast)};

	transition: all 0.125s ease-in-out;

	&:hover {
		text-decoration: none;

		background: ${({ theme, $light }) => ($light ? theme.palette.dark.main : theme.palette.dark.contrast)};
		color: ${({ theme, $light }) => ($light ? theme.palette.dark.contrast : theme.palette.dark.main)};
	}

	${(props) =>
		props.disabled &&
		css`
			pointer-events: none;
			opacity: 0.75;
		`}
`;

const ButtonBasic = styled.button`
	${ButtonStyle}
`;

const ButtonLink = styled(Link)`
	${ButtonStyle}
`;

export { ButtonBasic, ButtonLink };
