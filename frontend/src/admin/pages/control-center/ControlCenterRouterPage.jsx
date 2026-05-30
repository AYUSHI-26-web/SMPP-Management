import ControlCenterPage from '../../../pages/customer/ControlCenterPage'
import Icon from '../../components/Icon'

const liftMotion = {
  whileHover: { y: -4, scale: 1.01 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 320, damping: 22 },
}

function ControlCenterRouterPage({ walletId, controlPage, memberAction, memberId }) {
  return <ControlCenterPage Icon={Icon} liftMotion={liftMotion} walletId={walletId} controlPage={controlPage} memberAction={memberAction} memberId={memberId} />
}

export default ControlCenterRouterPage


