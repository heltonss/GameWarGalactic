//iniciando a classe Back "background que cuida das imagens", posicaoContinua é uma emenda da tela
function Back(context, imagem) {
  this.context         = context;
  this.imagem          = imagem;
  this.velocidade      = 0;
  this.posicaoContinua = 0;
}
//função para desenhar na tela a atualizar as informações para termos um desenho continuo
Back.prototype = {
  atualizar: function () {
    //atualizando a posição da emenda
    this.posicaoContinua += this.velocidade;

    //quando a emenda passar da posição
    if (this.posicaoContinua > this.imagem.height) {
      this.posicaoContinua = 0;
    }

  },
  desenhar: function () {
    var img = this.imagem;

    //Primeira imagem da emenda.
    var posY = this.posicaoContinua - img.height;
    this.context.drawImage(img, 0, posY, img.width, img.height);

    posY = this.posicaoContinua;
    this.context.drawImage(img, 0, posY, img.width, img.height);


  }
}
