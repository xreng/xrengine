import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { selectUserState } from '../../../redux/user/selector'
import { selectAuthState } from '../../../redux/auth/selector'
import { User } from '../../../interfaces/User'
import UserItem from './UserItem'
import { getUsers } from '../../../redux/user/service'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      padding: '10px'
    },
    section1: {
      padding: theme.spacing(3)
    }
  })
)

interface Props {
  userState: any
  authState: any
  classes: any
  getUsers: typeof getUsers
}

const mapStateToProps = (state: any) => {
  return {
    userState: selectUserState(state),
    authState: selectAuthState(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUsers: bindActionCreators(getUsers, dispatch)
})

const UserList = (props: Props) => {
  const { userState, authState, classes, getUsers } = props
  const [state, setState] = useState({ userId: undefined })

  const users = userState.get('users')

  const loadUsers = (userId: string, forceUpdate: boolean) => {
    if (
      userId &&
      (forceUpdate || (userId !== state.userId && userId && userId !== ''))
    ) {
      getUsers(userId)

      setState({ userId })
    }
  }

  useEffect(() => {
    const user = authState.get('user') as User
    loadUsers(user.id, false)
  })

  // TODO: Replace with effect!
  // eslint-disable-next-line camelcase
  const UNSAFE_componentWillReceiveProps = (nextProps: any) => {
    const { authState, userState } = nextProps
    const user = authState.get('user') as User
    const updateNeeded = userState.get('updateNeeded')

    loadUsers(user.id, updateNeeded)
  }

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="h4">Users</Typography>
          </Grid>
        </Grid>
      </div>

      <Divider variant="middle" />

      {users &&
        users.length > 0 &&
        users.map((user: User) => {
          return <UserItem key={'user_' + user.id} data={user} />
        })}

      {(!users || users.length === 0) && (
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="body2">There is search users.</Typography>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

const UserListWrapper = (props: any) => (
  <UserList {...props} classes={useStyles()} />
)

export default connect(mapStateToProps, mapDispatchToProps)(UserListWrapper)
