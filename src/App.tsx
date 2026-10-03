import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { toggleFavorite } from './features/cart/cartSlice'
import { useGetProdutosQuery } from './services/produtosApi'
import type { RootState, AppDispatch } from './store'
import { GlobalStyle } from './styles'
import type { Produto } from './types'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const favoritos = useSelector((state: RootState) => state.cart.favorites)
  const { data: produtos = [], isLoading, isError } = useGetProdutosQuery()

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header />
        {isLoading && <p role="status">Carregando produtos...</p>}
        {isError && (
          <p role="alert">
            Não foi possível carregar os produtos. Tente novamente mais tarde.
          </p>
        )}
        {!isLoading && !isError && (
          <Produtos
            produtos={produtos}
            favoritos={favoritos}
            favoritar={(produto: Produto) => dispatch(toggleFavorite(produto))}
          />
        )}
      </div>
    </>
  )
}

export default App
