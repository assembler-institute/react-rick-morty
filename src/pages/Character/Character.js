import React from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
/* import * as routes from "../../constants/routes"; */

function Character() {
  return (
    <Layout>
      <section className="charachterProfile">
        <p>Nombre</p>
      </section>
      <section className="row">
        <EpisodeCard />
      </section>
    </Layout>
  );
}

export default Character;
