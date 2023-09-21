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
    words: ['暴れ', '暴れる', '暴れん坊将軍'],
    score:
      'iT150 L24 C C L96 G L48 R L72 G# Eb F L128 G L96 R L12 F Eb D Eb L24 vG-RG ^C--R GF-Eb D--R C-Eb- ^Bb--C vG--- --RR vG-RG ^C--R EbD-Bb C--R G-FEb L36 DBb-vG L48 ^C--- ----',
  },
  {
    title: 'うっせえわ',
    words: ['うっせえわ', 'Adoさん', 'あなたが思うより'],
    score:
      'iT150 L24 BR ^BB vBR ^BB vBR ^BB vBB L24 R B ^B A# B C# D C# B A L48 vF# ^A# B vR',
  },
  {
    title: 'ポテトが上がる音',
    words: ['ポテト', 'マクドナルド'],
    score: 'iT120L24GFGRGFGR ',
  },
  {
    title: '鼻から牛乳',
    words: ['おわった', '終わった'],
    score: 'iT200L24 ^AvG^AAAARRRT100vGT280FEDT160C#C#C#DDDD',
  },
  {
    title: 'unwelcome school',
    words: ['ブルアカ', 'ブルーアーカイブ', 'お前ら笑うな', '帝京平成大学'],
    score:
      'iT170 L12 ARRR CRRR D#--E vRRG#R^    AR CR DR CR D#RD#E ---R GRF#RFRERDRCRBRA#R BRCRDRD#RERRRvE---^ ARRR CRRR D#--E vRRG#R^ AR CR DR CR D#RD#E ---R GRF#RFREbRERFRF#RGR G#RG#R^ARAR BRRRv',
  },
  {
    title: '正解の音',
    words: ['完全に理解した'],
    score: 'iT150 L12 ^ECECCCC',
  },
  {
    title: 'LALALA LOVESONG',
    words: ['回れ回れ'],
    score:
      'iT120 L24 ^BC#D#G# --RG# F#ED#C# -D#RR BC#D#E -EEE D#C#BA# -CRR BC#D#G# --RG# F#ED#C# -D#RR BC#D#G# --D#C# --C L12GG# L24----',
  },
  {
    title: 'Wide Putin Walking',
    words: ['最強'],
    score: '',
  },
  {
    title: 'やる気のないダースベーダー',
    words: ['やる気ない'],
    score:
      'iT120 L16 ^G-RG-RG-REbR^Bb vG-REbR^BbvG--RRR ^D-RD-RD-REbRBb vF#-REbR^Bbv G--RRR',
  },
  {
    title: 'タイタニック',
    words: ['泣いた', '涙', '顔終わった'],
    score:
      'iT100 L24 ^EF# G#--- --L12^AvG#F#E L24F#^B-- -RvG#^B C#--- B--- vL16F#G#F#L24-- --RR',
  },
  {
    title: 'メヌエット',
    words: ['うんち', 'えっと'],
    score:
      'iT120 L32 ^BvG^A BDC CED DGF# GDB vG^AB CDE DCB ABvG F#G^A vDF#^A CBA BvG^A BDC CED DGF# GDB vG^AB vE^DC BAvG DGF# G-- R',
  },
  {
    title: 'Summer',
    words: ['夏'],
    score:
      'iT90 L12 ADEF# E-DD ---- RRRR ADEF# E-DE -F#-F# ---R ADEF# E-DD ---- RRRR ADEF# E-DE ^-Av-F# ---R F#-G- ^ARAA -B-R A-vF#D --F#G ^ARAA -B-R ARvF#D --DE F#RF#F# RF#RF# --^B-v  L4 E-F#-E-  L12 D- E--- ---- RRRR',
  },
  {
    title: 'ヤマダ電機',
    words: [
      'なんで寺院に機械があんだよ',
      '教えはどうなってんだ教えは',
      'おとわっか',
    ],
    score:
      'iT160 L16 FFFEbCG F--RRR L24 ^BbBb-C L12Bb--AL24vGF GFEbD C--R CDEbF GFG^A BbABbC DRBbvF --^D- EbDCBb RA-vF GR^ABb RRBbR RBbRL12vG#^A L24Bb--R',
  },
  {
    title: '俳句ジングル',
    words: ['俳句', '575'],
    score: 'T180 L48C L48F L40G L32^Bb L28C L24F L20G L32^Bb L64C',
  },
  {
    title: 'Windows XP 起動音',
    words: ['Windows'],
    score: 'T120 L12 ^EbRvEb^Bb-RAb- RvEb^EbL6-RL12Bb-----',
  },
  {
    title: 'あちち',
    words: ['アツい', '燃えた', '炎上'],
    score:
      'T180 L24 ^ E-RE-RE- RE-RE--R C#D#D#RD#RF#F# RE---RvG#- ^ E-RE-RE- RE-RE--R C#D#D#RD#REE RC#---RRR',
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
