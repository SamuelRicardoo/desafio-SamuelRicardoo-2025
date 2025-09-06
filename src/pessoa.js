export class Pessoa {
  constructor(numero, brinquedos) {
    this.numero = numero;
    this.brinquedos = brinquedos;
    this.adotados = [];
  }

  podeAdotar(animal) {
    if (this.adotados.length >= 3) return false;
    return animal.podeSerAdotado(this.brinquedos);
  }

  adotar(animal) {
    this.adotados.push(animal);
  }

}
