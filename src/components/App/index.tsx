import Login from '../Login'
import TrackInfo from '../TrackInfo'
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import { useState, useEffect } from 'react'
import {getAccessToken} from '../../auth'
import axios from 'axios'
import { GlobalStyle } from '../../styles'
import { Container, TrackViewer, Side } from './styles'
import { ITrack } from '../../types'

function App() {

  const GlobalStyleProxy:any = GlobalStyle;

  const [token, setToken] = useState<string | null>(null)
  const [profile, setProfile] = useState<string | null>(null)
  const [playlists, setPlaylists] = useState<Array<string> | null>(null)
  const [tracks, setTracks] = useState<Array<string> | null >(null)
  const [track, setTrack] = useState<ITrack | null>(null)

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
    if(!token) {
      getToken()
    }
    if(token){
      getUserInfo()
      getPlaylists()
    }
  }, [token])

  const getToken = async () => {
    if(code){
      const accessToken = await getAccessToken(clientId, code)
      setToken(accessToken)
    }
  }

  const getUserInfo = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers : {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
    setProfile(data.images[0].url)
  }

  const getPlaylists = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/me/playlists", {
      headers : {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
    const playlists = data.items.map(({name, id}: {name: string, id:number}) => {
      return {name, id}
    })
    setPlaylists(playlists)
  }

  const getTracks = async (id:string) => {
    const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers : {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
    const uris = Object.entries(data.items).map(([key,val]) => val.track.uri)
    console.log(uris)
    setTracks(uris)
  }

  if (!token) {
    return(
      <>
        <GlobalStyleProxy/>
        <Login/>
      </>
    )
  } else {
    return(
    <>
      <GlobalStyleProxy/>
      <Nav
        profile={profile}
      />
      <Container>
        <TrackViewer>
          <TrackInfo
            track={track}
          />
        </TrackViewer>
        <Side>
          <Sidebar
            track={track}
            token={token}
            tracks={tracks}
            playlists={playlists}
            getTracks={getTracks}
            setTrack={setTrack}
          />
        </Side>
      </Container>
    </>
  )}

}

export default App
