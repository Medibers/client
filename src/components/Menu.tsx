/* eslint-disable no-undef */

import React, { PropsWithChildren } from 'react'

import { IonList } from '@ionic/react'

import { MenuAction } from 'types'
import { ListItem, Popover } from 'components'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import { State as ReducerState } from 'reducers'
import { indexIsLastInArray } from 'utils'

import * as constants from 'reducers/constants'

interface IMenuProps {
  menuId?: string
  entityId?: string
  actions: Array<MenuAction>
  open?: boolean
  event?: Event
  hideMenu?: () => void
}

const Menu: React.FC<IMenuProps> = ({
  entityId,
  actions,
  open,
  event,
  hideMenu: dismiss,
}) => {
  const onItemSelect = (value: string) => {
    dismiss && dismiss()
    const action = actions.find(({ text }) => value === text)
    action && action.handler(entityId)
  }

  return (
    <Popover
      open={Boolean(open)}
      event={event}
      onDismiss={dismiss}
      showBackdrop={false}
    >
      <IonList>
        {actions.map((action, i, a) => (
          <ListItem
            key={action.text}
            isLast={indexIsLastInArray(i, a)}
            onClick={() => onItemSelect(action.text)}
          >
            {action.text}
          </ListItem>
        ))}
      </IonList>
    </Popover>
  )
}

const mapStateToProps = (
  { App: { menu } }: ReducerState,
  { menuId }: PropsWithChildren<IMenuProps>
) => ({
  open: menu && menu.id === menuId,
  event: menu && menu.event,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      hideMenu: () => ({
        type: constants.HIDE_MENU,
      }),
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
