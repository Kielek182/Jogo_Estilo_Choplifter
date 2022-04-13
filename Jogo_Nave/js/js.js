const { conditionalExpression } = require("@babel/types");
reiniciaJogo()
function start() { // Inicio da função start()
//$().append(); => somente com jquery
//$().hide();.append(); =>jquery
	$("#inicio").hide();
//CRIA DIV NO JS DENTRO DE #fundoGame do HTML,sem formatação, CONFIGURA NO CSS
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");//div jogador
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");//div inimigo1
	$("#fundoGame").append("<div id='inimigo2'></div>");//div inimigo2
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");//div amigo
	$("#fundoGame").append("<div id='placar'></div>");//DIV PLACAR
	$("#fundoGame").append("<div id='energia'></div>");//div energia
	
//Principais variáveis do jogo
var podeAtirar=true;
var jogo = {}
var fimdejogo=false;
var velocidade= 5;//velocidade inimigo;tentar parseInt(Math.random(1) * 10;
var posicaoY = parseInt(Math.random() * 334);//posição aleatória inimigo1
var TECLA = {
	W: 87,//valor decimal de cada tecla(keycode); cima
	S: 83,//baixo;
	ESPACO: 32,//tiro;
	D: 68,//frent
	A: 65//tras
	}
var pontos=0;//na div placar
var salvos=0;//na div placar
var perdidos=0;//na div placar
var energiaAtual=3;//na div energia começa com 3
//*******************  Soms do jogo ***************************************
var somDisparo=document.getElementById("somDisparo");
var somExplosao=document.getElementById("somExplosao");
var musica=document.getElementById("musica");
var somGameover=document.getElementById("somGameover");
var somPerdido=document.getElementById("somPerdido");
var somResgate=document.getElementById("somResgate");

//Música em loop       fim musica,função =>musica.currentTime=0(acabou);musica.play()
musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
musica.play();
//*******************  Fim Soms do jogo ************************************

//Verifica se o usuário pressionou alguma tecla	
jogo.pressionou = [];	
	$(document).keydown(function(e){//.keydown => pressionou tecla
	jogo.pressionou[e.which] = true;
});
	$(document).keyup(function(e){//.keyup => não existe tecla pressionada
    jogo.pressionou[e.which] = false;
});
//***************** FUNÇÃO LOOP DO JOGO ************************************
//Game Loop; funções de loop(FUNDO,MOVIMENTO JOGADOR,POSIÇÃO ALEATÓRIA INIMIGO)
jogo.timer = setInterval(loop,30);//temporizador 30ms

function loop() {//chama todas funções loop do jogo
movefundo();// Fim da função move fundo loop()
movejogador();
moveinimigo1();
moveinimigo2();
moveamigo();
colisao();
placar();
energia();
}
	
function movefundo() {
	esquerda = parseInt($("#fundoGame").css("background-position"));// => pega #fundoGame + backgroud-popsition e converte(parseInt) em 1 
	$("#fundoGame").css("background-position",esquerda-1);
/*$ pega #fundoGame + background-position.css e diminui -1px a esquerda 
da posição do fundoGame; como está em loop de 30ms, ANDA 1PX A CADA 30ms
*/
	
} // fim da função movefundo()

//******************** Função movejogador ********************************
function movejogador() {
//parseInt=>converte #jogador em top=1;atualiza para top=-10
	if (jogo.pressionou[TECLA.W]) {
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo-10);

	if (topo<=0) {//Se o topo for <=0 = topo=0(nada acontece e para)	
		$("#jogador").css("top",topo);
		}
	}
//parseInt=>converte #jogador em top=1;atualiza para top=+10(do top,então desce,kkk)	
	if (jogo.pressionou[TECLA.S]) {		
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo+10);
	
	if (topo>=434) {//434=chão; se colocar topo=0 volta para cima(infinito)
		$("#jogador").css("top",topo=434);	
		}
	}
	
	if (jogo.pressionou[TECLA.ESPACO]) {			
		disparo();//Chama função Disparo
		}

	if (jogo.pressionou[TECLA.D]) {
		var left = parseInt($("#jogador").css("left"));
		$("#jogador").css("left",left+10)

	if (left>=690) {
		$("#jogador").css("left",left);//left sem declarar=0
	}
}

	if (jogo.pressionou[TECLA.A]) {
		var left = parseInt($("#jogador").css("left"));
		$("#jogador").css("left",left-10)

	if (left<=0) {
		$("#jogador").css("left",left);//left sem declarar=0
	}
}
} 
//***************** Fim da função movejogador()*****************************

//******************** Função moveinimigo1()********************************
function moveinimigo1() {
	
	posicaoX = parseInt($("#inimigo1").css("left"));//posição #inimigo1 left 689px(está no css),transforma em numero
	$("#inimigo1").css("left",posicaoX-velocidade);//subtrai posição -velocidade(689 - velocidade)
	$("#inimigo1").css("top",posicaoY);//posição #inimigo1 = posicaoy;ALEATÓRIA que é => parseInt(Math.random() * 334);
			
	if (posicaoX<=0) {//random posição#inimigo1
	posicaoY = parseInt(Math.random() * 334);
	$("#inimigo1").css("left",730);
	$("#inimigo1").css("top",posicaoY);				
	}
/*teste mudar velocidade #inimigo1
		if (posicaoX<=0) {
		velocidade = parseInt(Math.random()* 10);//CALCULAR VELOCIDADE ENTRE 5 E 10,*10pode dar 0,kkk
		}*/
	} 
//******************* Fim da função moveinimigo1()***************************

//*******************Função moveinimigo2() *********************************
function moveinimigo2(){
	posicaoX = parseInt($("#inimigo2").css("left"));//left 775px
	$("#inimigo2").css("left",posicaoX-4);
	
	if (posicaoX<=0){
		$("#inimigo2").css("left",740);
	}
}
//*******************Fim Função moveinimigo2() ******************************

//******************  Função moveamigo **************************************
function moveamigo(){
	posicaoX = parseInt($("#amigo").css("left"));//left10px
	$("#amigo").css("left",posicaoX+2);

	if (posicaoX>=906){
		$("#amigo").css("left",0);
	}
}
//******************  Fim Função moveamigo **********************************

//******************* Função disparo ****************************************
function disparo() {
	if (podeAtirar==true) {

	somDisparo.play();//som disparo
	podeAtirar = false;

	topo = parseInt($("#jogador").css("top"));//posição top jogador	
	posicaoX = parseInt($("#disparo").css("left"));//posição left jogador	
	tiroX = posicaoX + 190;//poscaoX(top jogador)+190= tiro sair da frente do helicoptero
	topoTiro = topo + 37;//top + 37 = posição tiro
	$("#fundoGame").append("<div id='disparo'></div>");//APARECE DIV DISPARO
	$("#disparo").css("top",topoTiro);//posição div='disparo'
	$("#disparo").css("left",tiroX);//posição div='disparo'

	var tempoDisparo = window.setInterval(executaDisparo,30);//setInterval=>FUNÇÃO DE TEMPO
	}

	function executaDisparo () {
		posicaoX = parseInt($("#disparo").css("left"));		
		$("#disparo").css("left",posicaoX + 15);	
		
		if (posicaoX>900) { //REMOVE FUNÇÃO FALSE

			window.clearInterval(tempoDisparo);
			tempoDisparo=null;
			$("#disparo").remove();
			podeAtirar=true;
		}// fecha if
	}// fecha executaDisparo
}//fecha disparo()

//******************* Fim Função disparo ************************************

//******************* Função colisao ****************************************
function colisao() {
	
var colisao1 = ($("#jogador").collision($("#inimigo1")));//collision=>função Jquery.collision
var colisao2 = ($("#jogador").collision($("#inimigo2")));
var colisao3 = ($("#disparo").collision($("#inimigo1")));
var colisao4 = ($("#disparo").collision($("#inimigo2")));
var colisao5 = ($("#jogador").collision($("#amigo")));
var colisao6 = ($("#inimigo2").collision($("#amigo")));

// colisao1 jogador com o inimigo1
	if (colisao1.length>0) {//houve colisão
		energiaAtual--;//-1 energia
		inimigo1X = parseInt($("#inimigo1").css("left"));//identifica posição x left inimigo1
		inimigo1Y = parseInt($("#inimigo1").css("top"));//identifica posição y top inimigo1
		explosao1(inimigo1X,inimigo1Y);//primeiro declara função explosao1; abaixo explica funcao

		posicaoY = parseInt(Math.random() * 334);//reposiciona inimigo1 aleatoriamente
		$("#inimigo1").css("left",694);
		$("#inimigo1").css("top",posicaoY);
		}
// jogador com o inimigo2 
	if (colisao2.length>0) {
		energiaAtual--;//-1 energia
		inimigo2X = parseInt($("#inimigo2").css("left"));//identifica posição x left left inimigo2
		inimigo2Y = parseInt($("#inimigo2").css("top"));//identifica posição y top left inimigo2
		explosao2(inimigo2X,inimigo2Y);//cria função explosao2 
			
		$("#inimigo2").remove();
		
		reposicionaInimigo2();
	}	
// Disparo com o inimigo1		
	if (colisao3.length>0) {//var colisao3>0		
		
		velocidade=velocidade+0.3;//após cada(loop)colisão
		pontos=pontos+100;//colisão disparo c/ inimigo1;+100 cada(loop)
		
		inimigo1X = parseInt($("#inimigo1").css("left"));
		inimigo1Y = parseInt($("#inimigo1").css("top"));
			
		explosao1(inimigo1X,inimigo1Y);//usou a mesma função explosão1
		$("#disparo").css("left",951);//para ser >900 da função disparo
			
		posicaoY = parseInt(Math.random() * 334);
		$("#inimigo1").css("left",694);
		$("#inimigo1").css("top",posicaoY);			
		}

// Disparo com o inimigo2		
	if (colisao4.length>0) {

		
		velocidade=velocidade+0.3;//após cada(loop)colisão
		pontos=pontos+50;//colisão disparo c/ inimigo2
		
		inimigo2X = parseInt($("#inimigo2").css("left"));
		inimigo2Y = parseInt($("#inimigo2").css("top"));
		$("#inimigo2").remove();

		explosao2(inimigo2X,inimigo2Y);
		$("#disparo").css("left",951);
	
		reposicionaInimigo2();		
		}
// jogador com o amigo		
	if (colisao5.length>0) {//se jogador .amigo > 0

		somResgate.play();//audio
		salvos++;//colisão jogador c/ amigo	
		reposicionaAmigo();//
		$("#amigo").remove();
		}
//Inimigo2 com o amigo		
	if (colisao6.length>0) {
		perdidos++;//colisão inimigo2 c/ amigo	    
		amigoX = parseInt($("#amigo").css("left"));//identifica posição left
		amigoY = parseInt($("#amigo").css("top"));//indentifica posição top
		explosao3(amigoX,amigoY);//chama função explosao3 na posição x,y
		$("#amigo").remove();//remove div
			
		reposicionaAmigo();//reposiciona div
		}
}
//********************Fim da função colisao() *******************************

//******************** Função explosao1 *************************************

function explosao1(inimigo1X,inimigo1Y) {

	somExplosao.play();//audio
	$("#fundoGame").append("<div id='explosao1'></div");//chama div explosao1
	$("#explosao1").css("background-image", "url(imgs/explosao.png)");//chama .css explosao1
	
var div=$("#explosao1");//faz css explosao1 = div
	div.css("top", inimigo1Y); //posicao inimigo1
	div.css("left", inimigo1X);//posicao inimigo1
	div.animate({width:200, opacity:0}, "normal");//.animite=>Jquery; até 200width,ate 0 opacity(desaparece),devagar
	
var tempoExplosao=window.setInterval(removeExplosao, 1000);//tempo remoção div explosao1;(chama função pra depois expolicar)
	
function removeExplosao() {//remove div explosao1			
	div.remove();
	window.clearInterval(tempoExplosao);//intervalo de aparecer a div
	tempoExplosao=null;//remove div explosao1	
	}		
} 
//******************** Fim da Função explosao1 ******************************


//******************** Função Reposiciona Inimigo2 **************************
function reposicionaInimigo2() {	

var tempoColisao4=window.setInterval(reposiciona4, 4000);//cita reposiciona4 e abaixo a função ;intervalo de colisão inimigo2;5000(5segundos)

function reposiciona4() {
	window.clearInterval(tempoColisao4);
	tempoColisao4=null;
			
		if (fimdejogo==false) {//se não acabar jogo continua			
		$("#fundoGame").append("<div id=inimigo2></div");			
		}			
	}	
}
//******************** Fim Função Reposiciona Inimigo2 **************************

//******************** Função explosao2 *************************************
//mesma função explosão1 mas com dados do inimigo2	
function explosao2(inimigo2X,inimigo2Y) {

	somExplosao.play();//audio
	$("#fundoGame").append("<div id='explosao2'></div");
	$("#explosao2").css("background-image", "url(imgs/explosao.png)");
	var div2=$("#explosao2");
	div2.css("top", inimigo2Y);
	div2.css("left", inimigo2X);
	div2.animate({width:200, opacity:0}, "slow");
	
var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
	
function removeExplosao2() {
			
	div2.remove();
	window.clearInterval(tempoExplosao2);
	tempoExplosao2=null;			
	}		
} 
//******************** Fim Função explosao2 *****************************

//******************** Função Reposiciona Amigo ************************
	
function reposicionaAmigo() {	
	var tempoAmigo=window.setInterval(reposiciona6, 6000);	
		function reposiciona6() {
		window.clearInterval(tempoAmigo);
		tempoAmigo=null;//cancela função
		
		if (fimdejogo==false) {		
		$("#fundoGame").append("<div id='amigo' class='anima3'></div>");//aparece amigo	
		}		
	}
}
//************** Fim da Função reposicionaAmigo **************************

//********************* Função explosao3 **********************************
function explosao3(amigoX,amigoY) {

	somPerdido.play();//audio
	$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
	$("#explosao3").css("top",amigoY);
	$("#explosao3").css("left",amigoX);
	var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
	function resetaExplosao3() {
	$("#explosao3").remove();
	window.clearInterval(tempoExplosao3);
	tempoExplosao3=null;	
	}
} 
//******************* Fim da função explosao3 *****************************

//********************** Função placar ************************************
function placar() {
//pega div #placar
	$("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
	
} 
//******************* Fim da Função placar ********************************

//********************** Função energia ***********************************
function energia() {
	
	if (energiaAtual==3) {//se energia=3 exibe eneria3	
		$("#energia").css("background-image", "url(imgs/energia3.png)");
	}

	if (energiaAtual==2) {//se energia=2 exibe eneria2	
		$("#energia").css("background-image", "url(imgs/energia2.png)");
	}

	if (energiaAtual==1) {//se energia=1 exibe eneria1	
		$("#energia").css("background-image", "url(imgs/energia1.png)");
	}

	if (energiaAtual==0) {//se energia=0 exibe eneria0	
		$("#energia").css("background-image", "url(imgs/energia0.png)");
		
		gameOver()//Game Over
	}
}
//******************* Fim da função energia() ****************************

//********************* Função GAME OVER ***********************************
function gameOver() {
	fimdejogo=true;
	musica.pause();//pausa audio
	somGameover.play();//play audio
	
	window.clearInterval(jogo.timer);//retira função loop
	jogo.timer=null;//zera temporizador
	
	$("#jogador").remove();
	$("#inimigo1").remove();
	$("#inimigo2").remove();
	$("#amigo").remove();
	
	$("#fundoGame").append("<div id='fim'></div>");//apped(APARECE DIV)
	
	$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
	}//CONTEUDO DIV ID=FIM
//********************* Fim Função GAME OVER ******************************

}//FIM FUNÇÃO START ----------------------------------------------

//****************** Função Reinicia o Jogo ******************************		
function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();//remove div fim
	start();//chama função start
	
} //************** Fim da função reiniciaJogo  ****************************

