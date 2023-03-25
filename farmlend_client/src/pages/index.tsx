import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Layout.module.css'
import { useState } from 'react';
import { Typography } from '@mui/material';
import OrdersTab from './ordersTab';
import OrganizationsTab from './organizationsTab';
import ProductsTab from './productsTab';


export default function Layout() {

  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <nav className={styles.navbar}>
            <ul>
              <li onClick={() => setSelectedTab(0)}>Products</li>
              <li onClick={() => setSelectedTab(1)}>Orders</li>
              <li onClick={() => setSelectedTab(2)}>Organizations</li>
              <li>Farmlend</li>
            </ul>
          </nav>
          <div className={styles.wrapper}>
            <Typography variant="h4" className={styles.title}>
              Farmlend Admin Portal
            </Typography>
            <div className={styles.center}>
              {selectedTab === 0 && <ProductsTab />}
              {selectedTab === 1 && <OrdersTab />}
              {selectedTab === 2 && <OrganizationsTab />}
            </div>
            {/* <Home></Home> */}
          </div>  
        </div>
      </main>
    </>
  )
}