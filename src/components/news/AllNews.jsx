import React, { useEffect, useState } from 'react'
import { getAllNews, getNewsById } from '../../service/ServiceNews'
import Banner from '../Banner'
import Loading from '../Loading'

const AllNews = () => {

  const [news, setNews] = useState([])
  const [new_gac, setNew_gac] = useState([])
  const [pagination, setPagination] = useState(0);

  const information = async () =>{
    try {
      const response = await getAllNews();
      setNews(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    information()
  }, [])
  
  const get_new = async(e, id) => {
    e.preventDefault();
    setNew_gac([])
    try {
      const r = await getNewsById(id)
      setNew_gac(r.data[0])
      console.log(r);
    } catch (error) {
      
    }
  }

  const filterNews = () => {
    return news.slice(pagination, pagination + 6);
  }

  const next = () => { 
    if(pagination + 6 < news.length ) setPagination(pagination + 6 )
  }
  const back = () => {  
    if( pagination > 0 ) setPagination(pagination - 6 )
  }

  return (
    <section className='section-news'>
      <h1 className='text-title '>CARTELERA INFORMATIVA</h1>
      <hr />
      <Banner />
      <div className='cards'>
        {
          news.length > 0 ?
            <>
              {
                filterNews().map( (n) =>(
                  <a  className="card" key={n.id} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={ (e) => {get_new(e, n.id)} }>
                    <img src={n.img} className="" alt="" width={'100%'} height={350} />
                    <div className="card__overlay">
                      <div className="card__header">
                        <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                        <img className="card__thumb" src="/gac.png" alt="" />
                        <div className="card__header-text">
                          <h3 className="card__title">{n.titulo.slice(0, 40)}</h3>            
                          <span className="card__status">{n.fecha_creacion.slice(0, 10  )}</span>
                        </div>
                      </div>
                      <p className="card__description">{n.descripcion}</p>
                    </div>
                  </a>  
                ))
              }
              <div className='row centrar'>
                <div className='col-lg-5 col-md-5 col-sm-12'>
                  <button disabled={pagination > 0 ? false : true }  onClick={back} className="mt-4 button-back learn-more"  >
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                      <span className="button-back-text">Anterior</span>
                  </button>
                </div>
                <div className='col-lg-5 col-md-5 col-sm-12'>
                  <button disabled={pagination + 6 < news.length ? false : true} onClick={next} className="mt-4 button learn-more">
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                      <span className="button-text">Siguiente</span>
                  </button>
                </div>
              </div>
            </>
          : 
            <div className="centrar">
              <Loading />
            </div>
        }
      </div>
      {
        new_gac 
        ?
          <div className="modal" id="exampleModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="card__title text-center fst-italic">{new_gac.titulo}</h3>      
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <img 
                  src={new_gac.img} 
                  alt="" 
                  width={'100%'} 
                  height='auto' 
                  style={{ borderRadius: '10px'}}
                  className='img'
                />
                  <p className="mt-2 body-card-open" >{new_gac.descripcion}</p>
                </div>
              </div>
            </div>
          </div>
        : ''
      }
    </section>
  )
}

export default AllNews