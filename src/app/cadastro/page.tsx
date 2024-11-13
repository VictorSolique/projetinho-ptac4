'use client'
import { useState } from "react";
import Usuario from "../interfaces/usuario";
import { useRouter } from "next/navigation";
import { ApiURL } from "../config";
import { setCookie } from "nookies";

interface ResponseSignin {
    erro: boolean,
    mensagem: string,
    token?: string
}

export default function Cadastro() {
    const [usuario, setUsuario] = useState<Usuario>({
        nome: '',
        email: '',
        password: '',
        tipo: 'cliente'
    });

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(usuario.nome.length < 6) {
            return window.alert("O nome deve ter pelo menos 6 caracteres")
        }
        if(usuario.email.length < 10) {
            return window.alert("O email deve ter pelo menos 10 caracteres")
        }
        if(usuario.password.length < 8) {
            return window.alert("A senha deve ter pelo menos 8 caracteres")
        }

        const response = await fetch(`${ApiURL}/auth/cadastro`, {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(usuario)
           })
            if (response){
              const data : ResponseSignin = await response.json()
              const {erro, mensagem, token = ''} = data;
              console.log(data)
              if (erro){
                setError(mensagem)  
              } else {
                setCookie(undefined, 'restaurant-token', token, {
                    maxAge: 60*60*1 // 1 hora
                  } )
                router.push('/')
              }
            } else {
              setError("Resposta não respondida");
            }

        // Aqui você pode adicionar lógica para enviar os dados para o seu backend
        console.log('Usuário cadastrado:', usuario);
    }

    const alterarNome = (novoNome: string) => {
        
        setUsuario((usuarioAnterior) => ({
            ...usuarioAnterior,
            nome: novoNome
        }));
    }

    const alterarEmail = (novoEmail: string) => {
        setUsuario((usuarioAnterior) => ({
            ...usuarioAnterior,
            email: novoEmail
        }));
    }

    const alterarPassword = (novoPassword: string) => {
        setUsuario((usuarioAnterior) => ({
            ...usuarioAnterior,
            password: novoPassword
        }));
    }

    

    return (
        <div className=" vh-100 bg-dark">
        <div className="container pt-5">
            <h2 className="text-center mb-4 text-light">Cadastro de Mesas</h2>
            <form onSubmit={onSubmit} className="bg-light p-4 rounded shadow" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        value={usuario.nome}
                        onChange={(e) => alterarNome(e.target.value)}
                        className="form-control form-control-lg"
                        required
                        min={6}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={usuario.email}
                        onChange={(e) => alterarEmail(e.target.value)}
                        className="form-control form-control-lg"
                        required
                        min={10}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input
                        type="password"
                        id="password"
                        value={usuario.password}
                        onChange={(e) => alterarPassword(e.target.value)}
                        className="form-control form-control-lg"
                        required
                    />
                </div>

                {error && (
                    <div className="d-flex justify-content-center mb-3">
                        <p className="text-danger">{error}</p>
                    </div>
                )}

                <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-success btn-lg btn-block btn-center" style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}>Cadastrar</button>
                </div>
            </form>
        </div>
        </div>
    );
}