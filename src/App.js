import React, { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import Pagination from './Pagination';
import './styles.css';


const api = 'https://kitsu.io/api/edge';

export default function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState('');
  console.log(text);

  useEffect(() => {
    if (text) {
      setInfo({});

      fetch(`${api}/anime?filter[text]=${text}`)
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
          console.log(response)
        });
    }

  }, [text]);

  return (
    <div className="App">
      <h1>Animes</h1>
      <SearchInput
        value={text}
        onChange={(search) => setText(search)} />
      {text && !info.data && (
        <span>Carregando...</span>
      )}
      {info.data && (
        <ul className="animes-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <a className={!anime.attributes.youtubeVideoId && 'trailler-notfound'} href={anime.attributes.youtubeVideoId ? `https://www.youtube.com/watch?v=${anime.attributes.youtubeVideoId}` : ""}><img src={anime.attributes.posterImage.small} alt="canonicalTitle" /></a>
              {anime.attributes.canonicalTitle}

            </li>
          ))}
        </ul>
      )}
      {/* <Pagination /> */}
    </div>
  );
}
