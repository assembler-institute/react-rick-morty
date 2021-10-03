import React from "react";

import AppHeader from "../AppHeader";
import Main from "../Main";
import Footer from "../Footer";

import "./Layout.scss";

function Layout({ children }) {
	return (
		<div className="Layout d-flex flex-column justify-content-between">
			<div>
				<AppHeader />
				<Main>{children}</Main>
			</div>
			<Footer />
		</div>
	);
}

export default Layout;
