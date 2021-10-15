import "./SpinnerLoader.scss";

export default function SpinnerLoader(props) {
	return (
		<div className="SpinnerLoader__wrapper col col-12 d-flex flex-column align-items-center justify-content-center" {...props}>
			<div className="SpinnerLoader spinner-border text-primary" role="status">
				<span className="sr-only"></span>
			</div>
			<span className="display-4">Loading...</span>
		</div>
	);
}
