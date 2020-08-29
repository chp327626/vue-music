export default {
  isPlay: false,    //播放状态
  currTime: 0,      //现在播放的时长
  currMusicId: 0,    //现在播放音乐的id
  currMusicName: '',  //正在播放音乐名
  duration: 0,    //正在播放乐曲的总时长
  picUrl: '',     //正在播放的音乐封面url
  artists: '',    //正在播放的音乐歌手
  musicUrl: '',   //正在播放的音乐url
  playList: [],    //播放列表
  curIndex: -1,
  newTime: 0,   //修改播放进度
  change: false //用于触发修改进度事件
}