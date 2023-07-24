import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import { ShoppingBasket } from '@material-ui/icons'
import { useStateValue } from './StateProvider'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const Header = () => {
  const [{ basket, user }] = useStateValue()

  const login = () => {
    if (user) {
      signOut(auth)
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        />
      </Link>

      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && '/login'} className="header__link">
          <div onClick={login} className="header__option">
            <span className="header__optionLineOne">Hello {user?.email}</span>
            <span className="header__optionLineTwo">
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>

        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>
        </Link>
      </div>

      <Link to="/checkout" className="header__link">
        <div className="header__optionBasket">
          <ShoppingBasket />
          <span className="header__basketCount header__optionLineTwo">
            {basket.length}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default Header
