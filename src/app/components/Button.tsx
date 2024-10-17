type ButtonProp = {
    name: string;
    numero: number
}

const Button: React.FC<ButtonProp> = ({name, numero}) => {
    return <div><h1>Nome: {name} & N° favorito: {numero}</h1></div>
}

export default Button;