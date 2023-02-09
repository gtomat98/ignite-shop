import { createContext, ReactNode, useState } from 'react'

interface ProductProps {
  id: string
  name: string
  imageUrl: string
  price: number
  description: string
  defaultPriceId: string
}

interface ShoppingContextProps {
  children: ReactNode
}

interface ShoppingContextType {
  products: ProductProps[]

  addProductToBag: (product: ProductProps) => boolean
  removeProductFromBag: (productToRemove: ProductProps) => void
}

export const ShoppingContext = createContext({} as ShoppingContextType)

export function ShoppingContextProvider({ children }: ShoppingContextProps) {
  const [products, setProducts] = useState<ProductProps[]>([])

  console.log(products)

  function addProductToBag(productToAdd: ProductProps) {
    const same = products.filter((product) => product.id === productToAdd.id)
    console.log(same)
    if (same.length === 0) {
      setProducts((state) => [...state, productToAdd])
      return true
    }
    return false
  }

  function removeProductFromBag(productToRemove: ProductProps) {
    const same = products.filter((product) => product.id !== productToRemove.id)
    setProducts(same)
  }
  return (
    <ShoppingContext.Provider
      value={{
        addProductToBag,
        products,
        removeProductFromBag,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  )
}
