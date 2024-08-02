import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import HeaderMain from './header'

import ProductMain from '../modules/products';
export default function MainLayout() {
    
    const [searchValue, setSearchValue] = useState('')
     const handleData = (data: any)=>{
        setSearchValue(data)
     }


    return (
        <div>
            <Layout style={{ minHeight: "100vh" }}>
                <Layout className="site-layout tourtopcomponent">
                    <Header className="site-layout-background" style={{ padding: 0, backgroundColor: "#fff" }}>
                        <HeaderMain onDataSend={handleData}/>
                    </Header>
                    <Content className="siteMainInner scroller" style={{ backgroundColor: "#fff" }}>
                        <Outlet />
                    </Content>
                    <ProductMain  searchData={searchValue}/>
                    
                </Layout>
            </Layout>
            
        </div>
    )
}
