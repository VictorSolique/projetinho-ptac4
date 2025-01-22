import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Header() {
    const router = useRouter();

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Restaurante Reservas</a>
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
                            <li className="nav-item">
                                <a className="nav-link" href={"/mesa"}>Cadastrar Mesas</a>
                            </li>
                        </ul>
                        <div className="d-flex me-1">
                            <a className="btn btn-secondary" href="#" onClick={() => router.push('/perfil')}>Meu Perfil</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}