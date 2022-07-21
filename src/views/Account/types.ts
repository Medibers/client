export interface IItem {
  name: string
  value: string
  icon: string
  actionText?: string | JSX.Element
  handler?: () => void
}
