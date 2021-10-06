import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";

import * as routes from "../../constants/routes";
import Container from "../Container";

const HeaderStyled = styled.header`
	height: 4rem;

	display: flex;
	flex-direction: column;
	justify-content: center;

	background: ${(props) => props.theme.palette.dark.main};
	color: ${(props) => props.theme.palette.dark.contrast};
`;

const List = styled.ul`
	padding: 0;
	margin: 0;

	display: flex;
	flex-direction: row;
	gap: 1rem;

	list-style: none;
`;

const Nav = styled.nav``;

const NavLink = styled(RouterNavLink)`
	display: block;
	padding: 0.25rem 0.5rem;

	font-size: 1.25rem;
	border-radius: 4px;

	box-shadow: none;
	background: none;
	color: inherit;

	transition: all 0.125s ease-in-out;

	&:hover {
		text-decoration: none;

		box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.125);
		background: ${(props) => props.theme.palette.dark.hover};
		color: ${(props) => props.theme.palette.dark.hoverContrast};
	}
`;

export default function Header({ ...props }) {
	return (
		<HeaderStyled {...props}>
			<Container xs sm md lg xl>
				<Nav>
					<List>
						<li>
							<NavLink to={routes.HOME}>Home</NavLink>
						</li>
					</List>
				</Nav>
			</Container>
		</HeaderStyled>
	);
}
