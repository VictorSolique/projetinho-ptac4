'use client'
import { useState } from "react";
import Usuario from "../interfaces/usuario";
import { useRouter } from "next/navigation";
import { ApiURL } from "../config";
import { setCookie } from "nookies";
import ResponseSignin from "../interfaces/response";

export default function Cadastro() {
    const [usuario, setUsuario] = useState<Usuario>({
        nome: '',
        email: '',
        password: '',
        tipo: 'cliente'
    });

    const [msgError, setMsgError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`${ApiURL}/auth/cadastro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        if (response) {
            const data: ResponseSignin = await response.json()
            const { erro, mensagem, token = '' } = data;
            console.log(data)
            if (erro) {
                setMsgError(mensagem)
            } else {
                setCookie(undefined, 'restaurant-token', token, {
                    maxAge: 60 * 60 * 1 // 1 hora
                })
                router.push('/')
            }
        } else {
            setMsgError("Resposta não respondida");
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
        <div className=" vh-100 bg-dark" style={{ background: "url('https://media.istockphoto.com/id/1161231986/photo/place-setting-at-a-reception.jpg?s=612x612&w=0&k=20&c=SVilOkFaLWnliIW2y0fxrrKYd6zbUjsvKxwyS76gXPg=')", backgroundSize: "cover" }}>
            <div className="container pt-5">
                <h2 className="text-center mb-4 text-light">Cadastrar Usuario</h2>
                <form onSubmit={onSubmit} className="bg-light p-4 rounded shadow" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <a className="text-end" href="#" onClick={() => router.push('/')} style={{ display: "block" }}>
                        <span className="material-symbols-outlined">house</span>
                    </a>
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

                    {msgError && (
                        <div className="d-flex justify-content-center mb-3">
                            <p className="text-danger">{msgError}</p>
                        </div>
                    )}

                    <div className="my-3 d-grid gap-2 col-6 mx-auto">
                        <button type="submit" className="btn btn-primary btn-lg btn-block btn-center">Cadastrar</button>
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Já tem uma conta?{' '}
                        <a href="#" onClick={() => router.push('/login')} className="text-indigo-500 hover:underline">
                            Entrar
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}