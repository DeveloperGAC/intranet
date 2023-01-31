import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';

const INITIAL_USER = {
	usuario: '',
	password: '',
};
const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(INITIAL_USER)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
    setError(false)
  }, [user])
  
  const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

  const handleSubmit = async (e) => {
		e.preventDefault();
    setDisabled(true)
    setLoading(true)
		try {
			const url = `${baseUrl}/users/getuser`;
			const payload = { ...user };
			const response = await axios.post(url, payload, {
        header : 'Content-Type Aplication/json',
      });
      console.log(response.data.data.usuario.nombre);
      if(response.data.status === 500){
        setError(true)
      }else{
        setLoading(false)
        navigate("/dashboard")
        setDisabled(false)
        localStorage.setItem("name", response.data.data.usuario.nombre)
      }
		} catch (error) {
      setError(true)
		} finally {
      setDisabled(false)
			setLoading(false);
		}
	};
  return (
    <>
      <section className='centrar'>
        <div className="container py-3">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col col-xl-4">
              <h3 className='mt-5 mb-3 text-center text-title'>¡Bienvenido Intranet!</h3>
              <div className="card p-4 Mycard">
                <div className='centrar'>
                  <img className='img-login' src='gac.png' alt="logo" />
                </div>
                <form onSubmit={handleSubmit}>
                  {
                    error ?
                      <div className="m-1 text-center alert alert-danger alert-dismissible fade show" role="alert">
                         usuario o contraseña incorrectos.
                        <button onClick={ () => setError(false) } type="button" className="btn-close" ></button>
                      </div>
                    : ''  
                  }
                  <div className='form-group'>
                    <label>Usuario</label>
                    <input
                      className='form-control'
                      placeholder='Usuario CRM'
                      name='usuario'
                      type='text'
                      value={user.usuario}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='form-group'>
                    <label>Contraseña</label>
                    <input
                      className='form-control'
                      placeholder='Contraseña CRM'
                      name='password'
                      type='password'
                      value={user.password}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className='centrar'>
                    <button className='mt-3 btn-login' type='submit' disabled={disabled}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          {' '}Cargando...
                        </>
                      ) : (
                      'Iniciar Sesión '
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignIn