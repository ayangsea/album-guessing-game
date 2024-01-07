import React from 'react';

export default function AlbumRevealed({albumsSorted}) {
    return (
        <div>
            <ul>
                {albumsSorted.map((album, index) => (
                    <li key={index}>
                        <label>
                            <div className="ranking">{index + 1}.</div> 
                            <div className="contents">
                                {album.name} 
                                <div className="popularity">Popularity: {album.popularity} </div>
                            </div>
                        </label>
                        <img src={album.images[0].url}></img>
                    </li>
                ))}
            </ul>
        </div>
    )
}