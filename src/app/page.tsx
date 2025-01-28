'use client'
import styles from "./page.module.css"
import Link from "next/link";
import Header from "./components/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { parseCookies } from "nookies";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const {'restaurant-token' : token} = parseCookies()
    if (!token){
      router.push('/login')
    }
  }, [])

  return (
    <div>

      <Header />

      <main>
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src="https://ottawa-guide.ca/wp-content/uploads/2020/05/screen-shot-2020-05-12-at-10.45.01-pm.png?w=1224&h=582&crop=1" className="d-block w-100" alt="Restaurante" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Bem-vindo ao Restaurante Delícias</h5>
                <p>Experimente pratos incríveis em um ambiente acolhedor.</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="https://ottawa-guide.ca/wp-content/uploads/2020/05/screen-shot-2020-05-12-at-10.45.01-pm.png?w=1224&h=582&crop=1" className="d-block w-100" alt="Prato Especial" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Prato do Dia</h5>
                <p>Delicie-se com nossa especialidade do dia.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://ottawa-guide.ca/wp-content/uploads/2020/05/screen-shot-2020-05-12-at-10.45.01-pm.png?w=1224&h=582&crop=1" className="d-block w-100" alt="Ambiente Aconchegante" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Ambiente Aconchegante</h5>
                <p>Um espaço ideal para suas refeições com amigos e família.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4 text-center" style={{width: "300px"}}>
              <img src="https://http2.mlstatic.com/D_NQ_NP_958464-MLB69426005651_052023-O.webp" alt="placa escrito reservado" className="img-fluid rounded-circle" width="140" height="140" />
              <h2 className="fw-normal">Reservas</h2>
              <p>Reserve sua mesa online de forma rápida e fácil.</p>
              <p><Link className="btn btn-secondary" href={"/cadastro"}>Reserve agora &raquo;</Link></p>
            </div>
            <div className="col-lg-4 text-center" style={{width: "300px"}}>
              <img src="https://http2.mlstatic.com/D_NQ_NP_958464-MLB69426005651_052023-O.webp" alt="placa escrito reservado" className="img-fluid rounded-circle" width="140" height="140" />
              <h2 className="fw-normal">Cardápio</h2>
              <p>Explore nosso cardápio recheado de delícias.</p>
              <p><a className="btn btn-secondary" href="#">Ver cardápio &raquo;</a></p>
            </div>
            <div className="col-lg-4 text-center" style={{width: "300px"}}>
              <img src="https://http2.mlstatic.com/D_NQ_NP_958464-MLB69426005651_052023-O.webp" alt="placa escrito reservado" className="img-fluid rounded-circle" width="140" height="140" />
              <h2 className="fw-normal">Contato</h2>
              <p>Entre em contato conosco para mais informações.</p>
              <p><a className="btn btn-secondary" href="#">Fale conosco &raquo;</a></p>
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-normal lh-1">Ambiente Aconchegante. <span className="text-body-secondary">Venha nos visitar!</span></h2>
              <p className="lead">Desfrute de uma experiência gastronômica única em um ambiente acolhedor e relaxante.</p>
            </div>
            <div className="col-md-5">
              <img src="https://salvadordabahia.b-cdn.net/wp-content/uploads/2019/08/restaurante-pedra-do-mar--rio-vermelho--salvador-bahia--foto-tarso-figueira-assessoria-4-500x500.jpg" alt="Restaurante com ambiente aconchegante" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading fw-normal lh-1">Pratos Especiais. <span className="text-body-secondary">Experimente o melhor!</span></h2>
              <p className="lead">Oferecemos pratos feitos com ingredientes frescos, preparados por nossos chefs especializados.</p>
            </div>
            <div className="col-md-5 order-md-1">
              <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Prato Especial" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" />
            </div>
          </div>

          <hr className="featurette-divider" />
        </div>

        <footer className="container">
          <p className="float-end"><a href="#">Voltar ao topo</a></p>
          <p>&copy; 2024 Restaurante Delícias, Inc. &middot; <a href="#">Privacidade</a> &middot; <a href="#">Termos</a></p>
        </footer>
      </main>
    </div>

  );
}