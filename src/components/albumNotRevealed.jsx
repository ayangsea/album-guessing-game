import React from "react"

export default function AlbumNotRevealed({albums, submitGuess, revealRankings, moveItem, submitted, updateAlbumPosition, correct}) {
    return (
        <div>
            <div className="submitButtons">
                <button onClick={() => submitGuess()}>Submit</button>
                <button onClick={() => revealRankings()}>Reveal Actual Ranking</button>
            </div>
            <ul>
                {albums.map((album, index) => (
                    <li key={index}>
                        {!submitted ? <form onSubmit={(e) => updateAlbumPosition(e, index)}> 
                            <input id={`albumPos-${index + 1}`}type="text" name="albumPosition" defaultValue={index + 1}/>
                        </form> : <div className="ranking">{index + 1}.</div>}
                        {!submitted && (
                        <div className="buttonList">
                            <button onClick={() => moveItem(index, 'up')}>↑</button>
                            <button onClick={() => moveItem(index, 'down')}>↓</button>
                        </div>)
                        }
                        {album.name}
                        <img src={album.images[0].url}></img>
                        {submitted && correct[index] === 1 && (<img src="/check.png"/>)}
                        {submitted && correct[index] === 0 && (<img src="x.png"/>)}
                    </li>
                ))}
            </ul>
        </div>
    )
}