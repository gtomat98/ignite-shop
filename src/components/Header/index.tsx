import {
  Amount,
  CloseButton,
  Content,
  HeaderContainer,
  ImageContainer,
  Item,
  ItemsContainer,
  Overlay,
  ProductDetails,
  Total,
} from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import Image from 'next/image'
import { Handbag, X } from 'phosphor-react'
import { ShoppingContext } from '@/src/contexts/ShoppingContext'
import { useContext, useState } from 'react'
import axios from 'axios'

export default function Header() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const { products, removeProductFromBag } = useContext(ShoppingContext)

  const total = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(products.reduce((acc, item) => acc + item.price, 0))

  function handleRemoveProductFromBag(productToRemove: any) {
    removeProductFromBag(productToRemove)
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        products,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      // Conectar com uma ferramente de observabilidade (Datadog / Semtry)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />
      {products.length > 0 && (
        <Dialog.Root>
          <Dialog.Trigger asChild style={{ cursor: 'pointer' }}>
            <button type="button">
              <Handbag size={24} weight="bold" />
              <div>
                <span>{products.length}</span>
              </div>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Overlay />

            <Content>
              <div>
                <header>
                  <CloseButton asChild>
                    <button type="button">
                      <X size={24} />
                    </button>
                  </CloseButton>
                  <Dialog.Title>Sacola de compras</Dialog.Title>
                </header>
                <ItemsContainer>
                  {products.map((product) => {
                    return (
                      <Item key={product.id}>
                        <ImageContainer>
                          <Image
                            src={product.imageUrl}
                            alt=""
                            width={100}
                            height={100}
                          />
                        </ImageContainer>
                        <ProductDetails>
                          <h3>{product.name}</h3>
                          <span>{product.price}</span>
                          <button
                            onClick={() => {
                              handleRemoveProductFromBag(product)
                            }}
                          >
                            Remover
                          </button>
                        </ProductDetails>
                      </Item>
                    )
                  })}
                </ItemsContainer>
              </div>

              <footer>
                <Amount>
                  <span>Quantidade</span>
                  <span>{products.length} items</span>
                </Amount>
                <Total>
                  <strong>Valor total</strong>
                  <strong>{total}</strong>
                </Total>
                <button
                  disabled={isCreatingCheckoutSession}
                  onClick={handleBuyProduct}
                >
                  Finalizar compra
                </button>
              </footer>
            </Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </HeaderContainer>
  )
}
