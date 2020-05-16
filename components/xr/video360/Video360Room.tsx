
import React from 'react'
import { Entity } from 'aframe-react'
import AFRAME from 'aframe'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import VideoControls from './VideoControls'
import AframeComponentRegisterer from '../aframe'
const ShakaPlayer = dynamic(() => import('./ShakaPlayer'), { ssr: false })

const dashManifestName = 'manifest.mpd'
const hlsPlaylistName = 'master.m3u8'

// choose dash or hls
function getManifestUri(manifestPath: string): string {
  return AFRAME.utils.device.isIOS() ? manifestPath.replace(dashManifestName, hlsPlaylistName) : manifestPath
}

function Video360Room() {
  const router = useRouter()
  const manifest = router.query.manifest as string
  const title = router.query.title as string
  const format = router.query.videoformat as string

  const text = `${title || ''}\n\n(Click to Play)`

  const shakaProps = { manifestUri: getManifestUri(manifest) }
  const videospherePrimitive = format === 'eac' ? 'a-eaccube' : 'a-videosphere'
  return (
    <Entity>
      <AframeComponentRegisterer/>
      <ShakaPlayer { ...shakaProps }/>
      <Entity
        id="videoPlayerContainer"
      />
      <Entity
        primitive={videospherePrimitive}
        class="videosphere"
        src="#video360Shaka"
        loop="false"
      />
      <Entity
        id="video-player-vr-ui"
        video-player-vr-ui={{}}
        position={{ x: 0, y: 0.98, z: -0.9 }}
      />
      <VideoControls
        videosrc="#video360Shaka" videotext="#videotext" videovrui="#video-player-vr-ui" />
      <Entity id="videotext"
        text={{
          font: 'roboto',
          width: 2,
          align: 'center',
          baseline: 'center',
          color: 'white',
          transparent: false,
          value: text
        }}
        position={{ x: 0, y: 1.6, z: -0.8 }}
      />
    </Entity>
  )
}

export default Video360Room
