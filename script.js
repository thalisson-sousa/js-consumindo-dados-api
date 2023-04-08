async function buscaEndereco(cep) {
    let mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";

    try {
        let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        let consultaCEPConvertida = await consultaCep.json()
        if (consultaCEPConvertida.erro) {
            throw Error(`CEP ${cep} não existente`)
        }
        let cidade = document.getElementById('cidade');
        let logradouro = document.getElementById('endereco');
        let estado = document.getElementById('estado');
        let bairro = document.getElementById('bairro');
        let complemento = document.getElementById('complemento')

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;
        complemento.value = consultaCEPConvertida.complemento;

        return consultaCEPConvertida
    } catch (erro) {
        mensagemErro.innerHTML = `<p>Cep Invalido, Favor informar cep correto!</p>`;
        mensagemErro.style.color = 'red';
    }
}

let cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))