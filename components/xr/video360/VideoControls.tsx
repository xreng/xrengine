import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import './VideoControls.scss'

type Props = {
  videosrc: string,
  videotext: string,
  videovrui: string
}

const initialState = {
  playing: false,
  end: false
}

export const VideoControls = (props: Props) => {
  const [state, setState] = useState(initialState)
  const { videosrc, videotext, videovrui } = props

  let videoEl: HTMLElement | null = null
  let videovruiEl: HTMLElement | null = null
  let textEl: HTMLElement | null = null

  useEffect(() => {
    videoEl = document.querySelector(videosrc) as HTMLElement
    videoEl?.addEventListener('play', videoPlayHandler.bind(this))
    videoEl?.addEventListener('pause', videoPauseHandler.bind(this))
    textEl = document.querySelector(videotext) as HTMLElement
    videovruiEl = document.querySelector(videovrui) as HTMLElement
    videovruiEl?.addEventListener('triggerplay', playHandler.bind(this))
    videovruiEl?.addEventListener('triggerpause', pauseHandler.bind(this))
    videovruiEl?.addEventListener('triggerback', exitVideoHandler.bind(this))
  }, [])

  const clickHandler = (e: any) => {
    e.preventDefault()
    if (state.end) exitVideoHandler()
    else if (!state.playing) playHandler()
  }

  const playHandler = () => {
    (videoEl as HTMLVideoElement)?.play()
    const controller = document.querySelector('#videoplayercontrols')
    controller.classList.remove('active')
    controller.classList.add('disabled')

    textEl?.setAttribute('visible', false)
    videoEl?.addEventListener('ended', videoEndHandler.bind(this), { once: true })
    setState({ ...state, playing: true })
  }

  const pauseHandler = () => (videoEl as HTMLVideoElement)?.pause()

  const videoEndHandler = () => {
    (videoEl as HTMLVideoElement)?.pause()
    const controller = document.querySelector('#videoplayercontrols')
    textEl?.addEventListener('click', exitVideoHandler)
    controller.classList.remove('disabled')
    controller.classList.add('active')
    textEl?.setAttribute('text', { value: 'END\n\nclick to exit' })
    textEl?.setAttribute('visible', true)
    setState({ ...state, playing: false, end: true })
  }

  const videoPlayHandler = () =>
    videovruiEl?.setAttribute('video-player-vr-ui', {
      isPlaying: true
    })

  const videoPauseHandler = () =>
    videovruiEl?.setAttribute('video-player-vr-ui', {
      isPlaying: false
    })

  const exitVideoHandler = () => Router.push('/explore')

  return (
    <div onClick={ (e) => clickHandler(e) }
      id="videoplayercontrols"
      className="videoplayercontrols active" />
  )
}

export default VideoControls
