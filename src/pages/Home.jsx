import React from 'react'
import ArtistSelection from "../components/ArtistSelection"

export default function Home() {

    return (
        <div>
            <h1>Choose Which Artist to Play</h1>
            <p>Instructions: Rank the albums in the order you think is most popular to least popular</p>
            <div className="selectionScreen">
                <ArtistSelection background="/kendrick-lamar-bg-img.jpeg" artistName="Kendrick Lamar"/>
                <ArtistSelection background="/taylor-swift-bg-img.jpeg" artistName="Taylor Swift"/>
                <ArtistSelection background="/metro-boomin-bg-img.webp" artistName="Metro Boomin"/>
                <ArtistSelection background="/radiohead-bg-img.jpeg" artistName="Radiohead"/>
                <ArtistSelection background="/weeknd-bg-img.jpeg" artistName="The Weeknd"/>
            </div>
        </div>
    )
}