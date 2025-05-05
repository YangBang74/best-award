import axiosApiInstance from '@/api'

export const getDates = async (dbName) => {
  try {
    const response = await axiosApiInstance.get(
      `https://award-vue-default-rtdb.asia-southeast1.firebasedatabase.app/${dbName}.json`,
    )
    const result = Object.entries(response.data).map(([key, item]) => ({
      id: key,
      author: item.author,
      name: item.name,
      about: item.about,
      src: item.src,
      vote: item.vote,
      voters: item.voters || {},
    }))
    return result
  } catch (err) {
    console.error(`Error fetching ${dbName}:`, err)
    return []
  }
}
