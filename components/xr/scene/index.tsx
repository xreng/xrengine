import React from 'react'
import SceneContainer from './scene-container'
import { Environment } from './environment'
import Player from '../player/player'
import './style.scss'
import SvgVr from '../../icons/svg/Vr'
import PropTypes from 'prop-types'

import AframeComponentRegisterer from '../aframe/index'

type Props = {
  children?: any
}

type State = {
  color?: string
}

export const SceneRoot = (props) => {
  const { children } = props
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <SceneContainer>
        <AframeComponentRegisterer />
        <Player />
        <Environment />
        {children}
        <a className="enterVR" id="enterVRButton" href="#">
          <SvgVr className="enterVR" />
        </a>
      </SceneContainer>
    </div>
  )
}

SceneRoot.propTypes = {
  children: PropTypes.array.isRequired
}
