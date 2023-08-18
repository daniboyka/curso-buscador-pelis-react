import { useState } from "react";
import noImg from './img/no-hay-foto.jpg'


export const BuscadorPelicula = () => {
  const [pelicula, setPelicula] = useState("");
  const [dataPelicula, setDataPelicula] = useState([]);
  const urlBase = `https://api.themoviedb.org/3/search/movie`;
  const API_key = `e5e75bd0f575c866dfff1e792b45da82`;
  const imagen = `https://image.tmdb.org/t/p/w500`;

  const handleBuscadorPelicula = (e) => {
    setPelicula(e.target.value);
  };
  
  const fetchBuscadorPelicula = async () => {
    try {
      const response = await fetch(        
        `${urlBase}?query=${pelicula}&api_key=${API_key}`
        );
      const data = await response.json();         
      
      setDataPelicula(data.results);
      
    } catch (error) {
      console.error("ocurrio el siguente problema:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pelicula.length > 0) fetchBuscadorPelicula();
  };

  return (
    <div>
      <h1>Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="buscador de pelicula"
          value={pelicula}
          onChange={handleBuscadorPelicula}
        ></input>
        <button type="submit">Buscar</button>
      </form>
      <div className="movie-list">
         {dataPelicula && dataPelicula.map( (item) => (          
             <div key={item.id} className="movie-card">          
          {item.poster_path && item.poster_path?<img src={`${imagen}${item.poster_path}`} alt={dataPelicula.title} />:<img src={noImg}/>} {/*aca tengo q cambiar la frase por una imagen generica*/}        
          <h2>{item.title}</h2>
          <p>{item.overview}</p>
        </div>
        ))}   
      </div>
    </div>
  );
};
