import "./Login.css"
function Login() {
    return (
    <div className="Login">
        <h1>Formular.io</h1>
        <div className="InputBox">
            <input id="LoginInput" placeholder="Login"></input>
        </div>
        <div className="InputBox">
            <input id="PasswordInput" placeholder="Senha" type="password"></input>
        </div>
        <div className="InputButtonDiv">
            <a href="../../Componentes/Criar-fomulario/index.html"><button className="InputButton">Login</button></a>
            <a href="../Tela-Cadastro-main/index.html"><span className="ForgotButton2">Cadastrar</span></a>
            <a href="../Redefinir Senha/index.html"><span className="ForgotButton">Esqueci minha senha</span></a>
        </div>
    </div>
    )
}

export default Login;