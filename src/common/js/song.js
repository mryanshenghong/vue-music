import {getLyric} from '@/api/song'
import {ERR_OK} from '@/api/config'
import {Base64} from 'js-base64'
import jsonp from '@/common/js/jsonp'
import { commonParams, options } from '@/api/config'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.id).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.strMediaMid || musicData.songmid}.m4a?guid=836516700&vkey=4F8BF57846BDFE9B12FE39F5AB0E9ACF646FA1330485E6AB4316DF862DDAB4F3DDAD2A58E737838B66C6319EEA0B49358370AF8DBF160F6B&uin=0&fromtag=38`
  })
}
export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

