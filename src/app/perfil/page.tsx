'use client'
// import PerfilUsuario from "../interfaces/usuario";
import Usuario from "../interfaces/usuario";
import { useState } from 'react'

const PaginaPerfil = () => {
    const [usuario, setUsuario] = useState<Usuario>();
    setUsuario({nome: "Jose", idade: 17})

    // const usuario = {
    //     nome: "José Maria",
    //     idade: 21,
    //     email: "zema@hotmail.com"
    // }

    return (
        <div>
            <h1>Perfil:</h1>
        </div>
    )
}

export default PaginaPerfil;
