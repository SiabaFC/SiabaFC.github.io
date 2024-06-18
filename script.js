let dados;

const divPesquisa = document.createElement('div');
divPesquisa.style.textAlign = 'center';
divPesquisa.style.padding = '5px';

const inputPesquisa = document.createElement('input');
inputPesquisa.className = 'busca'
inputPesquisa.type = 'text';
inputPesquisa.name = 'pesquisa';

divPesquisa.appendChild(inputPesquisa);

document.body.appendChild(divPesquisa);


const conteudo = document.createElement('div');
conteudo.style.display = 'flex';
conteudo.style.flexWrap = 'wrap';
conteudo.style.justifyContent = 'center';
conteudo.style.alignItems = 'center';
conteudo.style.gap = '20px';
conteudo.innerHTML = 'Carregando...';

document.body.appendChild(conteudo);


const handleClick = ( evento ) => {
    const card = evento.target.closest('article'); 
    for (const propriedade in card.dataset){
        
        //cookies
        document.cookie = `${propriedade}=${card.dataset[propriedade]}`;

        //localStorage item por item
        //localStorage.setItem(propriedade, card.dataset[propriedade]);

    }


    localStorage.setItem('atleta', JSON.stringify(card.dataset))

    window.location.href = `outra.html?elenco=${card.dataset.elenco}&altura=${card.dataset.altura}`;
}

const acha_cookie = ( chave ) => {
    const array_cookies = document.cookie.split("; ");
    const procurado = array_cookies.find(
        ( e ) => e.startsWith(`${chave}=`))
    return procurado?.split('=')[1];
}


const montaCard = (entrada) => {
    const card = document.createElement('article');
    card.style.display = 'grid';
    card.style.gridTemplateColumns = '1fr 2fr';
    card.style.gridTemplateAreas = `
    "a1 a2"
    "a1 a3"
    "a1 a4"
    "a1 a5"
    `;
    card.style.width = '25rem';

    card.style.padding = '1rem';
    card.style.background = '#00000070';
    card.style.opacity = '1';
    card.style.className = 'card';
    card.style.borderRadius = '5%';

    card.dataset.id = entrada.id;
    card.dataset.elenco = entrada.elenco;
    card.dataset.nome = entrada.nome;
    card.dataset.posicao = entrada.posicao;
    card.dataset.imagem = entrada.imagem;
    card.dataset.descricao = entrada.descricao;
    card.dataset.nomeCompleto = entrada.nome_completo;
    card.dataset.nascimento = entrada.nascimento;
    card.dataset.altura = entrada.altura;

    card.onclick = handleClick;

    const imgContainer = document.createElement('div');
    imgContainer.style.gridArea = 'a1';
    imgContainer.style.display = 'flex';
    imgContainer.style.alignItems = 'center';
    imgContainer.style.justifyContent = 'center';

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.nome}`;
    imagem.style.width = '7rem';
    imagem.style.height = '7rem';
    imagem.style.borderRadius = '20%';
    imagem.style.objectFit = 'cover';
    imagem.style.objectPosition = 'top';

    const posicao = document.createElement('p');
    posicao.innerHTML = `${entrada.posicao}`;
    posicao.style.cssText = `
        grid-area: a2;
        align-items: left;
        justify-content: center;
        fontWeight: regular;
        fontSize: 7pt;
        alignItems: left;
        justifyContent: center;
        color: #ffffff
    `;
    /*posicao.style.gridArea = 'a2';
    posicao.style.display = 'flex';
    posicao.style.alignItems = 'center';
    posicao.style.justifyContent = 'center';
    posicao.style.textTransform=  'uppercase';*/

    const nome = document.createElement('p');
    nome.innerHTML = `${entrada.nome}`;
    /*nome.className = 'nome';*/
    nome.style.gridArea = 'a2';
    nome.style.className = 'nome';
    nome.style.alignItems = 'left';
    nome.style.justifyContent = 'center';
    nome.style.fontWeight = 'bolder';
    nome.style.fontSize = '25pt';
    nome.style.color = '#ffffff';
    nome.style.textTransform = 'capitalize';

    const descricao = document.createElement('p');
    descricao.innerHTML = entrada.descricao;
    descricao.style.gridArea = 'a4';
    descricao.style.textOverflow = 'ellipsis';
    descricao.style.overflow = 'hidden';
    descricao.style.whiteSpace = 'nowrap';

    const nascimento = document.createElement('p');
    nascimento.innerHTML = entrada.nascimento;
    nascimento.style.gridArea = 'a5';

    card.appendChild(imgContainer);
    imgContainer.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(posicao);
    
  

    return card;
}



inputPesquisa.onkeyup = (ev) => {
    console.log(ev.target.value);
    
    if (ev.target.value.length > 3 || ev.target.value.length == 0){
        const filtrado = dados.filter(
            (elemento) => {
                const estaNoNome = elemento.nome.toLowerCase().includes(ev.target.value.toLowerCase());
                const estaNaPosicao = elemento.posicao.toLowerCase().includes(ev.target.value.toLowerCase());
                return estaNoNome || estaNaPosicao;
            }
        )
    
        conteudo.innerHTML = '';
    
        filtrado.forEach(
            (atleta) => {
                conteudo.appendChild(montaCard(atleta));
            }
        )
    }

    
}




const pegaDados = async (caminho) => {
    try {
        const resposta = await fetch(caminho);
    const dados = await resposta.json()
    return dados;
    } catch (error) {
        alert("Um erro ocorreu! Veja o console para mais detalhes!");
        console.error(error);
    }
}

const parametros = new URLSearchParams(window.location.search);
let time = parametros.get('time');

if (time == '' || time == null) time = 'masculino';

pegaDados("https://botafogo-atletas.mange.li/"+time).then(
    (entrada) => {
        dados = entrada;
        conteudo.innerHTML = '';
        dados.forEach(
            (atleta) => {
                conteudo.appendChild(montaCard(atleta));
            }
        )
    });

console.log('síncrono')

//alert("logado="+ sessionStorage.getItem("logado"));
if (sessionStorage.getItem("logado")==undefined) {
    alert("Você precisa estar logado para entrar no sistema!");
    window.location.href = "index.html";
}

document.getElementById('btn_sair').onclick = () => {
    sessionStorage.setItem('logado', undefined);
    window.location.href = "index.html";
}
