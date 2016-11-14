//iniciando a classe animação
function Animacao(context) {
  this.context = context;
  this.sprites = [];
  this.ligado = false;
}
//criando os métodos da nossa animação
Animacao.prototype = {
  novoSprite: function (sprite) {
    this.sprites.push(sprite);
    sprite.animacao = this;
  },
  ligar: function () {
    this.ligado = true;
    this.proximoFrame(); //cuida da animação
  },
  desligar: function () {
    this.ligado = false;
  },
  //funcao resposável pela animação
  proximoFrame: function () {
    if (!this.ligado) {
      return;
    }

    //reponsável por limpar a tela para um novo desenho
    this.limparTela();

    //Atualizar os estados dos sprites
    for (var i in this.sprites) {
      this.sprites[i].atualizar();
    }
    //Atualizar os estados dos sprites
    for (var i in this.sprites) {
      this.sprites[i].desenhar();
    }

    //Chamamos o próximo
    var animacao = this;
    requestAnimationFrame(function () {
      animacao.proximoFrame();
    });
  },
  limparTela: function () {
    var ctx = this.context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  }

}
