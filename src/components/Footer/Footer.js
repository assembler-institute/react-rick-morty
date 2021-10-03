import React from "react";

function Footer() {
	return (
		<footer className="py-5 mt-5 bg-dark text-white container-fluid">
			<div className="row">
				<div className="col col-12 text-center">
					<p className="m-0">Assembler School &copy; {new Date().getFullYear()}</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
