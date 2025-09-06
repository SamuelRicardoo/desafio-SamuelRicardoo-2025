import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });
});

describe('Abrigo de Animais - Casos Adicionais', () => {

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLINHA', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Loco não é adotado sem companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', 'SKATE,RATO', 'Loco');
    expect(resultado.lista).toEqual(['Loco - abrigo']);
  });

  test('Loco é adotado quando há companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'SKATE,RATO', 'Rex,Loco');

    const locoAdotado = resultado.lista.find(l => l.startsWith('Loco'));
    expect(['Loco - pessoa 1', 'Loco - pessoa 2']).toContain(locoAdotado);
  });

  test('Pessoa não pode adotar mais de 3 animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO',
      'RATO,BOLA,LASER,CAIXA,NOVELO',
      'Rex,Bola,Bebe,Mimi,Fofo'
    );

    const adotados1 = resultado.lista.filter(l => l.includes('pessoa 1'));
    const adotados2 = resultado.lista.filter(l => l.includes('pessoa 2'));

    expect(adotados1.length).toBeLessThanOrEqual(3);
    expect(adotados2.length).toBeLessThanOrEqual(3);
  });

  test('Empate entre pessoas deixa animal no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista).toEqual(['Rex - abrigo']);
  });

  test('Brinquedos duplicados são rejeitados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Animais duplicados na lista são rejeitados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
  });

});
