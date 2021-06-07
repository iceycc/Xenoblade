import { getCurrentInstance } from 'vue'

interface ReloadFn {
  reloadPage: (title?: string, message?: string) => void
}
export const useReloadPage = (): ReloadFn => {
  const { proxy } = getCurrentInstance()!
  const reloadPage = (title = '刷新确认', message?: string) => {
    proxy?.$confirm(message || '菜单已发生改动，是否要刷新当前系统', title, {
      type: 'warning'
    }).then(() => {
      window.location.reload()
    }).catch(() => {
      proxy?.$message({
        type: 'info',
        message: '已取消刷新'
      })
    })
  }

  return {
    reloadPage
  }
}
