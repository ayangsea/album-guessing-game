import React, { useState } from 'react'
import ArtistSelection from "../components/ArtistSelection"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faC, faCaretDown } from '@fortawesome/free-solid-svg-icons'

export default function Home() {

    const artists = [
        new Artist("Taylor Swift", "/taylor-swift-bg-img.jpeg", "06HL4z0CvFAxyc27GXpf02", "Pop"),
        new Artist("Metro Boomin", "/metro-boomin-bg-img.webp", "0iEtIxbK0KxaSlF7G42ZOp", "Hip Hop"),
        new Artist("Kendrick Lamar", "/kendrick-lamar-bg-img.jpeg", "2YZyLoL8N0Wb9xBt1NhZWg", "Hip Hop"),
        new Artist("Radiohead", "radiohead-bg-img.jpeg", "4Z8W4fKeB5YxbusRsdQVPb", "Alternative Rock"),
        new Artist("The Weeknd", "/weeknd-bg-img.jpeg", "1Xyo4u8uXC1ZmMpatF05PJ", "Pop"),
    ]

    const [selectedGenre, setSelectedGenre] = useState("All");

    const handleSelect = (e) => {
        setSelectedGenre(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div>
            <h1>Choose Which Artist to Play</h1>
            <p>Instructions: Rank the albums in the order you think is most popular to least popular</p>
            <div className="selectGenre">
                <select className="selectBox" value={selectedGenre} onChange={handleSelect}>
                    <option value="All">All</option>
                    <option value="Pop">Pop</option>
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="Alternative Rock">Alternative Rock</option>
                </select>
                <div className="iconContainer">
                    <FontAwesomeIcon icon={faCaretDown} size="2x"/>
                </div>
            </div>
            <div className="selectionScreen">
                {artists.map((artist) => (
                    (selectedGenre === artist.genre || selectedGenre === "All") && <ArtistSelection background={artist.img} artistName={artist.name} artistID={artist.id}/>
                ))}
            </div>
        </div>
    )
}

class Artist {
    constructor(name, img, id, genre) {
        this.name = name;
        this.img = img;
        this.id = id;
        this.genre = genre;
    }
}