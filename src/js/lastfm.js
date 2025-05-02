import App from '@/App.vue'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY
export const getTopTracks = async () => {
  try {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}`,
    )
    return response.data.tracks.track
  } catch (error) {
    console.error('Error fetching top tracks:', error)
    throw error
  }
}

export const getTopAlbums = async () => {
  try {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}`,
    )
    return response.data.albums.album
  } catch (error) {
    console.error('Error fetching top albums:', error)
    throw error
  }
}

export const fetchTopCharts = async () => {
  try {
    const topTracks = await getTopTracks()
    const topAlbums = await getTopAlbums()

    return { topTracks, topAlbums }
  } catch (error) {
    console.error('Error fetching top charts:', error)
  }
}
