import * as React from 'react'
import Alerts from '../Common/Alerts'
import XDialog from '../Dialog/Dialog'

type Props = {
  children: any
}

const EmptyLayout = ({ children }: Props) => (
  <React.Fragment>
    <XDialog />
    <Alerts />
    {children}
  </React.Fragment>
)

export default EmptyLayout
