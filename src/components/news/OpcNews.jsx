import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getAllNews } from '../../service/ServiceNews';
import baseUrl from '../../utils/baseUrl';

const OpcNews = () => {

  const INITIAL_STATE = {
    id: '',
    titulo: '',
    descripcion: '',
    img: '',
    id_img :''
  };

  const [allNews, setAllNews] = useState([])
  const [New, setNew] = useState(INITIAL_STATE)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState(0);

  const information = async () =>{
    try {
      const response = await getAllNews();
      setAllNews(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const captureData = ( titulo, descripcion,img, id_img, id ) =>{
    setNew({
      titulo,
      descripcion, 
      img,
      id_img,
      id
    })
  }

  const handleChange = (e) => {
		const { name, value, files } = e.target;
    if (name === 'img'){
      setNew((prevState) => ({
				...prevState,
				img: files[0],
			}));
    }else{
      setNew((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
	};

  const handleImageNew = async () =>{
    const data = new FormData();
    data.append("file", New.img);
    data.append("upload_preset", "intranet_gac")
    data.append("cloud_name", "dhtnncgka")
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dhtnncgka/image/upload", data)
      const UrlImage = response.data.secure_url;
      return {
        img: UrlImage,
        img_id: response.data.public_id,
        status: 200
      }
    } catch (error) {
      console.log(error);
    }
  } 

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      let response = ''
      if(New.img){
        response = await handleImageNew()
      }

      if(response.status === 200){
        const { titulo, descripcion} = New
  
        const payload = {
          titulo,
          descripcion,
          img:response.img,
          id_img: response.img_id
        }
        const url = `${baseUrl}/news/update-news/${New.id}`;
        await axios.put(url, payload, {header : 'Content-Type Aplication/json'});
        setSuccess(true)
        setLoading(false)
        setTimeout( function(){
          setSuccess(false)
        }, 3000);
      }

      await information()

    } catch (error) {
      console.log(error);
      setError(true)
      setLoading(false)
    }
  } 

  const deleteNew = async (id) =>{
    console.log(id, "id");
    try {
      const url = `${baseUrl}/news/delete-news/${id}`;
      await axios.delete(url, {header : 'Content-Type Aplication/json'});
      await information()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    information()
  }, [])

  const filterNews = () => {
    return allNews.slice(pagination, pagination + 4);
  }

  const next = () => { 
    if(pagination + 4 < allNews.length ) setPagination(pagination + 4 )
  }
  const back = () => {  
    if( pagination > 0 ) setPagination(pagination - 4 )
  }

  return (
    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
      <h1 className='text-center text-title'>Listado de noticias</h1>
      <table className="mt-5 table table-hover table-bordered">
        <thead className='table-primary'>
          <tr>
            <th scope="col" style={{ width: 10, height: 20}}>Titulo</th>
            <th scope="col" style={{ width: 10, height: 20}}>Descripción</th>
            <th scope="col" style={{ width: '100px'}}>imagen</th>
            <th scope="col" style={{ width: 50}}>Opciones</th>
          </tr>
        </thead>
        <tbody>
        {
          filterNews()?.map((news, index)=>(
            <tr key={index}>
              <td scope='col' className=''>{news.titulo.slice(0, 60)}</td>
              <td scope='col' className='text-justify'>{news.descripcion.slice(0, 60)}</td>
              <td scope='col'>
                <img src={news.img} alt="img" className='img-table' />
              </td>
              <td scope='col'>
                <button 
                  className='btn btn-primary' 
                  data-bs-toggle="modal" 
                  data-bs-target="#ModalEdit" 
                  style={{ width: 100}}
                  onClick={ () =>captureData(news.titulo, news.descripcion, news.img,news.id_img, news.id) }
                >Editar
                </button>
                <button 
                  className='btn btn-outline-danger' 
                  data-bs-toggle="modal" 
                  data-bs-target="#exampleModal" 
                  style={{ width: 100}}
                  onClick={ () =>captureData(news.titulo, news.descripcion, news.img,news.id_img, news.id) }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table> 
      
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
          <button disabled={pagination + 4 < allNews.length ? false : true} onClick={next} className="mt-4 button learn-more">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
              <span className="button-text">Siguiente</span>
          </button>
        </div>
      </div>

      <div className="modal fade" id="exampleModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body text-center">
              ¿Esta seguro que desea eliminar esta noticia?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">No, cancelar</button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  data-bs-dismiss="modal" 
                  onClick={ (e) => deleteNew(New.id) }
                >
                  Si, Eliminar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="ModalEdit" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <section className='centrar bg-degrade'>
              <div className="container ">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col col-xl-12">
                    <div className="card p-4 card-notice">
                    <h3 className='text-center text-title2'> Editar noticia</h3>
                    { success ?
                        <div className="alert alert-success" >
                          <i className='bx bx-check-circle'></i> Noticia actualizada correctamente
                        </div> : ''
                    }
                    { error ?
                        <div className="alert alert-danger" >
                          No se ha podido actualizar la noticia, intentelo de nuevo
                        </div> : ''
                    }
                      <form onSubmit={handleSubmit} id="create-course-form">
                        <div className='mb-3 form-group'>
                          <label>Título</label>
                          <input
                            className='form-control'
                            placeholder=''
                            name='titulo'
                            type='text'
                            value={New.titulo}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className='mb-3 form-group'>
                          <label>Descripción</label>
                          <textarea
                            className='form-control'
                            placeholder=''
                            name='descripcion'
                            type='text'
                            value={New.descripcion}
                            onChange={handleChange}
                            rows={5}
                            required
                          />
                        </div>

                        <input 
                          type="file" 
                          name='img'
                          accept='image/*'
                          onChange={handleChange}
                          required
                        />
                        
                        <div className='centrar'>
                          <button className='mt-3 btn-login' type='submit'>
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                {' '}Actualizando noticia...
                              </>
                            ) : (
                              'Actulizar'
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpcNews