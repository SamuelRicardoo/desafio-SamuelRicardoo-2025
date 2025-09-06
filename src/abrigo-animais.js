import { Animal } from './animal.js';
import { Pessoa } from './pessoa.js';

class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: new Animal('Rex', 'cão', ['RATO', 'BOLA']),
      Mimi: new Animal('Mimi', 'gato', ['BOLA', 'LASER']),
      Fofo: new Animal('Fofo', 'gato', ['BOLA', 'RATO', 'LASER']),
      Zero: new Animal('Zero', 'gato', ['RATO', 'BOLA']),
      Bola: new Animal('Bola', 'cão', ['CAIXA', 'NOVELO']),
      Bebe: new Animal('Bebe', 'cão', ['LASER', 'RATO', 'BOLA']),
      Loco: new Animal('Loco', 'jabuti', ['SKATE', 'RATO'])
    };

    this.todosBrinquedos = new Set([
      'RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'
    ]);
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const pessoa1 = new Pessoa(1, this.parseBrinquedos(brinquedosPessoa1));
      const pessoa2 = new Pessoa(2, this.parseBrinquedos(brinquedosPessoa2));
      const listaAnimais = this.parseAnimais(ordemAnimais);

      let resultado = [];

      for (let nome of listaAnimais) {
        const animal = this.animais[nome];
        let dono = 'abrigo';

        if (nome === 'Loco') {
          const candidatos = [pessoa1, pessoa2].filter(p => p.adotados.length > 0 && p.adotados.length < 3);
          if (candidatos.length > 0) {
            candidatos.sort((a, b) => a.adotados.length - b.adotados.length);
            candidatos[0].adotar(animal);
            dono = `pessoa ${candidatos[0].numero}`;
          }
        } else {
          const pode1 = pessoa1.podeAdotar(animal);
          const pode2 = pessoa2.podeAdotar(animal);

          const adotavel1 = pode1 && pessoa1.adotados.length < 3;
          const adotavel2 = pode2 && pessoa2.adotados.length < 3;

          if (adotavel1 && !adotavel2) {
            pessoa1.adotar(animal);
            dono = 'pessoa 1';
          } else if (adotavel2 && !adotavel1) {
            pessoa2.adotar(animal);
            dono = 'pessoa 2';
          } else {
            dono = 'abrigo';
          }
        }

        resultado.push(`${nome} - ${dono}`);
      }

      resultado.sort((a, b) => a.localeCompare(b));
      return { lista: resultado };
    } catch (error) {
      return { erro: error.message };
    }
  }

  parseBrinquedos(str) {
    const arr = str.split(',').map(s => s.trim());
    const set = new Set();
    for (let b of arr) {
      if (!this.todosBrinquedos.has(b)) throw new Error('Brinquedo inválido');
      if (set.has(b)) throw new Error('Brinquedo inválido');
      set.add(b);
    }
    return arr;
  }

  parseAnimais(str) {
    const arr = str.split(',').map(s => s.trim());
    const set = new Set();
    for (let a of arr) {
      if (!this.animais[a]) throw new Error('Animal inválido');
      if (set.has(a)) throw new Error('Animal inválido');
      set.add(a);
    }
    return arr;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
