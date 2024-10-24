'use client'
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Usuario from "../interfaces/usuario";

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
    }
  ])
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usuario = usuarios.find((user) => user.email == email && user.password == password)
    if(usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario))
      router.push('/cadastro')
    }
    else {
      setError("Email ou senha invalidos")
    }
    
  }

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuario')
    if (usuarioLogado) {
      router.push('/cadastro')
    }
    else {
      setError("Email ou senha inválido")
    }
  }, [router])

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h2>Login</h2>
        <form onSubmit={onSubmit}>

          <input type="text" 
           onChange={(e) => setEmail(e.target.value)}
           placeholder="Email" required className={styles.input}/>
          <input type="password" 
           onChange={(e) => setPassword(e.target.value)}
           placeholder="Senha" required className={styles.input}/>

          {error && <p style={{color: "red"}}>{error}</p>}

          <button type="submit" className={styles.link}>Login</button> 
        </form>
      </div>
    </div>

  );
}