import styles from "./page.module.css"
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.main}>
        <h1>Login Necessário</h1>
        <p>Realize o login para poder acessar o site</p>
        <Link href={"/login"} className={styles.link}>Ir para login</Link>
        <p style={{fontSize: "12px"}}>Dupla: Anabela e Victor Solique</p>
    </div>

  );
}
