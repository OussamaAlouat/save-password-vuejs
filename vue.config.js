module.exports = {
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/save-password-vuejs/'
    : '/'
}