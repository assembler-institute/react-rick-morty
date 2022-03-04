
import { useLocation, Link } from "react-router-dom"
import React, { useReducer } from "react";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
// custom hooks
import useFetch from "../../hooks/useFetch";


function reducer(page, action) {
  if (action === "next") return page + 1
  if (action === "prev") return page - 1
  return Error("failed")
}

export default function Home() {
  const [pageReduce, dispatch] = useReducer(reducer, 1)
  // eslint-disable-next-line compat/compat
  const queryParam = + new URLSearchParams(useLocation().search).get("page")
  let episodes;
  let paginationInfo;
  const page = queryParam || 1

  const [fetchState] = useFetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
  const { data, state } = fetchState
  // look this later
  if (state === "success") {
    paginationInfo = data.info
    episodes = data.results
  }


  function checkPageActive(index) {
    if (index === page) {
      return (
        <Link key={index} to={`/?page=${index}`} className="page-item active">
          <p className="page-link ">{index}</p>
        </Link>
      )
    }
    return (
      <Link key={index} to={`/?page=${index}`} className="page-item">
        <p className="page-link ">{index}</p>
      </Link>
    )
  };

  return (
    <Layout>
      <section className="row">
        {state === "loading" &&
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        }
        {state === "error" && (
          <div>
            <h1>An error has ocurred</h1>
          </div>
        )}

        {state === "success" &&
          <>
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>

            <div className="col col-12">
              <hr />
            </div>

            {
              episodes?.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  id={episode.id}
                  name={episode.name}
                  airDate={episode.air_date}
                  episode={episode.episode}
                />
              ))
            }


            <div className="col col-12">
              <hr />
              <nav>
                <ul className="pagination">
                    <Link to={`/?page=${page-1}`} className={paginationInfo.prev ? "page-item" : "page-item disabled"}>
                      <p className="page-link ">Prev</p>
                    </Link>
                  {Array.from(Array(paginationInfo.pages), (element, index) => (
                    // maneras de hacer esto!!???

                    checkPageActive(index + 1,)
                  ))}
                  <Link to={`/?page=${page+1}`} className={paginationInfo.next ? "page-item" : "page-item disabled"}>
                      <p className="page-link ">Prev</p>
                    </Link>
                </ul>
                {paginationInfo.prev &&
                  <button type="button" onClick={() => dispatch("prev")}>Previous Page</button>
                }
                <button type="button" onClick={() => dispatch("next")}>Next page</button>
              </nav>
            </div>
          </>
        }



      </section>
    </Layout >
  )

}