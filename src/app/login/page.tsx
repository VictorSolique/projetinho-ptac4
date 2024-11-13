'use client'
import styles from "../page.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from 'nookies';
import Link from "next/link";
import { ApiURL } from "../config";

interface ResponseSignin {
  erro: boolean,
  mensagem: string,
  token?: string
}

export default function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    const {'restaurant-token' : token} = parseCookies()
    if (token){
      router.push('/')
    }
  }, [])

  const  handleSubmit = async (e : FormEvent) => {
    e.preventDefault();
    try {
     const response = await fetch(`${ApiURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({email, password})
     })
      if (response){
        const data : ResponseSignin = await response.json()
        const {erro, mensagem, token = ''} = data;
        console.log(data)
        if (erro){
          setError(mensagem)
        } else {
          // npm i nookies setCookie
          setCookie(undefined, 'restaurant-token', token, {
            maxAge: 60*60*1 // 1 hora
          } )
          router.push('/')
        }
      } else {
        setError("Resposta não respondida");
      }
  } 
   catch (error) {
  console.error('Erro na requisicao', error)
}


    console.log("Email:", email);
    console.log("Senha:", password);
  }


  

  return (
    <section className="vh-100 bg-dark">
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong bg-light shadow" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Fazer login</h3>

                <form onSubmit={handleSubmit}>

                  <div data-mdb-input-init className="form-outline mb-3">
                    <input type="email" id="typeEmail-2"
                      onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" required />
                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-3">
                    <input type="password" id="typePasswordX-2"
                      onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" required />
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                  </div>

                  {error &&
                    <div className="d-flex justify-content-center mb-2">
                      <p className="text-danger"> {error} </p>
                    </div>
                  }


                  <button type="submit" className="btn btn-primary btn-lg btn-block mb-3" aria-label="Fazer login">Fazer Login</button>

                  <p className="text-center">
                    <Link href={"/cadastro"} className="text-primary">Acessar Cadastro</Link>
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