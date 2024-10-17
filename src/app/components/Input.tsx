type MyInputProp = {
    value: string
}

const MyInput: React.FC<MyInputProp> = ({value}) => {
    return (
        <input value={value} placeholder="dajksd" />
    )
}

export default MyInput;