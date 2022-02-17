import React from 'react'

const MovieCard = ({movie , selectMovie}) => {               //rendering the movie data here : destructuring prop object {movie}
    // console.log(movie)
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";    //took this frm tmdb img path
  return (
    <div className={'movie-card'} onClick={() => selectMovie(movie)} >
        {movie.poster_path ? <img className={"movie-cover"} src={`${IMAGE_PATH}${movie.poster_path}`} alt="" />    //poster_path is the name in our object of movie which provied the img path
             : 
        <div className="movie-placeholder">No Image found</div>  //or we can keep it null
    }
        <h5 className={"movie-title"}>{movie.title}</h5>
     
    </div>
  )
}

export default MovieCard