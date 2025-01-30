'use client'
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { parseCookies } from "nookies";
import { ApiURL } from "../config"; // Certifique-se de que essa URL está correta
import ReservasType from "../interfaces/reserva";
import Usuario from "../interfaces/usuario";
import ResponseSignin from "../interfaces/response";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');
    const [usuario, setUsuario] = useState<Usuario[]>([]);
    const [reservas, setReservas] = useState<ReservasType[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [msgError, setMsgError] = useState<string | null>(null);
    const { 'restaurant-token': token } = parseCookies();
    const router = useRouter();

    useEffect(() => {
        const fetchPerfil = async () => {
            const response = await fetch(`${ApiURL}/perfil/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            setNome(data.usuario.nome)
            setEmail(data.usuario.email)
            setTipo(data.usuario.tipo)
        };

        const fetchVerReservas = async () => {
            try {
                const response = await fetch(`${ApiURL}/reservas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (!data.erro) {
                    setReservas(data.reservas);
                } else {
                    console.error(data.mensagem);
                }
            } catch (error) {
                console.error('Erro ao buscar reservas do usuário:', error);
            }
        };

        const fetchMostrarUsuarios = async () => {
            const response = await fetch(`${ApiURL}/perfil/todos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            setUsuario(data.usuarios)

        };

        fetchMostrarUsuarios();
        fetchPerfil();
        fetchVerReservas();
    }, [token]);

    const atualizarPerfil = async () => {

        try {
            const response = await fetch(`${ApiURL}/perfil/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ nome, email }),
            });

            if (response) {
                const data: ResponseSignin = await response.json();
                const { erro, mensagem, token = '' } = data;
                console.log(data)
                if (erro) {
                    setMsgError(mensagem);
                } else {
                    console.log('Perfil atualizado com sucesso!');
                    setIsEditing(false)
                }
            } else {
                setMsgError("Erro ao atualizar perfil");
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
        }
    };

    const cancelarReserva = async (id) => {
        const reservationToCancel = { reservaId: id };

        try {
            const response = await fetch(`${ApiURL}/reservas`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(reservationToCancel),
            });

            const data = await response.json();
            if (!data.erro) {
                setReservas(reservas.filter(reserva => reserva.id !== id));
                console.log(`Reserva ${id} cancelada.`);
            } else {
                console.error(data.mensagem);
            }
        } catch (error) {
            console.error('Erro ao cancelar reserva:', error);
        }
    };

    

    return (
        <div>
            <Header />

            <main className="container mt-5">
                <h1 className="text-center">Perfil do Usuário</h1>
                <hr />
                <div className="row">
                    {/* Coluna para Reservas */}
                    <div className="col-md-8">
                        {tipo === 'adm' && (
                            <>
                            <div className="my-2">
                                <h3 className="text-center mb-3" style={{ color: "#007bff" }}>Usuários Cadastrados</h3>
                                <div className="list-group">
                                    {usuario.length > 0 ? (
                                        usuario.map((a) => (
                                            <div key={a.id} className="list-group-item">
                                                <h5 className="mb-1">{a.nome}</h5>
                                                <p className="mb-1">Email: {a.email}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="list-group-item">Nenhum usuário encontrado.</div>
                                    )}
                                </div>
                            </div>
                            <div className="my-3">
                                Colocar todas as reservas disponiveis, porém com um botão para eu poder 
                            </div>
                            </>
                        )}
                        <h3 className="text-center mb-3" style={{ color: "#007bff" }}>Minhas Reservas</h3>
                        <div className="list-group">
                            {reservas.length > 0 ? (
                                reservas.map((reserva) => (
                                    <div key={reserva.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div> 
                                            <h5 className="mb-1">Mesa {reserva.mesaId}</h5>
                                            <p className="mb-1">Número de Pessoas: {reserva.n_pessoas} pessoas</p>
                                            <small>Data: {new Date(reserva.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</small>
                                        </div>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => cancelarReserva(reserva.id)}
                                        >
                                            Cancelar Reserva
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="list-group-item">{msgError}</div>
                            )}
                        </div>
                    </div>

                    {/* Coluna para Perfil do Usuário */}
                    <div className="col-md-4">
                        <div className="card bg-light mb-4 shadow-sm">
                            <div className="card-body">
                                {isEditing ? (
                                    <>
                                        <h4>Atualizar Perfil</h4>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                            placeholder="Nome"
                                        />
                                        <input
                                            type="email"
                                            className="form-control mb-2"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                        />
                                        <button onClick={atualizarPerfil} className="btn btn-primary">
                                            Salvar
                                        </button>
                                        <button onClick={() => setIsEditing(false)} className="btn btn-secondary ms-2">
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="card-title" style={{ color: "#343a40" }}>{nome}</h2>
                                        <p className="card-text">Email: {email}</p>
                                        <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                                            Atualizar Perfil
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-light text-center py-3">
                <div className="container">
                    <p className="float-end">
                        <a href="#">Voltar ao topo</a>
                    </p>
                    <p className="mb-0">&copy; 2024 Restaurante Delícias, Inc. &middot; <a href="#">Privacidade</a> &middot; <a href="#">Termos</a></p>
                </div>
            </footer>
        </div>
    );
}