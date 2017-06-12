function Tiro(context, nave) {
    this.context = context;
    this.nave = nave;
    //this.cor = 'red';
    // Posicionar o tiro no bico da nave 
    this.largura = 90;
    this.altura = 104;
    this.x = nave.x;
    this.y = nave.y;
    this.velocidade = 15;

}
Tiro.prototype = {
    atualizar: function () {
        this.y -= this.velocidade;

        // Excluir o tiro quando sumir da tela
        if (this.y < -this.altura) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function () {
        var imgTiro = new Image();
        imgTiro.src = 'img/tiro.png';

        var ctx = this.context;
        ctx.save();
        ctx.drawImage(imgTiro, this.x, this.y);
        ctx.restore();
    },
    retangulosColisao: function () {
        return [{
            x: this.x, y: this.y, largura: this.largura,
            altura: this.altura
        }];
    },
    colidiuCom: function (outro) { }
}