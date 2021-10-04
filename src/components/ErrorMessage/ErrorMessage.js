import image from "../../images/error-image.png";

export default function ErrorMessage(props) {
	return (
		<div className="col col-12 d-flex flex-column align-items-center justify-content-center" style={{ height: "70vh" }}>
			<div className="card" style={{ maxWidth: "30rem" }}>
				<img src={image} className="card-img-top" alt="Rick and Morty messed up" />
				<div className="card-body">
					<p className="card-text text-danger text-center display-5">OOPS! It seems that something went wrong :(</p>
				</div>
			</div>
		</div>
	);
}
