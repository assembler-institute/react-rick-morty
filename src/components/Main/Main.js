import React from "react";
import styled, { css } from "styled-components";
import wallpaper from "../../images/wallpaper.jpg";
import Container from "../Container";

const MainStyled = styled.main`
	min-height: calc(100vh - 8rem);
	background-color: purple;
	background-image: url(${wallpaper});
	background-size: cover;
	background-position: center;
	background-blend-mode: multiply;
	background-attachment: fixed;

	color: ${({ theme }) => theme.palette.dark.contrast};
`;

const ContainerStyles = css`
	padding: 1rem;
`;

export default function Main({ children, ...props }) {
	return (
		<MainStyled {...props}>
			<Container xs sm md lg xl styles={ContainerStyles}>
				{children}
			</Container>
		</MainStyled>
	);
}
