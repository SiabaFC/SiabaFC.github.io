//alert("logado="+ sessionStorage.getItem("logado"));
if (sessionStorage.getItem("logado")==undefined) {
    alert("Você precisa estar logado para entrar no sistema!");
    window.location.href = "index.html";
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
    card.style.width = '50rem';
    card.style.height = '30rem';
    card.style.padding = '.3rem';
    card.style.padding = '1rem';
    card.style.background = '#00000066';
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

   
    const imgContainer = document.createElement('div');
    imgContainer.style.gridArea = 'a1';
    imgContainer.style.display = 'flex';
    imgContainer.style.alignItems = 'center';
    imgContainer.style.justifyContent = 'center';
    

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.nome}`;
    imagem.style.width = '13rem';
    imagem.style.height = '13rem';
    imagem.style.borderRadius = '20%';
    imagem.style.objectFit = 'cover';
    imagem.style.objectPosition = 'top';

    const posicao = document.createElement('p');
    posicao.innerHTML = `${entrada.posicao}`;
    posicao.style.cssText = `
        grid-area: a3;
        display: flex;

        text-transform: uppercase;
    `;
    /*posicao.style.gridArea = 'a2';
    posicao.style.display = 'flex';
    posicao.style.alignItems = 'center';
    posicao.style.justifyContent = 'center';
    posicao.style.textTransform=  'uppercase';*/

    const nome = document.createElement('p');
    nome.innerHTML = `${entrada.nome}`;
    /*nome.className = 'nome';*/
    nome.style.gridArea = 'a3';
    nome.style.display = 'flex';
    nome.style.alignItems = 'center';
    nome.style.fontWeight = 'bold';
    nome.style.fontSize = '20pt';
    nome.style.color = '#ffbc12';

    const descricao = document.createElement('p');
    descricao.innerHTML = entrada.descricao;
    descricao.style.gridArea = 'a4';
    descricao.style.color = '#ffffff'
    descricao.style.fontSize = '15pt';
    
    

    const nascimento = document.createElement('p');
    nascimento.innerHTML = `${entrada.nascimento} | Elenco: ${entrada.elencoPelaUrl} | Altura: ${entrada.alturaPelaUrl}`;
    nascimento.style.gridArea = 'a5';

    card.appendChild(imgContainer);
    imgContainer.appendChild(imagem);
    card.appendChild(posicao);
    card.appendChild(nome);
    card.appendChild(descricao);
    card.appendChild(nascimento);

    return card;
}

const acha_cookie = ( chave ) => {
    const array_cookies = document.cookie.split("; ");
    const procurado = array_cookies.find(
        ( e ) => e.startsWith(`${chave}=`))
    return procurado?.split('=')[1];
}

let obj = {}

// com cookies
/*const array_cookies = document.cookie.split("; ");
for (const par of array_cookies){
    const partes = par.split('=');
    obj[partes[0]] = partes[1];
}*/

// com localStorage item por item
/*const tamanhoLocalStorage = localStorage.length;

let chave;
for (let i = 0; i < tamanhoLocalStorage; i++){
    chave = localStorage.key(i);
    obj[chave] = localStorage.getItem(chave);
}*/

obj = JSON.parse(localStorage.getItem('atleta'));

const parametros = new URLSearchParams(window.location.search);
obj.alturaPelaUrl = parametros.get('altura');
obj.elencoPelaUrl = parametros.get('elenco');
obj.id = parametros.get('id');

const conteudo = document.createElement('div');
conteudo.style.display = 'flex';
conteudo.style.flexWrap = 'wrap';
conteudo.style.justifyContent = 'center';
conteudo.style.alignItems = 'center';
conteudo.style.gap = '50px';
conteudo.style.padding = '100px';
conteudo.style.color = '#ffffff'

conteudo.appendChild(montaCard(obj));

document.body.appendChild(conteudo);

document.getElementById('btn_sair').onclick = () => {
    sessionStorage.setItem('logado', undefined);
    window.location.href = "index.html";
}

document.getElementById('btn_voltar').onclick = () => {
    window.location.href = "jogadores.html";
}
