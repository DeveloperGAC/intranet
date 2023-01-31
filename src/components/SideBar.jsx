import React, { useEffect, useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const SideBar = ({children}) => {
    
  const location = useLocation();
  const [isOpen, setOpen] = useState(false)
  const userInfo = localStorage.getItem("name") || '';
  const user = userInfo.split(' ')
  const [theme, setTheme] = useState('')

  useEffect(() => {
    setTheme(localStorage.getItem('theme'))
    ChangeDark()
  }, [])

  const ChangeDark = () => {
    let elementId = document.getElementById('body_id');
    
    if( elementId.className === ''){
        elementId.classList.add('dark');
        localStorage.setItem('theme', 'dark')
        // setTheme('dark')
    }
    else if(elementId.className === 'dark'){
        elementId.classList.remove('dark');
        localStorage.setItem('theme', 'light')
        // setTheme('light')
    }

    console.log("elementId.className", elementId.className);
    console.log("theme variable", theme);
  }

  return (
    <>
       <nav className={ isOpen ? "sidebar": 'sidebar close'}>
        <header>
            <div className="image-text">
                <span className="image">
                    <img src="gac.png" alt="logo" />
                </span>

                <div className="text logo-text">
                    <span className="name"> {user[0]}</span>
                    <span className="profession">{user[2]}</span>
                </div>
            </div>

            <i className='bx bx-chevron-right toggle' onClick={ () => setOpen(!isOpen)}></i>
        </header>

        <div className="menu-bar">
            <div className="menu">

                {/* <li className="search-box">
                    <i className='bx bx-search icon'></i>
                    <input type="text" placeholder="Search..." />
                </li> */}

                <ul className="menu-links">
                    <li className="nav-link">
                        <NavLink to="/dashboard" className={`${location.pathname === '/dashboard' ? 'active' : ''}`}>
                            <i className='bx bx-news icon' ></i>
                            <span className="text nav-text">Noticias</span>
                        </NavLink>
                    </li>
                    {/* <li className="nav-link">
                        <NavLink to="/news">
                            <i className='bx bx-bar-chart-alt-2 icon' ></i>
                            <span className="text nav-text">Add News</span>
                        </NavLink>
                    </li> */}
                    {/* <li className="nav-link">
                        <NavLink to="/noticias">
                            <i className='bx bx-news icon'></i>
                            <span className="text nav-text">Noticias</span>
                        </NavLink>
                    </li> */}
                </ul>
            </div>

            <div className="bottom-content">
                <li className="">
                    <NavLink to="/">
                        <i className='bx bx-log-out icon' ></i>
                        <span className="text nav-text">Logout</span>
                    </NavLink>
                </li>

                <li className="mode">
                    <div className="sun-moon">
                        <i className='bx bx-moon icon moon'></i>
                        <i className='bx bx-sun icon sun'></i>
                    </div>
                    <span className="mode-text text">Dark mode</span>
                    <div className="toggle-switch" onClick={ () => ChangeDark() }>
                        <span className="switch"></span>
                    </div>
                </li>
            </div>
        </div>
    </nav>

        <section className="home">
            {children}
        </section>
        {/* <Footer /> */}
    </>
  )
}

export default SideBar