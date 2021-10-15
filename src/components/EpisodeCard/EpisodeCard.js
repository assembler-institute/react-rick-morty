import React from "react";
import { Link } from "react-router-dom";

import * as routes from "../../constants/routes";
import Flex from "../Flex";

import styled from "styled-components";

const Article = styled.article`
	border: 1px solid ${({ theme }) => theme.palette.dark.main};
	border-radius: 4px;
	background-color: rgba(64, 64, 64, 0.5);
`;

const Name = styled.h3`
	padding: 0.4rem;
	margin: 0;

	font-size: 1.25rem;
	background-color: ${({ theme }) => theme.palette.dark.main};
`;

const Info = styled.p`
	padding: 0.4rem;
	margin: 0;
`;

function EpisodeCard({ id, name, airDate, episode }) {
	return (
		<Article>
			<Link to={`${routes.EPISODE}/${id}`}>
				<Name>{name}</Name>
			</Link>
			<Flex justifyContent="space-between">
				<Info>{airDate}</Info>
				<Info>{episode}</Info>
			</Flex>
		</Article>
	);
}

export default EpisodeCard;
