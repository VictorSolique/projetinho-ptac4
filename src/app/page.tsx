'use client'
import styles from "./page.module.css"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import Header from "./components/Header";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies()
    if (!token) {
      router.push('/login')
    }
  }, [])

  return (
    <div>

      <Header />

      <main className="pb-4">
        <div style={{
          background: "url('https://ottawa-guide.ca/wp-content/uploads/2020/05/screen-shot-2020-05-12-at-10.45.01-pm.png?w=1224&h=582&crop=1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
          <div className="py-5" style={{ backdropFilter: "blur(4px)" }}>
            <div className="container text-center text-white" style={{ padding: "50px 20px" }}>
              <h1 className="display-4 font-weight-bold">Bem-vindo ao Restaurante Reservas</h1>
              <p className="lead">Garanta sua mesa e desfrute de uma experiência gastronômica única.</p>
              <p>Faça sua reserva online de forma rápida e fácil, e venha saborear pratos incríveis preparados especialmente para você.</p>
              <p>Não perca a chance de se deliciar com nossas especialidades!</p>
              <p>
                <a className="btn btn-light btn-lg mt-4" href={"/reservas"} style={{ fontSize: "1.2rem" }}>
                  Reserve agora mesmo &raquo;
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="container mt-3">
          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-normal lh-1">Ambiente Aconchegante. <span className="text-body-secondary">Venha nos visitar!</span></h2>
              <p className="lead">Desfrute de um ambiente acolhedor enquanto aguarda sua reserva e saboreia nossos pratos.</p>
            </div>
            <div className="col-md-5">
              <img src="https://salvadordabahia.b-cdn.net/wp-content/uploads/2019/08/restaurante-pedra-do-mar--rio-vermelho--salvador-bahia--foto-tarso-figueira-assessoria-4-500x500.jpg" alt="Restaurante com ambiente aconchegante" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading fw-normal lh-1">Pratos Especiais. <span className="text-body-secondary">Experimente o melhor!</span></h2>
              <p className="lead">Oferecemos pratos feitos com ingredientes frescos, ideais para acompanhar sua experiência de reserva.</p>
            </div>
            <div className="col-md-5 order-md-1">
              <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Prato Especial" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row d-flex justify-content-center">
            <div className="col-lg-4 text-center" style={{ width: "300px" }}>
              <img src="https://http2.mlstatic.com/D_NQ_NP_958464-MLB69426005651_052023-O.webp" alt="placa escrito reservado" className="img-fluid rounded-circle" width="140" height="140" />
              <h2 className="fw-normal">Reservas</h2>
              <p>Reserve sua mesa online de forma rápida e fácil.</p>
              <p><a className="btn btn-secondary" href={"/reservas"}>Reserve agora &raquo;</a></p>
            </div>
            <div className="col-lg-4 text-center" style={{ width: "300px" }}>
              <img src="https://http2.mlstatic.com/D_NQ_NP_958464-MLB69426005651_052023-O.webp" alt="placa escrito reservado" className="img-fluid rounded-circle" width="140" height="140" />
              <h2 className="fw-normal">Contato</h2>
              <p>Entre em contato conosco para mais informações sobre reservas.</p>
              <p><a className="btn btn-secondary" href="#">Fale conosco &raquo;</a></p>
            </div>
          </div>

        </div>

      </main>

      <footer className="container">
        <p className="float-end"><a href="#">Voltar ao topo</a></p>
        <p>&copy; 2024 Restaurante Delícias, Inc. &middot; <a href="#">Privacidade</a> &middot; <a href="#">Termos</a></p>
      </footer>

    </div>

  );
}