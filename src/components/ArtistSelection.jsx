import React from 'react'
import { Link, useNavigate } from "react-router-dom"

export default function ArtistSelection({artistName, background, artistID}) {

    const navigate = useNavigate();
    const toGame = () => {
        navigate('/game', { state: { artistID: artistID } });
      };
    
    return (
        //<Link to={{ pathname: "/game", state: {artist: 'a'} }}>
            <div 
                onClick={() => toGame()}
                className="chooseArtist" 
                style={{
                    backgroundImage: `url(${background})`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }} >
                <h1>{artistName}</h1>
            </div>
        //</Link>
    )
}
