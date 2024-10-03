import styles from "./page.module.css"
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.main}>
        <h1>Atividade 2 - PTAC4</h1>
        <p>Três Interfaces</p>
        <Link href={"/perfil"} className={styles.link}>Ir para página Perfil</Link>
        <p style={{fontSize: "12px"}}>Dupla: Anabela e Victor Solique</p>
    </div>

  );
}
