import React, { Component } from "react";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

function withLayout(WrappedComponent) {
	class Layout extends Component {
		render() {
			return (
				<div>
					<Header />
					<Main>
						<WrappedComponent {...this.props} />
					</Main>
					<Footer />
				</div>
			);
		}
	}

	return Layout;
}

export default withLayout;
