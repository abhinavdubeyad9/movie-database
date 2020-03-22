import React, { useState } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const apiurl = "http://www.omdbapi.com/?apikey=dfe6d885";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        console.log(data);
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        })
      }).catch(function(e){
        console.log(e);
      });
    }
  }
  
  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
      <nav>
     <spam class="menu"><h1 class="animated infinite heartBeat"> Movie Database</h1></spam>
     <spam class="logo"><h2 class="animated fadeInLeftBig">Luminous heads</h2></spam>
    </nav>
      </header>
      <main class ="animated slideInUp">
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
      <footer class ="animated slideInDown">
      <h1>Created by <a class="animated infinite flash" href="https://www.github.com/abhinavdubeyad9/">Abhinav Dubey</a></h1>
      </footer>
    </div>
  );
}

export default App