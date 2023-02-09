import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import {
  ImageContainer,
  ImagesContainer,
  SucessContainer,
} from '../styles/pages/sucess'

interface SucessProps {
  customerName: string
  products: {
    name: string
    imageUrl: string
  }[]
}

export default function Success({ customerName, products }: SucessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SucessContainer>
        <h1>Compra efetuada</h1>
        <ImagesContainer>
          <div>
            {products.map((product) => {
              return (
                <ImageContainer key={product.name}>
                  <Image
                    src={product.imageUrl}
                    width={120}
                    height={110}
                    alt=""
                  />
                </ImageContainer>
              )
            })}
          </div>
        </ImagesContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de
          <strong> {products.length} camisetas </strong>
          já está a caminho de sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SucessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id)

  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const products = session.line_items?.data

  return {
    props: {
      customerName,
      products: products?.map((product) => {
        const item = product.price?.product as Stripe.Product
        return {
          name: item.name,
          imageUrl: item.images[0],
        }
      }),
    },
  }
}
