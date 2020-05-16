import { useEffect } from 'react'
import shaka from 'shaka-player'
import AFRAME from 'aframe'
import PropTypes from 'prop-types'

const initApp = (manifestUri: string) => {
  shaka.polyfill.installAll()

  if (shaka.Player.isBrowserSupported()) {
    initPlayer(manifestUri)
  } else {
    console.error('Browser not supported!')
  }
}

const initPlayer = (manifestUri: string) => {
  const video: HTMLVideoElement = document.getElementById('video360Shaka') as HTMLVideoElement
  const player = new shaka.Player(video)

  player.load(manifestUri).then(() => {
    console.log('The video has now been loaded!')
  })
  video.addEventListener('loadeddata', loadedDataVideoHandler)
}

const loadedDataVideoHandler = () => {
  if (AFRAME.utils.device.isIOS()) { // TODO: Replace with redux store device ref
    forceIOSCanvasRepaint() // fix Safari iPhone bug with black screen
  }
}

const forceIOSCanvasRepaint = () => {
  const sceneEl = document.querySelector('a-scene')
  const canvasEl = sceneEl.canvas
  const width = canvasEl.width
  const height = canvasEl.height

  canvasEl.width = width + 1
  canvasEl.height = height + 1
  canvasEl.width = width
  canvasEl.height = height
}

export const ShakaPlayer = (props) => {
  const { manifestUri } = props

  useEffect(() => {
    const sceneEl = document.querySelector('a-scene')
    if (sceneEl?.hasLoaded) initApp(manifestUri)
    else sceneEl?.addEventListener('loaded', initApp.bind(this, props.manifestUri))
  })

  return null
}

ShakaPlayer.propTypes = { manifestUri: PropTypes.string.isRequired }
