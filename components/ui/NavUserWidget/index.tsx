import Button from '@material-ui/core/Button'
import SignIn from '../Auth/Login'
import { logoutUser } from '../../../redux/auth/service'
import { selectAuthState } from '../../../redux/auth/selector'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Avatar from '@material-ui/core/Avatar'
import { showDialog } from '../../../redux/dialog/service'
import Dropdown from '../Profile/profileDown'

import './style.scss'
import { User } from '../../../interfaces/User'

const mapStateToProps = (state: any) => {
  return {
    auth: selectAuthState(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutUser: bindActionCreators(logoutUser, dispatch),
  showDialog: bindActionCreators(showDialog, dispatch)
})

type Props = {
  auth: any
  logoutUser: typeof logoutUser
  showDialog: typeof showDialog
}

const NavUserBadge = (props: Props) => {
  const { auth, logoutUser, showDialog } = props
  const styles = {
    loginButton: {
      color: 'white'
    },
    logoutButton: {
      color: 'white'
    }
  }

  const handleLogout = () => {
    logoutUser()
  }

  const isLoggedIn = auth.get('isLoggedIn')
  const user = auth.get('user') as User
  const userName = user && user.name
  const avatarLetter = userName ? userName.substr(0, 1) : 'X'

  return (
    <div className="userWidget">
      {isLoggedIn && (
        <div className="flex">
          <Button onClick={() => handleLogout()} style={styles.logoutButton}>
            {userName}
            <br />
            Logout
          </Button>
          <Dropdown avatar={user && user.avatar}>
            {user && user.avatar ? (
              <Avatar alt="User Avatar Icon" src={user.avatar} />
            ) : (
              <Avatar alt="User Avatar">{avatarLetter}</Avatar>
            )}
          </Dropdown>
        </div>
      )}
      {!isLoggedIn && (
        <Button
          style={styles.loginButton}
          onClick={() =>
            showDialog({
              children: <SignIn />
            })
          }
        >
          Log In
        </Button>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavUserBadge)
