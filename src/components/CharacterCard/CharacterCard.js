import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";

import Flex from "../Flex";

import aliveImg from "../../images/heartbeat.png";
import deadImg from "../../images/dead.png";

import styled from "styled-components";

const Article = styled.article`
	border: 1px solid ${({ theme }) => theme.palette.dark.main};
	border-radius: 4px;
	background-color: ${({ theme }) => theme.palette.dark.secondary};
`;

const Image = styled.img`
	display: block;
	width: 100%;
	object-fit: cover;
	border-radius: 4px 4px 0 0;
`;

const Icon = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	vertical-align: text-bottom;
`;

const Name = styled.h3`
	padding: 0.75rem;
	margin: 0;

	font-size: 1.25rem;
	text-align: center;
	text-transform: uppercase;

	background-color: ${({ theme }) => theme.palette.dark.main};
`;

const PropertyField = styled.span`
	display: block;

	text-align: center;
	font-family: "Gemunu Libre";
	font-weight: 700;
`;

const DataField = styled.span`
	display: block;

	text-align: center;
	font-family: "Gemunu Libre";
	font-weight: 300;
`;

function CharacterCard({ id, name, image, species, status, origin, location }) {
	return (
		<Article>
			<Link to={`${routes.CHARACTER}/${id}`}>
				<Image src={image} alt={`${name} picture`} />
			</Link>
			<Name>{name}</Name>
			<Flex direction="column" alignItems="stretch" gap="0.5rem" p="0.5rem">
				<Flex justifyContent="space-evenly" alignItems="start">
					<Flex direction="column">
						<PropertyField>Character type</PropertyField>
						<DataField>{species}</DataField>
					</Flex>
					<Flex direction="column">
						<PropertyField>Status</PropertyField>
						<DataField>
							<Icon src={status === "Alive" ? aliveImg : deadImg} />
						</DataField>
					</Flex>
				</Flex>
				<Flex direction="column">
					<PropertyField>Last known location</PropertyField>
					<DataField>
						{location.name} {location.url && <Link to={`${routes.LOCATION}/${location.url.split("/").pop()}`}>&#128279;</Link>}
					</DataField>
				</Flex>
				<Flex direction="column">
					<PropertyField>Origin location</PropertyField>
					<DataField>
						{origin.name} {origin.url && <Link to={`${routes.LOCATION}/${origin.url.split("/").pop()}`}>&#128279;</Link>}
					</DataField>
				</Flex>
			</Flex>
		</Article>
	);
}

export default CharacterCard;
