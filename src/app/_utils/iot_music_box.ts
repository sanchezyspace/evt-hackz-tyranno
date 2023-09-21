import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebase'

type WordScoreMap = {
  title: string
  words: string[]
  score: string
}[]

const wordScoreMap = [
  {
    title: '暴れん坊将軍',
    words: ['暴れ'],
    score:
      'iT150 L24 C C L96 G L48 R L72 G# Eb F L128 G L96 R L12 F Eb D Eb L24 vG-RG ^C--R GF-Eb D--R C-Eb- ^Bb--C vG--- --RR vG-RG ^C--R EbD-Bb C--R G-FEb L36 DBb-vG L48 ^C--- ----',
  },
  {
    title: '',
    words: [],
    score: '',
  },
  {
    title: '',
    words: [],
    score: '',
  },
  {
    title: '',
    words: [],
    score: '',
  },
  {
    title: '',
    words: [],
    score: '',
  },
  {
    title: '',
    words: [],
    score: '',
  },
  {
    title: '',
    words: [],
    score: '',
  },
  {
    title: '',
    words: [],
    score: '',
  },
  {
    title: '',
    words: [],
    score: '',
  },
]
export const getMatchedScore = (postBody: string) => {
  const words = wordScoreMap.flatMap((e) => e.words)
  const score = wordScoreMap.flatMap((e) => e.score)
  const matchedIndex = words.findIndex((word) => postBody.includes(word))
  if (matchedIndex === -1) {
    return
  }
  const matchedScore = score[matchedIndex]
  return matchedScore
}

export const attemptPlayFromPostBody = async (postBody: string) => {
  const matchedScore = getMatchedScore(postBody)
  if (matchedScore) {
    await addDoc(collection(db, 'esp_commands_queue'), {
      endpoint: 'play',
      method: 'POST',
      query_params: {
        song: matchedScore,
      },
    })
  }
}
