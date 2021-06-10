/* eslint-disable no-undef */

import React from 'react'

import { IonList } from '@ionic/react'

import { MenuAction } from 'types'
import { ListItem, Popover } from 'components'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import { State as ReducerState } from 'reducers'
import { indexIsLastInArray } from 'utils'

import * as constants from 'reducers/constants'

interface IMenuProps {
  id?: string
  actions: Array<MenuAction>
  open: boolean
  event?: Event
  hideMenu: () => void
}

const Menu: React.FC<IMenuProps> = ({
  id,
  actions,
  open,
  event,
  hideMenu: dismiss,
}) => {
  const onItemSelect = (value: string) => {
    dismiss()
    const action = actions.find(({ text }) => value === text)
    action && action.handler(id)
  }

  return (
    <Popover open={open} event={event} onDismiss={dismiss} showBackdrop={false}>
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

const mapStateToProps = (state: ReducerState) => ({
  open: Boolean(state.App.menu),
  event: state.App.menu,
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
