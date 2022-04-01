import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("https://skyit-coding-challenge.herokuapp.com/movies")
      .then((res) => setData(res.data))
      .catch(e => console.log(e))
  }, [])

  return (
    <div className="App">
      {data && data.map(movie => {
        return (<section key={movie._id}>
          <p>{movie.title}</p>
          <p>{movie.releaseDate}</p>
          <p>{movie.director}</p>
          <p>{movie.length}</p>
          <p>{movie.rating}</p>
        </section>)
      })}


    </div>
  );
}

export default App;
