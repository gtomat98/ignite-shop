import { ShoppingContext } from '@/src/contexts/ShoppingContext'
import { stripe } from '@/src/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
  SkeletonButton,
  SkeletonDescription,
  SkeletonImageContainer,
  SkeletonPrice,
  SkeletonProductDetails,
  SkeletonTitle,
} from '@/src/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Stripe from 'stripe'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addProductToBag, products } = useContext(ShoppingContext)
  const [alreadyAdded, setAlreadyAdded] = useState<boolean>(false)

  useEffect(() => {
    setAlreadyAdded(
      products.filter((item) => item.id === product.id).length !== 0,
    )
  }, [products, product])

  function handleBuyProduct() {
    addProductToBag(product)
  }

  // async function handleBuyProduct() {
  //   try {
  //     setIsCreatingCheckoutSession(true)
  //     const response = await axios.post('/api/checkout', {
  //       priceId: product.defaultPriceId,
  //     })

  //     const { checkoutUrl } = response.data

  //     window.location.href = checkoutUrl
  //   } catch (err) {
  //     setIsCreatingCheckoutSession(false)
  //     // Conectar com uma ferramente de observabilidade (Datadog / Semtry)

  //     alert('Falha ao redirecionar ao checkout')
  //   }
  // }

  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <>
        <Head>
          <title>Item | Ignite Shop</title>
        </Head>
        <ProductContainer>
          <SkeletonImageContainer />
          <SkeletonProductDetails>
            <SkeletonTitle />
            <SkeletonPrice />
            <SkeletonDescription>
              <div></div>
              <div></div>
            </SkeletonDescription>
            <SkeletonButton />
          </SkeletonProductDetails>
        </ProductContainer>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(product.price)}
          </span>

          <p>{product.description}</p>

          <button disabled={alreadyAdded} onClick={handleBuyProduct}>
            {alreadyAdded ? 'Já adicionado a sacola' : 'Colocar na sacola'}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount! / 100,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
