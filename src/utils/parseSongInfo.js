export function parseSongInfo(singleSong,flag){
  let res = {};

  if( flag == 1 ){
    res.id = singleSong.id
    res.picUrl = singleSong.picUrl
    res.songName = singleSong.name
    res.artists = singleSong.song.artists
    res.album = singleSong.song.album.name
    res.st = singleSong.song.privilege.st
    res.fee = singleSong.song.fee
  }
  else if( flag == 2){
    res.id = singleSong.id
    res.picUrl = singleSong.al.picUrl
    res.songName = singleSong.name
    res.artists = singleSong.ar
    res.album = singleSong.al.name
    res.st = singleSong.st
    res.fee = singleSong.fee
  } 

  return res
}