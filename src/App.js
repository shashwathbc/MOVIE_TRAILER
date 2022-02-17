import {useEffect , useState} from "react";
import './App.css'
import axios from "axios";
import MovieCard from "./components/MovieCard";
import YouTube from "react-youtube";


function App() {

  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
  const API_URL = "https://api.themoviedb.org/3";

  //a state to store the data in local storage : 
  const [movies, setMovies] = useState([])    //empty array

  //a state to store the data of search key we pass in input field
  const [searchKey , setSearchKey] = useState("");  //empty

  //a state to select movie and diaply in hero 
  const [selectedMovie , setSelectedMovie] = useState({})  //empty object

  //a state to play the trailer :
  const [playTrailer , setPlayerTrailer] = useState(false);

   
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" :  "discover"
     const {data : {results}} = await axios.get(`${API_URL}/${type}/movie` , {    //pass our api key , const data = destructring data we get    {data : results} 
         params : {
           api_key : "5efa4b075d423dc33f2099d2166c935c",
           query : searchKey
         }
     } )
    //  console.log("data" , data);


   
    // setSelectedMovie(results[0])        //whatever the first object of result
    setMovies(results);
    await selectMovie(results[0])
  }


  //fetching single movie :
  const fetchMovie = async (id) => {
    const {data} = await axios.get(`${API_URL}/movie/${id}` , {
      params : {
        api_key : "5efa4b075d423dc33f2099d2166c935c",
        append_to_response : "videos"
        
      }
    })
    return data
  }

  //
  const selectMovie = async (movie) => {
   const data =  await fetchMovie(movie.id)
  //  console.log(data);  official triler
   setSelectedMovie(movie)
  }


  useEffect(() => {
      fetchMovies();
  }, [])




  // function to display the movies: // render the data 
  const renderMovies =  () => (
    movies.map(movie => (
      <MovieCard 
         //passing the movie data in MovieCard:
         selectMovie = {selectMovie}
         key = {movie.id}   //mapping over movies through its id 
         movie = {movie}
        
      />
    ))
  )


  //search function: inside this we will call  fetchMovies()
  const searchMovies = (e) => {             //this func takes place in form 
        e.preventDefault();
        fetchMovies(searchKey);
  }

  const  renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(vid => vid.name === "Official Trailer")

    return(
      <YouTube 
         videoId={trailer.key}
         containerClassName={"youtube-container"}
         opts={{
           width : "100%",
           height: "100%",
         }}
      
      />
    )
  }



  return (
    <div className="App">
      <header className="header">
        <div className="header-content max-center">

      <span>ShashDev </span>

      <form onSubmit={searchMovies }>
          <input type="text"  onChange={(e) => setSearchKey(e.target.value)} />
          <button type={"submit"}>Search</button>
      </form>
      </div>
      </header>
       {/* {searchKey}  to check if its working */}

       <div className="hero"  style={{backgroundImage: `url( ${IMAGE_PATH}${selectedMovie.backdrop_path})`}}>
         {/* {console.log(selectedMovie)} */}
         <div className="hero-content max-center">
           {/* {console.log(selectedMovie)} */}
         
         
          {selectedMovie.videos && playTrailer ? renderTrailer() : null} 
         


           <button className={"button"} onClick={() =>setPlayerTrailer(true) }>Play Trailer</button>
              <h1 className="hero-title">{selectedMovie.title}</h1>
              {selectedMovie.overview ? <p className="hero-overview">{selectedMovie.overview}</p>: null}
         </div>
         
       </div>

        <div className="container">
          {/* //calling the data */}
        {renderMovies()}                  
        </div>

    </div>
  );
}

export default App;
