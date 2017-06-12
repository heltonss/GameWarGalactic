//iniciando a classe animação
function Animacao(context) {
  this.context = context;
  this.sprites = [];
  this.ligado = false;
  this.processamentos = [];
  this.spritesExcluir = [];
  this.processamentosExcluir = [];
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
      //reponsável por limpar a tela para um novo desenho
      // this.limparTela();
    }
    //processamentos gerais

    //Atualizar os estados dos sprites
    for (var i in this.sprites) {
      this.sprites[i].atualizar();
    }
    //Atualizar os estados dos sprites
    for (var i in this.sprites) {
      this.sprites[i].desenhar();
    }

    for (var i in this.processamentos) {
      this.processamentos[i].processar();
    }

    //processar exclusoes
    this.processarExclusoes();

    //Chamamos o próximo
    var animacao = this;
    requestAnimationFrame(function () {
      animacao.proximoFrame();
    });
  },
  novoProcessamento: function (processamento) {
    this.processamentos.push(processamento);
    processamento.animacao = this;
  },
  excluirSprite: function (sprite) {
    this.spritesExcluir.push(sprite);
  },
  excluirProcessamento: function (processamento) {
    this.processamentosExcluir.push(processamento);
  },
  processarExclusoes: function () {
    // Criar novos arrays
    var novoSprites = [];
    var novoProcessamentos = [];

    // Adicionar somente se não constar no array de excluídos
    for (var i in this.sprites) {
      if (this.spritesExcluir.indexOf(this.sprites[i]) == -1)
        novoSprites.push(this.sprites[i]);
    }

    for (var i in this.processamentos) {
      if (this.processamentosExcluir.indexOf(this.processamentos[i])
        == -1)
        novoProcessamentos.push(this.processamentos[i]);
    }

    // Limpar os arrays de exclusões
    this.spritesExcluir = [];
    this.processamentosExcluir = [];

    // Substituir os arrays velhos pelos novos
    this.sprites = novoSprites;
    this.processamentos = novoProcessamentos;
  },
}
