interface IEntity {
  _id: string
  name: string
}

interface ISelectOption {
  label: string
  value: string
}

export const mapEntitiesToSelectOptions = (
  entities: IEntity[]
): ISelectOption[] =>
  entities.map(({ _id, name }) => ({ label: name, value: _id }))
