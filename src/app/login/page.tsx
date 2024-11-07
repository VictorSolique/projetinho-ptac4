'use client'
import styles from "../page.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Usuario from "../interfaces/usuario";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: 1,
      nome: "Jorginho BeachTenis",
      email: "jorginho.beachtenis@gmail.com",
      password: "senha123",
      tipo: "adm"
    },
    {
      id: 2,
      nome: "Cela Lopes",
      email: "cela.lopes@gmail.com",
      password: "senha123",
      tipo: "cliente"
    },
    {
      id: 2,
      nome: "Usuario",
      email: "usuario@gmail.com",
      password: "123456",
      tipo: "cliente"
    }
  ])
  const router = useRouter();


  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    fetch("")
    console.log("Email:", email);
    console.log("Senha:", password);    
  }


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usuario = usuarios.find((user) => user.email == email && user.password == password)
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario))
      router.push('/')
    }
    else {
      setError("Email ou senha invalidos")
    }

  }

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuario')
    if (usuarioLogado) {
      router.push('/')
    }
  }, [router])

  return (
    <section className="vh-100 bg-dark">
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong bg-light shadow" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Fazer login</h3>

                <form onSubmit={onSubmit}>

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