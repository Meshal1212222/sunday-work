import { useTheme } from '../contexts/ThemeContext'
import BoardPro from './BoardPro'
import BoardClassic from './BoardClassic'

/**
 * BoardWrapper - يعرض واجهة البورد المناسبة بناءً على الثيم المختار
 *
 * - Pro: واجهة احترافية متقدمة بتصميم عصري داكن
 * - Classic: واجهة بسيطة بتصميم كلاسيكي فاتح
 */
export default function BoardWrapper() {
  const { isPro } = useTheme()

  // عرض الواجهة المناسبة بناءً على الثيم
  if (isPro) {
    return <BoardPro />
  }

  return <BoardClassic />
}
