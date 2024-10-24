'use client'

import { useState } from "react"
import Usuario from "../interfaces/usuario"
import { useRouter } from "next/navigation"

export default function Cadastro() {
    const [usuario, setUsuario] = useState<Usuario>({
        nome: 'teste123',
        email: '',
        password: '',
        tipo: 'cliente'
    })

    const alterarNome = (novoNome : string) => {
        console.log(usuario)
        setUsuario((usuarioAnterior) => ({
            ...usuarioAnterior,
            nome: novoNome
        })) 
    }

    const alterarEmail = (novoEmail : string) => {
        console.log(usuario)
        setUsuario((usuarioAnterior) => ({
            ...usuarioAnterior,
            email: novoEmail
        })) 
    }

    const alterarPassword = (novoPassword : string) => {
        console.log(usuario)
        setUsuario((usuarioAnterior) => ({
            ...usuarioAnterior,
            password: novoPassword
        })) 
    }

    const router = useRouter();

    return (
        <div>
            <h1>fhjkshdfjkh</h1>
        </div>
    )

}