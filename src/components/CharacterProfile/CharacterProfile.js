import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";

import styled from "styled-components";
import Flex from "../Flex";

const Article = styled.article`
	margin: 0 auto;
	width: min-content;

	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto;

	border: 1px solid ${({ theme }) => theme.palette.dark.main};
	border-radius: 4px;
	background-color: ${({ theme }) => theme.palette.dark.secondary};

	@media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		grid-template-columns: 1fr 1fr;
	}
`;

const Image = styled.img`
	display: block;
	width: 15rem;
	border-radius: 3px;
	height: auto;
	object-fit: contain;
`;

const InfoGrid = styled.div`
	width: 15rem;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto;
	gap: 0.5rem;
	padding: 0.5rem 1rem;

	@media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		width: 30rem;
		grid-template-columns: repeat(2, 1fr);
	}
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

	font-size: 1.5rem;
	font-family: "Gemunu Libre";
	font-weight: 700;
`;

const DataField = styled.span`
	display: block;

	font-family: "Gemunu Libre";
	font-weight: 300;
`;

export default function CharacterProfile(props) {
	const { image, name, species, status, origin, location } = props;

	return (
		/* TODO -- Cambiar estilos */
		<Article>
			<Image src={image} alt="" />
			<section>
				<Name>{name}</Name>
				<InfoGrid>
					<Flex alignItems="start" direction="column">
						<PropertyField>Character type</PropertyField>
						<DataField>{species}</DataField>
					</Flex>
					<Flex alignItems="start" direction="column">
						<PropertyField>Status</PropertyField>
						<DataField>{status}</DataField>
					</Flex>
					<Flex alignItems="start" direction="column">
						<PropertyField>Last known location</PropertyField>
						<DataField>
							{location.name} {location.url && <Link to={`${routes.LOCATION}/${location.url.split("/").pop()}`}>&#128279;</Link>}
						</DataField>
					</Flex>
					<Flex alignItems="start" direction="column">
						<PropertyField>Origin location</PropertyField>
						<DataField>
							{origin.name} {origin.url && <Link to={`${routes.LOCATION}/${origin.url.split("/").pop()}`}>&#128279;</Link>}
						</DataField>
					</Flex>
				</InfoGrid>
			</section>
		</Article>
	);
}
