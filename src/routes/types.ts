interface IRoute {
  path: string
  component: Function
  isPublic?: boolean
  preventRedirectWhenSessionAvailable?: true
}

export type TRoutes = Record<string, IRoute>
