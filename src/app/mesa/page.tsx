'use client'
import { useEffect, useState } from "react";
import mesa from "../interfaces/mesa";
import { useRouter } from "next/navigation";
import { ApiURL } from "../config";
import { parseCookies, setCookie } from "nookies";
import ResponseSignin from "../interfaces/response";
import MesasType from "../interfaces/mesa";
import Usuario from "../interfaces/usuario";

export default function Mesa() {
    const [mesa, setMesa] = useState<MesasType>({
        codigo: '',
        n_lugares: 0,
    });
    const [msgError, setMsgError] = useState<string | null>(null);
    const router = useRouter();



    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { 'restaurant-token': token } = parseCookies();

        const response = await fetch(`${ApiURL}/mesa/novo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(mesa)
        })
        if (response) {
            const data: ResponseSignin = await response.json()
            const { erro, mensagem } = data;
            console.log(data)
            if (erro) {
                setMsgError(mensagem)
            }

            // Aqui você pode adicionar lógica para enviar os dados para o seu backend
            console.log('Mesa cadastrada:', mesa);
            router.push("/reservas")
        }
    }

    const alterarCodigo = (novoCodigo: string) => {

        setMesa((mesaAnterior) => ({
            ...mesaAnterior,
            codigo: novoCodigo
        }));
    }

    const alterarLugares = (novoLugares: string) => {
        setMesa((mesaAnterior) => ({
            ...mesaAnterior,
            n_lugares: Number(novoLugares)
        }));
    }



    return (
        <div className=" vh-100 bg-dark" style={{ background: "url('https://media.istockphoto.com/id/1161231986/photo/place-setting-at-a-reception.jpg?s=612x612&w=0&k=20&c=SVilOkFaLWnliIW2y0fxrrKYd6zbUjsvKxwyS76gXPg=')", backgroundSize: "cover" }}>
            <div className="container pt-5">
                <h2 className="text-center mb-4 text-light">Cadastrar Mesa</h2>
                <form onSubmit={onSubmit} className="bg-light p-4 rounded shadow" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <a className="text-end" href="#" onClick={() => router.push('/')} style={{ display: "block" }}>
                        <span className="material-symbols-outlined">house</span>
                    </a>
                    <div className="mb-3">
                        <label htmlFor="codigo" className="form-label">Código da Mesa</label>
                        <input
                            type="text"
                            id="codigo"
                            value={mesa.codigo}
                            onChange={(e) => alterarCodigo(e.target.value)}
                            className="form-control form-control-lg"
                            required
                            min={6}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lugares" className="form-label">Número de Lugares (Cadeiras)</label>
                        <input
                            type="number"
                            id="lugares"
                            value={mesa.n_lugares}
                            onChange={(e) => alterarLugares(e.target.value)}
                            className="form-control form-control-lg"
                            required
                            min={1}
                        />
                    </div>

                    {msgError && (
                        <div className="d-flex justify-content-center mb-3">
                            <p className="text-danger">{msgError}</p>
                        </div>
                    )}

                    <div className="my-3 d-grid gap-2 col-6 mx-auto">
                        <button type="submit" className="btn btn-primary btn-lg btn-block btn-center">Cadastrar Mesa</button>
                    </div>
                </form>
            </div>
        </div>
    );
}