 module.exports = {
  publicPath: process.env.NODE_ENV === 'delvelopment' ? '/' : './',
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
        'utils': '@/utils'
      }
    }
  },
  
}