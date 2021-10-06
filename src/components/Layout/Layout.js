import React from "react";

import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import styled from "styled-components";

const LayoutStyled = styled.div`
	min-height: 100vh;
`;

function Layout({ children }) {
	return (
		<LayoutStyled>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</LayoutStyled>
	);
}

export default Layout;
