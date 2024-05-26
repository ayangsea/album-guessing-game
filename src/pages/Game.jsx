import React, { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import axios from 'axios';
import { Buffer } from 'buffer';
import dotenv from 'dotenv';
import qs from 'qs'
import AlbumRevealed from '../components/albumRevealed';
import AlbumNotRevealed from '../components/albumNotRevealed';

export default function Game() {

    const location = useLocation()
    const artistID = location.state && location.state.artistID
    
    const [albumIDs, setAlbumIDs] = useState([])
    const [albums, setAlbums] = useState([])
    const [albumsSorted, setAlbumsSorted] = useState([])
    const [correct, setCorrect] = useState([])
    const [revealed, setRevealed] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const client_id = process.env.SPOTIFY_CLIENT_ID
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET
    const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

    const getAuth = async () => {
        try{
          //make post request to SPOTIFY API for access token, sending relavent info
          const token_url = 'https://accounts.spotify.com/api/token';
          const data = qs.stringify({'grant_type':'client_credentials'});
      
          const response = await axios.post(token_url, data, {
            headers: { 
              'Authorization': `Basic ${auth_token}`,
              'Content-Type': 'application/x-www-form-urlencoded' 
            }
          })
          //return access token
          return response.data.access_token;
          //console.log(response.data.access_token);   
        }catch(error){
          //on fail, log the error in console
          console.log(error);
        }
    }

    const getAlbums = async () => {
        //request token using getAuth() function
        const access_token = await getAuth();
        //console.log(access_token);
      
        const api_url = `https://api.spotify.com/v1/artists/${artistID}/albums`;
        //console.log(api_url);
        try{
            const response = await axios.get(api_url, {
                headers: {
                'Authorization': `Bearer ${access_token}`
                }
            });
            setAlbumIDs(response.data.items.filter(album => album.album_type === "album" && album.album_group ==="album"))
            return response.data;
        } catch(error){
            console.log(error);
        }  
    };

    useEffect(() => {
        console.log(artistID)
        getAlbums();
    }, [artistID]);

    useEffect(() => {
        const getAlbumDetails = async (albumID) => {
            const access_token = await getAuth();
      
            const api_url = `https://api.spotify.com/v1/albums/${albumID}`;
            //console.log(api_url);
            try{
                const response = await axios.get(api_url, {
                    headers: {
                    'Authorization': `Bearer ${access_token}`
                    }
                });
                return response.data;
            } catch(error){
                console.log(error);
            }  
        }

        const fetchAlbumDetails = async () => {
            const albumDetailsPromises = albumIDs.map((album) => getAlbumDetails(album.id))
            const resolvedAlbums = await Promise.all(albumDetailsPromises);
            const sortedAlbums = [...resolvedAlbums].sort((a, b) => b.popularity - a.popularity)
            setAlbums(resolvedAlbums.filter((album) => album !== null))
            setAlbumsSorted(sortedAlbums)
        }

        fetchAlbumDetails();
        console.log(albumsSorted)

    }, [albumIDs])

    const moveItem = (index, direction) => {
        const newAlbums = [...albums]
        const movedItem = newAlbums.splice(index, 1)[0];
        const newIndex = direction === 'up' ? Math.max(0, index - 1) : Math.min(index + 1, albums.length)
        newAlbums.splice(newIndex, 0, movedItem)
        setAlbums(newAlbums)
    }

    const tryAgain = () => {
        setRevealed(false)
        setSubmitted(false)
    }

    const revealRankings = () => {
        setRevealed(true)
    }

    const submitGuess = () => {
        setSubmitted(true)
        const newCorrect = albums.map((album, index) => {
            if (album.popularity == albumsSorted[index].popularity) {
                return 1
            } else {
                return 0
            }
        })
        setCorrect(newCorrect)
    }

    const updateAlbumPosition = (e, index) => {
        e.preventDefault();
        const newPosition = parseInt(e.target.elements.albumPosition.value, 10);
        if (!isNaN(newPosition) && newPosition > 0 && newPosition <= albums.length) {
            let newAlbums = [...albums];
            const movedAlbum = newAlbums[index];
            newAlbums[index] = newAlbums[newPosition - 1]
            newAlbums[newPosition - 1] = movedAlbum
            console.log(albums)
            console.log(newAlbums)
            setAlbums(newAlbums);
        }
        const inputElement = document.getElementById(`albumPos-${index + 1}`);
        if (inputElement) {
            inputElement.value = index + 1;
            console.log('here')
        }
      };

    return (
        <div className="albumDisplay">
            <h1>Albums</h1>
            {submitted && <h3>Score: {correct.filter((val) => val === 1).length} / {albums.length}</h3>}
            {(submitted || revealed) && <button className="tryAgain" onClick={() => tryAgain()}>Try Again</button>}
                {revealed ? <AlbumRevealed 
                                albumsSorted={albumsSorted}
                            /> : 
                            <AlbumNotRevealed 
                                albums={albums}
                                submitGuess={submitGuess}
                                revealRankings={revealRankings}
                                moveItem={moveItem}
                                submitted={submitted}
                                updateAlbumPosition={updateAlbumPosition}
                                correct={correct}/>
            }
        </div>

    )
}