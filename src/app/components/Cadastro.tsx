

export default function Cadastro() {
    const [email, setEmail] = useState<string>()
    const [senha, setSenha] = useState<string>()
    const [usuario, setUsuario] = useState<Usuario>({
        nome: 'teste123',
        email: '',
        password: '',
        tipo: 'cliente'
    })

    const alterarNome = (novoNome : string) => (
        console.log(usuario)
        setUsuario((usuarioAnterior) => ({
            ...usuarioAnterior,
            nome: novoNome
        }))
}

    const router = useRouter();

    const onSubmit = (e: RecordingState.FormEvent<HTMLFormElement>) => (
        e.preventDefault()
        console.log('Email' + email())
    )
}