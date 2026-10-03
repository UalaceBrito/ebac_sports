import cartReducer, { addToCart, toggleFavorite } from './cartSlice'
import type { Produto } from '../../types'

const produto: Produto = {
  id: 1,
  nome: 'Camisa',
  preco: 99.9,
  imagem: '/camisa.png'
}

describe('cartSlice', () => {
  it('adiciona o produto ao carrinho sem duplicá-lo', () => {
    const once = cartReducer(undefined, addToCart(produto))
    const twice = cartReducer(once, addToCart(produto))

    expect(twice.items).toEqual([produto])
  })

  it('adiciona e remove o produto dos favoritos', () => {
    const added = cartReducer(undefined, toggleFavorite(produto))
    const removed = cartReducer(added, toggleFavorite(produto))

    expect(added.favorites).toEqual([produto])
    expect(removed.favorites).toEqual([])
  })
})
