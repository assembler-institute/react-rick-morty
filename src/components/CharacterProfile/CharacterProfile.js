import "./CharacterProfile.scss";

export default function CharacterProfile(props) {
	const {
		image,
		name,
		species,
		status,
		origin: { name: origin },
		location: { name: location },
	} = props;

	return (
		<section className="row">
			<div className="col-12 col-sm-6 col-md-4 col-xl-3">
				<img className="CharacterProfile__img" src={image} alt="" />
			</div>
			<div className="col-12 col-sm-6 col-md-8 col-xl-9 row align-content-center">
				<div className="col-12">
					<h3>{name}</h3>
				</div>
				<div className="col-12">
					<hr />
				</div>
				<div className="col-12 row">
					<div className="col">
						<h6>CHARACTER</h6>
						<p>
							{species} | {status}
						</p>
					</div>
				</div>
				<div className="col-12 row">
					<div className="col col-md-4">
						<h6>ORIGIN</h6>
						<p>{origin}</p>
					</div>
					<div className="col col-md-8">
						<h6>LOCATION</h6>
						<p>{location}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
