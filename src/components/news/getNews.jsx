import React from 'react'
import SideBar from '../SideBar'

const GetNews = () => {
  return (
    <SideBar>
      <ul className="cards">
  <li>
    <a href="" className="card">
      <img src="https://i.imgur.com/oYiTqum.jpg" className="card__image" alt="" />
      <div className="card__overlay">
        <div className="card__header">
          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          <img className="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
          <div className="card__header-text">
            <h3 className="card__title">Jessica Parker</h3>            
            <span className="card__status">1 hour ago</span>
          </div>
        </div>
        <p className="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
      </div>
    </a>      
  </li>
  <li>
    <a href="" className="card">
      <img src="https://i.imgur.com/2DhmtJ4.jpg" className="card__image" alt="" />
      <div className="card__overlay">        
        <div className="card__header">
          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                 
          <img className="card__thumb" src="https://i.imgur.com/sjLMNDM.png" alt="" />
          <div className="card__header-text">
            <h3 className="card__title">kim Cattrall</h3>
            <span className="card__status">3 hours ago</span>
          </div>
        </div>
        <p className="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
      </div>
    </a>
  </li>
  <li>
    <a href="" className="card">
      <img src="https://i.imgur.com/oYiTqum.jpg" className="card__image" alt="" />
      <div className="card__overlay">
        <div className="card__header">
          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          <img className="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
          <div className="card__header-text">
            <h3 className="card__title">Jessica Parker</h3>
            <span className="card__tagline">Lorem ipsum dolor sit amet consectetur</span>            
            <span className="card__status">1 hour ago</span>
          </div>
        </div>
        <p className="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
      </div>
    </a>
  </li>
  <li>
    <a href="" className="card">
      <img src="https://i.imgur.com/2DhmtJ4.jpg" className="card__image" alt="" />
      <div className="card__overlay">
        <div className="card__header">
          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                 
          <img className="card__thumb" src="https://i.imgur.com/sjLMNDM.png" alt="" />
          <div className="card__header-text">
            <h3 className="card__title">kim Cattrall</h3>
            <span className="card__status">3 hours ago</span>
          </div>          
        </div>
        <p className="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
      </div>
    </a>
  </li>    
</ul>
      <div className='row' style={{ margin: 0}}>
          <section className='centrar bg-degrade'>
            <div className="container py-3">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col col-xl-10">
                  <div className="card p-4 card-notice">
                    <h1 className='text-center m-2 text-title'>Sección de noticias</h1>
                    <div className='cardNews'>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      </div>
    </SideBar>
  )
}

export default GetNews