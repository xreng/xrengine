import { useSelector, useDispatch } from 'react-redux'
import { selectAppState } from '../../../redux/app/selector'
import { setAppLoaded } from '../../../redux/app/actions'
import { Scene } from 'aframe-react'
import SvgVr from '../../icons/svg/Vr'
import LoadingScreen from '../../ui/Loader'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import isExternalUrl from '../../../utils/isExternalUrl'
import PropTypes from 'prop-types'

export const SceneContainer = ({ children }): any => {
  const dispatch = useDispatch()
  const loaded = useSelector((state) => selectAppState(state)).get('loaded')
  const setLoaded = (loaded) => dispatch(setAppLoaded(loaded))
  const router = useRouter()
  const navigateToUrl = (e) => {
    let url = e.detail.url
    setLoaded(false)
    if (isExternalUrl(url)) {
      window.location.href = url
      return
    }

    // sometimes the url given is doesn't start with '/' meaning it is invalid and errors
    // this forces it to start with '/'
    if (!url.startsWith('/')) {
      url = '/' + url
    }
    // navigate to internal url using next/router
    router.push(url)
  }
  useEffect(() => {
    document.addEventListener('navigate', navigateToUrl)
    return () => {
      document.removeEventListener('navigate', navigateToUrl)
    }
  }, [navigateToUrl])
  return (
    <>
      {!loaded && <LoadingScreen />}
      <Scene
        vr-mode-ui="enterVRButton: #enterVRButton"
        class="scene"
        renderer="antialias: true"
        background="color: #FAFAFA"
        loading-screen="enabled: false"
        events={{
          loaded: () => setLoaded(true)
        }}
      >
        {children}
        <a className="enterVR" id="enterVRButton" href="#">
          <SvgVr className="enterVR" />
        </a>
      </Scene>
    </>
  )
}

SceneContainer.propTypes = {
  children: PropTypes.array.isRequired
}

export default SceneContainer
