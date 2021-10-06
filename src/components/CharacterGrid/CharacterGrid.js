import styled from "styled-components";

const CharacterGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-template-rows: auto;
	justify-items: center;
	align-items: start;

	padding: 1rem;
	gap: 1rem 2rem;

	@media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

export default CharacterGrid;
