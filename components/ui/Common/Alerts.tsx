import React from 'react'
import { connect } from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import { selectAlertState } from '../../../redux/alert/selector'
import { alertCancel } from '../../../redux/alert/service'
import { bindActionCreators, Dispatch } from 'redux'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import './alerts.scss'

type Props = {
  alert: any
  alertCancel: typeof alertCancel
}

const mapStateToProps = (state: any) => {
  return {
    alert: selectAlertState(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  alertCancel: bindActionCreators(alertCancel, dispatch)
})

const Alerts = (props) => {
  const { alert, alertCancel } = props

  const handleClose = (e: any) => {
    e.preventDefault()
    alertCancel()
  }
  const type = alert.get('type')
  const message = alert.get('message')

  return (
    <div className="alert-container">
      {type === 'none' || message === '' ? (
        <Box />
      ) : (
        <Box m={1}>
          <Alert
            variant="filled"
            severity={alert.get('type')}
            icon={false}
            onClose={(e) => handleClose(e)}
          >
            {alert.get('message')}
          </Alert>
        </Box>
      )}
    </div>
  )
}

const AlertsWrapper = (props: any) => <Alerts {...props} />

Alerts.propTypes = AlertsWrapper.propTypes = {
  alert: PropTypes.any.isRequired,
  alertCancel: PropTypes.any.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertsWrapper)
