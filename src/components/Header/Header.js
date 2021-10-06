import React from "react";

import ButtonLink from "../ButtonLink";
import styled from "styled-components";

import * as routes from "../../constants/routes";
import Container from "../Container";

const HeaderStyled = styled.header`
	height: 4rem;

	display: flex;
	flex-direction: column;
	justify-content: center;

	background: ${({ theme }) => theme.palette.dark.main};
	color: ${({ theme }) => theme.palette.dark.contrast};
`;

const List = styled.ul`
	padding: 0;
	margin: 0;

	display: flex;
	flex-direction: row;
	gap: 1rem;

	list-style: none;
`;

export default function Header({ ...props }) {
	return (
		<HeaderStyled {...props}>
			<Container xs sm md lg xl>
				<nav>
					<List>
						<li>
							<ButtonLink to={routes.HOME}>Home</ButtonLink>
						</li>
					</List>
				</nav>
			</Container>
		</HeaderStyled>
	);
}
