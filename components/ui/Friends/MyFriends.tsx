import React, { useEffect, useState } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { selectUserState } from '../../../redux/user/selector'
import { selectAuthState } from '../../../redux/auth/selector'
import { User } from '../../../interfaces/User'
import { Button } from '@material-ui/core'
import UserItem from './UserItem'
import { Relationship } from '../../../interfaces/Relationship'
import { Dispatch, bindActionCreators } from 'redux'
import { getUserRelationship } from '../../../redux/user/service'
import NextLink from 'next/link'

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

const mapStateToProps = (state: any) => {
  return {
    userState: selectUserState(state),
    authState: selectAuthState(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserRelationship: bindActionCreators(getUserRelationship, dispatch)
})

interface Props {
  userState: any
  authState: any
  classes: any
  getUserRelationship: typeof getUserRelationship
}

const MyFriends = (props: Props) => {
  const { userState, authState, classes, getUserRelationship } = props
  const initialState = {
    userId: undefined,
    updateNeeded: false
  }

  const [state, setState] = useState(initialState)

  const relationship = userState.get('relationship') as Relationship
  const friends = relationship.friend
  const requested = relationship.requested
  const friendsCount = friends?.length + requested?.length

  const loadUserRelationship = (userId: string, forceUpdate: boolean) => {
    if (
      userId &&
      (forceUpdate || (userId !== state.userId && userId && userId !== ''))
    ) {
      getUserRelationship(userId)
      const newState = state
      newState.userId = userId
      setState(newState)
    }
  }

  useEffect(() => {
    const user = authState.get('user') as User
    loadUserRelationship(user.id, false)
  }, [])

  useEffect(() => {
    const user = authState.get('user') as User
    const updateNeeded = userState.get('updateNeeded')
    loadUserRelationship(user.id, updateNeeded)

    loadUserRelationship(user.id, false)
  }, [authState, userState])

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="h4">Friends</Typography>
          </Grid>
        </Grid>
      </div>

      <Divider variant="middle" />
      <Grid container>
        <Grid item xs>
          <NextLink href={'/friends/find'}>
            <Button variant="contained" color="primary">
              + Add a Friend
            </Button>
          </NextLink>
        </Grid>
      </Grid>

      {friends &&
        friends.length > 0 &&
        friends.map((friend) => {
          return <UserItem key={'frend_' + friend.id} data={friend} />
        })}
      {requested &&
        requested.length > 0 &&
        requested.map((friend) => {
          return <UserItem key={'requested_' + friend.id} data={friend} />
        })}

      {friendsCount === 0 && (
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="body2">
              There is no friends. Please add the friends.
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

const MyFriendsWrapper = (props: any) => <MyFriends {...props} classes={useStyles()} />

export default connect(mapStateToProps, mapDispatchToProps)(MyFriendsWrapper)
