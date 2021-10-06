import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
	padding: 1.5rem;

	background: ${(props) => props.theme.palette.dark.main};
	color: ${(props) => props.theme.palette.dark.contrast};
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
