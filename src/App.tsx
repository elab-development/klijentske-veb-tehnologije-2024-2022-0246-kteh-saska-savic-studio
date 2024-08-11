import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from './pages/Layout'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Cart from './pages/Cart'
import ProductsPage from './pages/ProductsPage'
import { useEffect, useState } from 'react'
import { User } from './models/userModel'
import { Product } from './models/productModel'
import Login from './pages/Login'
//import {useFetch} from './hooks/useFetch'

function App() {
  // promenljive odozdo
  const [user, setUser] = useState<User | Record<string, never>>({firstName: "Site", lastName: "User"})

  //const [cartNum, setCartNum] = useState(0);
  //const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
      //treba proveriti sesiju na serveru - OVDE KAO DA JE DOBIJEN KORISNIK
      setUser({firstName: "Site", lastName: "User"})
  }, [])

  //try {
  useEffect(() => {
      //const {data} = useFetch('http://localhost:5173/data/products.json')
      const fetchData = async () => {
        const response = await fetch('/data/products.json')
        const data = await response.json()
        console.log('data: ', data)
        setProducts(data.products.map((el: unknown) => {
          const elem = el as Product
          return new Product(elem.productid, elem.name, elem.description, elem.price, elem.image, elem.category, elem.recommended)
      }))

      }
      fetchData()
  },[])
      

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<Layout user={user} />}>
        <Route index element={<Home products={products}/>} />
        <Route path="/products" element={<ProductsPage products={products}/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    ])
  )

  return (
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  )
}

export default App
