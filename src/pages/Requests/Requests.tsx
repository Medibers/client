import React from 'react'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'

import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react'
import { RefresherEventDetail } from '@ionic/core'
import { home } from 'ionicons/icons'

import { Header, Menu } from 'components'
import { Select as SelectPopover } from 'containers'

import { State as ReducerState } from 'reducers'
import {
  ItemRequest as IItemRequest,
  ItemRequest as ItemRequestInterface,
} from 'types'

import eventsInstance, {
  requestCreate as requestCreateAction,
  requestUpdate as requestUpdateAction,
  syncData as syncDataAction,
} from '../../events'

import { userIsAdmin, userIsNotClientUser } from 'utils/role'
import { getActiveRequests, getArchivedRequests } from 'utils'
import { setActiveRequestsPresence } from 'session'

import OrderButton from './OrderButton'

import getRequestsToolbarActions, { menuId } from './toolbar-actions'
import getRequestsMenuActions from 'pages/menu-actions'

import { fetchCouriers, fetchRequests, updateBackend } from './utils'
import ItemRequestList from './ItemRequestList'

import Context from './context'

import getPageText from 'text'

interface Props {
  requests?: Array<ItemRequestInterface>
  setItemRequests: (e: Array<ItemRequestInterface> | null) => {}
  showToast: (e: string) => {}
  hideToast: () => {}
}

const title = getPageText('home').title

class Component extends React.Component<Props> {
  state = {
    renderContent: false,
    courierPopoverShown: false,
    requestsSelected: [] as Array<string>,
    requestSelectedFromActionMenu: null as string | null,
    couriers: undefined,
  }

  /**
   * Reponse ("response"), a result of item request updates from either
   * Axios requests by current user
   * Or events from other user
   *
   * */
  updateRequestsUI = (
    response: ItemRequestInterface[],
    prependRequests?: true
  ) => {
    const { requests: r, showToast, hideToast, setItemRequests } = this.props
    let requests = r ? [...r] : []
    if (prependRequests) {
      requests = response.concat(requests)
    } else {
      response.forEach(request => {
        const index = requests.findIndex(o => o._id === request._id)
        requests[index] = {
          ...requests[index],
          ...request,
        }
      })
    }
    hideToast()
    setItemRequests(requests)
    this.setState(
      { requestsSelected: [], requestSelectedFromActionMenu: null },
      () => {
        const archivedRequests = getArchivedRequests(response)
        if (archivedRequests.length)
          setTimeout(() => {
            showToast(
              `${archivedRequests.length} ${
                archivedRequests.length > 1 ? 'requests' : 'request'
              } archived`
            )
          }, 400)
        setActiveRequestsPresence(
          requests.length > getArchivedRequests(requests).length
        )
      }
    )
  }

  onItemSelected = (id: string) => {
    const { requestsSelected } = this.state
    const index = requestsSelected.indexOf(id)
    if (index < 0) {
      requestsSelected.push(id)
    } else requestsSelected.splice(index, 1)
    this.setState({ requestsSelected })
  }

  onItemSelectedFromActionMenu = (id: string) => {
    this.setState({ requestSelectedFromActionMenu: id })
  }

  onCourierPopoverShow = () => {
    this.setState({
      courierPopoverShown: true,
    })
  }

  onCourierSelected = (courier: string) => {
    this.setState({ courierPopoverShown: false }, () => {
      const { requestSelectedFromActionMenu, requestsSelected } = this.state
      updateBackend(
        { courier, state: 2 },
        requestSelectedFromActionMenu
          ? [requestSelectedFromActionMenu]
          : requestsSelected,
        this.updateRequestsUI
      )
    })
  }

  onCourierPopoverDismiss = () => {
    this.setState({
      courierPopoverShown: false,
      requestSelectedFromActionMenu: null,
    })
  }

  handleFetchedRequests = (requests: IItemRequest[]) => {
    this.props.setItemRequests(requests)
    setActiveRequestsPresence(
      requests.length > getArchivedRequests(requests).length
    )
  }

  syncRequestData = async (event?: CustomEvent<RefresherEventDetail>) => {
    this.handleFetchedRequests(
      await fetchRequests(false, () => {
        event && event.detail.complete()
      })
    )
  }

  async componentDidMount() {
    this.handleFetchedRequests(await fetchRequests())
    if (userIsAdmin()) {
      this.setState({ renderContent: true, couriers: await fetchCouriers() })
    } else {
      this.setState({ renderContent: true })
    }
    this.setEventListeners()
  }

  setEventListeners = () => {
    eventsInstance.removeAllListeners()
    const fn = (result: Array<ItemRequestInterface>) => {
      this.updateRequestsUI(result, true)
    }
    eventsInstance.on(requestCreateAction, fn)
    eventsInstance.on(requestUpdateAction, this.updateRequestsUI)
    eventsInstance.on(syncDataAction, this.syncRequestData)
  }

  render() {
    const {
      renderContent,
      courierPopoverShown,
      requestsSelected,
      couriers = [],
    } = this.state

    const { requests = [] } = this.props

    const activeRequests = getActiveRequests(requests)
    const archivedRequests = getArchivedRequests(requests)

    const selectModeOn = userIsNotClientUser() && requestsSelected.length > 0

    const context = {
      selectModeOn,
      activeRequests,
      archivedRequests,
      requestsSelected,
      onItemSelected: this.onItemSelected,
      onItemSelectedFromActionMenu: this.onItemSelectedFromActionMenu,
      updateRequestsUI: this.updateRequestsUI,
      onCourierPopoverShow: this.onCourierPopoverShow,
    }

    return (
      renderContent && (
        <Context.Provider value={context}>
          <IonPage>
            <Header
              title={title}
              actions={getRequestsToolbarActions.call(context)}
              icon={home}
            />
            <Menu menuId={menuId} actions={getRequestsMenuActions()} />
            <IonContent>
              <IonRefresher slot="fixed" onIonRefresh={this.syncRequestData}>
                <IonRefresherContent></IonRefresherContent>
              </IonRefresher>
              <ItemRequestList />
              <OrderButton />
              <SelectPopover
                open={courierPopoverShown}
                items={couriers}
                onDismiss={this.onCourierPopoverDismiss}
                onSelect={this.onCourierSelected}
              />
            </IonContent>
          </IonPage>
        </Context.Provider>
      )
    )
  }
}

const mapStateToProps = (state: ReducerState) => ({
  requests: state.App.requests || undefined,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setItemRequests: payload => ({
        type: constants.SET_ITEM_REQUESTS,
        payload,
      }),
      showToast: (payload: string) => ({
        type: constants.SHOW_TOAST,
        payload,
      }),
      hideToast: () => ({
        type: constants.HIDE_TOAST,
      }),
    },
    dispatch
  )

export const RequestsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
