import axios from 'axios';
import React, { useState } from 'react'
import { getAllNews } from '../../service/ServiceNews';
import baseUrl from '../../utils/baseUrl';

const INITIAL_STATE = {
  titulo: '',
  descripcion: '',
  img: '',
  id_img :''
};

const AddNews = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [news, setNews] = useState(INITIAL_STATE);

  const handleChange = (e) => {
		const { name, value, files } = e.target;
    if (name === 'img'){
      setNews((prevState) => ({
				...prevState,
				img: files[0],
			}));
    }else{
      setNews((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
	};

  const handleImageNew = async () =>{
    const data = new FormData();
    data.append("file", news.img);
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
      if(news.img){
        response = await handleImageNew()
      }

      if(response.status === 200){
        const { titulo, descripcion} = news
  
        const payload = {
          titulo,
          descripcion,
          img:response.img,
          id_img: response.img_id
        }
        const url = `${baseUrl}/news/create-news`;
        await axios.post(url, payload, {header : 'Content-Type Aplication/json'});
        setNews(INITIAL_STATE)
        console.log(news);
        setSuccess(true)
        setLoading(false)
        document.getElementById("create-course-form").reset();
        await information()
        setTimeout( function(){
          setSuccess(false)
        }, 3000);
      }

    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  const information = async () =>{
    try {
      const response = await getAllNews();
      setNews(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
      <h1 className='text-center text-title'>Sección de noticias</h1>
      <section className='centrar bg-degrade'>
        <div className="container py-3">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col col-xl-10 mt-4">
              <div className="card p-4 card-notice">
              <h3 className='text-center text-title2'>Nueva noticia</h3>
              { success ?
                <div className="alert alert-primary" >
                  <i className='bx bx-check-circle'></i> Noticia agregada correctamente
                </div> : ''
              }
              { error ?
                <div className="alert alert-danger" >
                  No se ha podido agregar la noticia, intentelo de nuevo
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
                      value={news.titulo}
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
                      value={news.descripcion}
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
                          {' '}Subiendo noticia...
                        </>
                      ) : (
                        'Agregar'
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
  )
}

export default AddNews