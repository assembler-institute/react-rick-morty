import React from "react";

import * as routes from "constants/routes";

import { Layout } from "components";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Layout>
      <section className="row">
        <div className="col col-12">
          <h1>Sorry, page not found</h1>
          <hr />
          <Link to={`${routes.HOME}`}>
            <h2 className="CharacterCard__name h4">Visit the Homepage</h2>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default NotFound;
