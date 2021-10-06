import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
	height: 4rem;

	display: flex;
	flex-direction: column;
	justify-content: center;

	background: ${({ theme }) => theme.palette.dark.main};
	color: ${({ theme }) => theme.palette.dark.contrast};
`;

const Copy = styled.p`
	margin: 0;
	text-align: center;
`;

function Footer() {
	return (
		<StyledFooter>
			<Copy>Pill done by Sanadriu, with &#9825;</Copy>
		</StyledFooter>
	);
}

export default Footer;
