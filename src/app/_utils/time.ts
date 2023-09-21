export const getTwitterTimeElapsedString = (createdTime: Date): string => {
  const now = new Date()
  const diff = (now.getTime() - createdTime.getTime()) / 1000 // in seconds

  if (diff < 60) {
    return `${Math.floor(diff)}s`
  } else if (diff < 60 * 60) {
    return `${Math.floor(diff / 60)}m`
  } else if (diff < 60 * 60 * 24) {
    return `${Math.floor(diff / (60 * 60))}h`
  } else if (diff < 60 * 60 * 24 * 7) {
    return `${Math.floor(diff / (60 * 60 * 24))}d`
  } else {
    const year = createdTime.getFullYear()
    const month = ('0' + (createdTime.getMonth() + 1)).slice(-2)
    const day = ('0' + createdTime.getDate()).slice(-2)
    return `${year}/${month}/${day}`
  }
}
