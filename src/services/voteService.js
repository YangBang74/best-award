import { useAuthStore } from '@/stores/auth'
import axiosApiInstance from '@/api'

export const vote = async (date, name, disabled, dates) => {
  const authStore = useAuthStore()
  try {
    const token = authStore.userInfo.token
    const userId = authStore.userInfo.userId
    if (!token || !userId) {
      console.log('User not authenticated')
      return
    }
    const song = dates.value.find((sing) => sing.id === date.id)

    if (song) {
      if (!song.voters) {
        song.voters = {}
      }
      if (song.voters[userId]) {
        disabled[song.id] = true
        return
      }
      await axiosApiInstance.patch(
        `https://award-vue-default-rtdb.asia-southeast1.firebasedatabase.app/${name}/${date.id}.json`,
        {
          vote: song.vote + 1,
          voters: { ...song.voters, [userId]: true },
        }
      )
      song.vote += 1
      song.voters[userId] = true
      disabled[date.id] = true
    }
  } catch (err) {
    console.error('Error voting for song:', err)
  }
}
