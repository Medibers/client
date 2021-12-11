interface IRoute {
  path: string
  getPath?: (id1: string, id2?: string) => string
  component: Function
  isPublic?: boolean
  isForAdmins?: true
  redirectWhenSessionAvailable?: true
}

export type TRoutes = Record<string, IRoute>
