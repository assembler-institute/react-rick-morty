import styled, { css } from "styled-components";

const Container = styled.div`
	width: 100%;
	margin: 0 auto;

	${(props) =>
		props.xs &&
		css`
			@media (min-width: ${props.theme.breakpoints.xs}) {
				width: ${props.theme.breakpoints.xs};
			}
		`}

	${(props) =>
		props.sm &&
		css`
			@media (min-width: ${props.theme.breakpoints.sm}) {
				width: ${props.theme.breakpoints.sm};
			}
		`}

	${(props) =>
		props.md &&
		css`
			@media (min-width: ${props.theme.breakpoints.md}) {
				width: ${props.theme.breakpoints.md};
			}
		`}

	${(props) =>
		props.lg &&
		css`
			@media (min-width: ${props.theme.breakpoints.lg}) {
				width: ${props.theme.breakpoints.lg};
			}
		`}

	${(props) =>
		props.xl &&
		css`
			@media (min-width: ${props.theme.breakpoints.xl}) {
				width: ${props.theme.breakpoints.xl};
			}
		`}

	${(props) => props.styles}
`;

export default Container;
