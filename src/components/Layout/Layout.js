import React from "react";

import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";

function Layout({ children }) {
	return (
		<div>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</div>
	);
}

export default Layout;
