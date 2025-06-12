import axios from 'axios'

const apiKey = import.meta.env.VITE_LASTFM_API_KEY

const getTopTracks = async () => {
  try {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`
    )
    return response.data.tracks.track
  } catch (error) {
    console.error('Error fetching top tracks:', error)
  }
}

const getTopArtists = async () => {
  try {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json`
    )
    return response.data.artists.artist
  } catch (error) {
    console.error('Error fetching top tracks:', error)
  }
}

export default { getTopTracks, getTopArtists }
