import image from "../../images/error-image.png";

export default function ErrorMessage(props) {
	return (
		<div class="card" style={{ width: "18rem" }}>
			<img src={image} class="card-img-top" alt="Rick and Morty messed up" />
			<div class="card-body">
				<p class="card-text">It seems that something went wrong :(</p>
			</div>
		</div>
	);
}
