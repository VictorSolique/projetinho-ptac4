import { cookies } from "next/headers";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import React, { useState, useEffect } from "react";
import { ApiURL } from "../config";

export default function Header() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');

    useEffect(() => {
    const { 'restaurant-token': token } = parseCookies();

        if (!token) {
            router.push("/login")
        }
        fetchPerfil();
    }, []);

    const fetchPerfil = async () => {
        const { 'restaurant-token': token } = parseCookies();

        try {
            const response = await fetch(`${ApiURL}/perfil/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setNome(data.usuario.nome);
            setTipo(data.usuario.tipo);
        } catch (error) {
            console.error('Erro ao buscar perfil do usuário:', error);
        }
    };

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#" onClick={() => router.push('/')}>Restaurante Reservas</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#" onClick={() => router.push('/')}>Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={"/reservas"}>Reservar Mesa</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={"/cadastro"}>Cadastrar</a>
                                </li>
                            </ul>
                            <div className={`d-flex align-items-center p-2 rounded ${styles.transition}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person text-light me-2" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>
                                <a className="text-light fs-6 text-decoration-none" href="#" onClick={() => router.push('/perfil')}>{nome}</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {tipo === 'adm' && (
                <div>
                    <nav className="navbar navbar-expand-md" style={{ backgroundColor: "#fdc417" }}>
                        <div className="container-fluid">
                            <ul className="navbar-nav">
                                <li className="p-2">
                                    <span>Administrador: &nbsp;</span>
                                    <a className="text-decoratoinnone" href="#" onClick={() => router.push('/mesa')}>Cadastrar Mesas</a>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}