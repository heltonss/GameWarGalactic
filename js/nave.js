function Nave(context, teclado, imagem) {
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
}
Nave.prototype = {
    atualizar: function () {
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) this.x -= this.velocidade;
        if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - this.imagem.width) this.x += this.velocidade;
        if (this.teclado.pressionada(SETA_ACIMA) && this.y > 0) this.y -= this.velocidade;
        if (this.teclado.pressionada(SETA_ABAIXO) && this.y < this.context.canvas.height - this.imagem.height) this.y += this.velocidade;
    },
    desenhar: function () {
        this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width,
            this.imagem.height);

    },
    atirar: function () {
        var t = new Tiro(this.context, this);
        this.animacao.novoSprite(t);
        this.animacao.novoSprite(t);
        this.colisor.novoSprite(t)
    },
    retangulosColisao: function () {
        // Estes valores vão sendo ajustados aos poucos
        var rets =
            [
                { x: this.x + 2, y: this.y + 19, largura: 9, altura: 13 },
                { x: this.x + 13, y: this.y + 3, largura: 10, altura: 33 },
                { x: this.x + 25, y: this.y + 19, largura: 9, altura: 13 }
            ];
        return rets;
    },
    colidiuCom: function (outro) {
        // Se colidiu com um Ovni...
        if (outro instanceof Meteor) {
            this.animacao.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(this);
            this.colisor.excluirSprite(outro);

            var exp1 = new Explosao(this.context, this.imgExplosao,
                this.x, this.y);
            var exp2 = new Explosao(this.context, this.imgExplosao,
                outro.x, outro.y);

            this.animacao.novoSprite(exp1);
            this.animacao.novoSprite(exp2);

            var nave = this;
            exp1.fimDaExplosao = function () {
                nave.vidasExtras--;

                if (nave.vidasExtras < 0) {
                    if (nave.acabaramVidas) nave.acabaramVidas();
                }
                else {
                    // Recolocar a nave no engine
                    nave.colisor.novoSprite(nave);
                    nave.animacao.novoSprite(nave);

                    nave.posicionar();
                }
            }
        }
    },
    posicionar: function () {
        var canvas = this.context.canvas;
        this.x = canvas.width / 2 - 18;  // 36 / 2
        this.y = canvas.height - 48;
    }
}