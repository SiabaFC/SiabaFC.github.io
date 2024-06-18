const alvo = '4dd2f3f0570fde68c11b25976f8a7addaa2fbdec2a3ad8880087059b1f49701fb0242662b8ec77502e165fd794d2ef116659d52b5527effbedecd6209957698e';
const sal = 'um_sal';

document.getElementById('btn_login').onclick = () => {
    const entrada = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');
    //if (hex_sha512(entrada + sal) === alvo){
    if (entrada == 'UMASENHA') {
        mensagem.innerHTML = "Senha correta";
        sessionStorage.setItem('logado', 1);
        //setCookie("logado","1");
        //document.cookie = `logado=1`;
        //alert('OK'+ acha_cookie('logado'));
        window.location.href = 'jogadores.html';
    } else {
        mensagem.innerHTML = "Senha errada!!!"
        alert('A senha está incorreta');
    }
}
function setCookie(k, v, expira, path) {
    if (!path) path = "/";

    var d = new Date();
    d.setTime(d.getTime() + (expira * 1000));

    document.cookie = encodeURIComponent(k) + "=" + encodeURIComponent(v) + "; expires=" + d.toUTCString() + "; path=" + path;
}
