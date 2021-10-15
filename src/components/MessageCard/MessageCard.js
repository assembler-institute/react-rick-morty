import errorImage from "../../images/error-image.png";
import noResidentsImage from "../../images/rick-in-peace.jpg";

export default function MessageCard({ image, message }) {
	return (
		<div className="d-flex flex-column align-items-center justify-content-center p-5">
			<div className="card" style={{ maxWidth: "30rem" }}>
				{image && <img src={image} className="card-img-top" alt="Rick and Morty messed up" />}
				<div className="card-body">
					<p className="card-text text-danger text-center display-5">{message}</p>
				</div>
			</div>
		</div>
	);
}

export function ErrorMessageCard(props) {
	const { message = "OOPS! It seems that something went wrong." } = props;

	return <MessageCard image={errorImage} message={message} />;
}

export function NoResidentsCard() {
	return <MessageCard image={noResidentsImage} message="It seems that there's nobody in this world." />;
}
