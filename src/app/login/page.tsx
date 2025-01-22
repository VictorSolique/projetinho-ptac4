'use client'
import { useRouter } from 'next/navigation';
import React, { useState, FormEvent, useEffect } from 'react';
import { ApiURL } from '../config';
import { setCookie, parseCookies } from 'nookies';
import Link from "next/link";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msgError, setMsgError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies()
    if (token) {
      router.push('/')
    }
  }, [router])


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {

      const response = await fetch(`${ApiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (response) {
        const data = await response.json();
        const { erro, mensagem, token } = data
        console.log(data)
        if (erro) {
          setMsgError(mensagem)
        } else {
          setCookie(undefined, 'restaurant-token', token, {
            maxAge: 60 * 60 * 1 //1 hora
          })
          router.push('/')
        }
      }
    } catch (error) {
      console.error('Erro na requisicao', error)
    }

    console.log('Email:', email);
    console.log('Senha:', password);
  };



  return (
    <section className="vh-100 bg-dark" style={{ background: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=60&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: "cover" }}>
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong rounded-4 bg-light shadow">
              <div className="card-body p-5 text-center">

                <h4 className="my-2 fw-normal">Faça o login para reversar sua mesa</h4>

                <form onSubmit={handleSubmit}>

                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" 
                      onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                      <label htmlFor="floatingInput">Digite seu Email</label>
                  </div>

                  <div data-mdb-input-init className="form-floating mb-3">
                    <input type="password" className="form-control form-control-lg" id="floatingPassword" 
                    onChange={(e) => setPassword(e.target.value)} placeholder="senha" required />
                    <label htmlFor="floatingPassword">Digite sua Senha</label>
                  </div>

                  {msgError &&
                    <div className="d-flex justify-content-center mb-2">
                      <p className="text-danger"> {msgError} </p>
                    </div>
                  }


                  <button type="submit" className="btn btn-primary btn-lg btn-block mb-3" aria-label="Entrar">Entrar</button>

                  <p className="text-center text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <a href="#" onClick={() => router.push('/cadastro')} className="text-indigo-500 hover:underline">
                      Cadastre-se
                    </a>

                  </p>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}

export default Login;