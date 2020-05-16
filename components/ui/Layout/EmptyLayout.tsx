import * as React from 'react'
import Alerts from '../Common/Alerts'
import UIDialog from '../Dialog/Dialog'

type Props = {
  children: any
}

const EmptyLayout = ({ children }: Props) => (
  <React.Fragment>
    <UIDialog />
    <Alerts />
    {children}
  </React.Fragment>
)

export default EmptyLayout
