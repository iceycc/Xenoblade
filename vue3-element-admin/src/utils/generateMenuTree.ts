import { MenuData, ITreeItemData } from '@/store/modules/menu'

type ITreeItemDataWithMeta = ITreeItemData & {
  meta?: {
    icon: string;
    title: string;
  }
}
type IMap = Record<number | string, ITreeItemDataWithMeta>
const generateMenuTree = (list: MenuData[]):ITreeItemData[] => {
  // 生成一个map key为id value为当前对象
  const map = list.reduce((prev, cur) => {
    const temp = { ...cur }
    prev[cur.id as number] = temp
    return prev
  }, {} as IMap)
  const tree: ITreeItemData[] = []
  list.forEach(item => {
    const temp = map[item.id as number]
    temp.meta = {
      title: temp.title,
      icon: temp.icon
    }
    const pid = temp.parent_id
    if ((pid != null || pid !== 0) && map[pid]) {
      const parent = map[pid]
      if (!parent.children) parent.children = []
      parent.children.push(temp)
      parent.children.sort((a, b) => a.sort_id - b.sort_id)
      return
    }
    tree.push(temp)
  })
  return tree
}

export default generateMenuTree
