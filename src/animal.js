export class Animal {
  constructor(nome, tipo, brinquedos) {
    this.nome = nome;
    this.tipo = tipo;
    this.brinquedos = brinquedos;
  }

  podeSerAdotado(brinquedosPessoa) {
    if (this.tipo === 'jabuti') return false; 
    let i = 0;
    for (let b of brinquedosPessoa) {
      if (b === this.brinquedos[i]) {
        i++;
        if (i === this.brinquedos.length) return true;
      }
    }
    return false;
  }
}
