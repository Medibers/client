export interface ISupportContacts {
  telephones: Array<string>
  email: string
  address: Array<string>
}

export interface ISupportContactListItem {
  header: string
  description?: string
  action?: () => void
}

export interface IFAQ {
  header?: string
  qn?: string
  ans?: string
}
