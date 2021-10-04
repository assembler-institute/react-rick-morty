import "./SpinnerLoader.scss";

export default function SpinnerLoader(props) {
	return (
		<div className="SpinnerLoader__wrapper col col-12 d-flex justify-content-center">
			<div className="SpinnerLoader spinner-border text-primary" role="status">
				<span className="sr-only"></span>
				<span>Loading...</span>
			</div>
		</div>
	);
}
