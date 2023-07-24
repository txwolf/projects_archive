import Image from 'next/image'
import logo from '../public/logo.svg'

const Header = () => {
  return (
    <div className="header">
      <Image width={130} height={130} src={logo} alt="logo" />
      Legio
    </div>
  )
}

export default Header
