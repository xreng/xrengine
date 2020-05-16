// import NavItem from '../NavItem'
import React, { useEffect } from 'react'
import Link from 'next/link'

// import { siteTitle } from '../../../config/server'

import './style.scss'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { selectVideoState } from '../../../redux/video/selector'
import { bindActionCreators, Dispatch } from 'redux'
import { fetchPublicVideos } from '../../../redux/video/service'
import { PublicVideo } from '../../../redux/video/actions'
import PropTypes from 'prop-types'

// TODO: Generate nav items from a config file

interface VideoProps {
  videos: any
  fetchPublicVideos: typeof fetchPublicVideos
}

const mapStateToProps = (state: any) => {
  return {
    videos: selectVideoState(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPublicVideos: bindActionCreators(fetchPublicVideos, dispatch)
})

export const VideoList = (props) => {
  const { videos, fetchPublicVideos } = props
  useEffect(() => {
    fetchPublicVideos()
  })
  return (
    <div>
      <Button variant="contained" color="primary" className={'back'} href="/">
        Back
      </Button>
      <div className="video-container">
        {videos.get('videos').map((video: PublicVideo, i: number) => {
          return (
            <div className="box" key={i}>
              <Link
                href={
                  '/video360?manifest=' + video.url + '&title=' + video.name
                }
              >
                {video.name}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

VideoList.propTypes = {
  fetchPublicVideos: PropTypes.func.isRequired,
  videos: PropTypes.any.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList)
