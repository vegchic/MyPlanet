export default function onfail(self, res, msg) {
  if (res.status !== 200 || res.data.err !== '未登录') {
    self.$notify.error({
      title: '错误',
      message: res.data.err || msg
    })
  } else {
    self.$notify.error({
      title: '错误',
      message: '请先登录'
    })
    self.$router.push('/login');
  }
}
