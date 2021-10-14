interface IRoute {
  path: string
  component: Function
  isPublic?: boolean
  isForAdmins?: true
  redirectWhenSessionAvailable?: true
}

export type TRoutes = Record<string, IRoute>
