import axios from "axios";
import { useLocation } from "react-router-dom"
import React, { useState, useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

function reducer(page, action) {
  if(action==="next")return page+1
  if(action==="prev")return page-1
  return Error("failed")
}

export default function Home() {
  // eslint-disable-next-line compat/compat
  const queryParam = + new URLSearchParams(useLocation().search).get("page")
  const [pageData, setPageData] = useState({
    page: queryParam || 1,
    paginationInfo: null,
  })
  const [pageReduce, dispatch] = useReducer(reducer, 1)
  const { paginationInfo, page } = pageData
  const [episodes, setEpisodes] = useState([])
  const [hasLoaded, setHasLoaded] = useState(false)
  const [error, setError] = useState({
    hasError: false,
    errorMessage: null
  })
  // fetch data
  useEffect(() => {
    const loadEpisodes = async (query) => {
      console.log(query)
      const { data } = await axios.get(`https://rickandmortyapi.com/api/episode?page=${query}`);
      setEpisodes(data.results);

      setPageData(prevState => ({
        ...prevState,
        paginationInfo: data.info
      }))
      setHasLoaded(true)
    }
    loadEpisodes(pageReduce)

  }, [pageReduce])

  function checkPageActive(index) {
    if (index === page) {
      return (
        <li key={index} className="page-item active">
          <a className="page-link " href={`?page=${index}`}>{index}</a>
        </li>
      )
    }
    return (
      <li key={index + 1} className="page-item">
        <a className="page-link" href={`?page=${index}`}>{index}</a>
      </li>
    )
  };

  return (
    <Layout>
      <section className="row">
      {!hasLoaded &&
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        }
        {hasLoaded && (
          <div className="col col-12">
            <h1>Episodes loaded!</h1>
          </div>)}

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
          {hasLoaded && (
            <nav>
              <ul className="pagination">
                {paginationInfo.prev &&
                  <li className="page-item">
                    {/* cambiar a link */}
                    <a className="page-link" href={`?page=${page - 1}`}>Prev</a>
                  </li>
                }
                {!paginationInfo.prev &&
                  <li className="page-item disabled">
                    <a className="page-link" href={`?page=${page - 1}`}>Prev</a>
                  </li>
                }
                {Array.from(Array(paginationInfo.pages), (element, index) => (
                  // maneras de hacer esto!!???
                  checkPageActive(index + 1,)
                ))}
                {paginationInfo.next &&
                  <li className="page-item">
                    <a className="page-link" href={`?page=${page + 1}`}>Next</a>
                  </li>
                }
                {!paginationInfo.next &&
                  <li className="page-item  disabled">
                    <a className="page-link" href={`?page=${page + 1}`}>Next</a>
                  </li>
                }

              </ul>
              {paginationInfo.prev &&
                <button type="button" onClick={ () => dispatch("prev")}>Previous Page</button>
              }
              <button type="button" onClick={ () => dispatch("next")}>Next page</button>
            </nav>


          )}

        </div>
      </section>
    </Layout >
  )

}