
import { useLocation } from "react-router-dom"
import React, { useReducer } from "react";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
// custom hooks
import useFetch from "../../hooks/useFetch";


function reducer(page, action) {
  if(action==="next")return page+1
  if(action==="prev")return page-1
  return Error("failed")
}

export default function Home() {
  const [pageReduce, dispatch] = useReducer(reducer, 1)
    // eslint-disable-next-line compat/compat
  const queryParam = + new URLSearchParams(useLocation().search).get("page")
  let episodes; 
  let paginationInfo;
  const page = queryParam || 1

  const [fetchState]= useFetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
  const {data,state} = fetchState
  // look this later
  if(state==="success"){
     paginationInfo = data.info
     episodes = data.results
  }


 

  // fetch data
  // .useEffect(() => {
  //   const loadEpisodes = async (query) => {
  //     console.log(query)
  //     const { data } = await axios.get();
  //     setEpisodes(data.results);

  //     setPageData(prevState => ({
  //       ...prevState,
  //       paginationInfo: data.info
  //     }))
  //     setHasLoaded(true)
  //   }
  //   loadEpisodes(pageReduce)

  // }, [pageReduce])

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
      {state=== "loading" &&
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        }
        {state==="error" && (
          <div>
            <h1>An error has ocurred</h1>
            </div>
        )}
        
        {state==="success" &&
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
            </div>
            </>
        }
        

        
      </section>
    </Layout >
  )

}