import React from 'react'
import Layout from '../layout'
import DashboardSection from '@/components/sections/dashboard'

const DashboardPage = () => {
    return (
        <Layout className="min-h-screen w-full relative text-white ">
            <DashboardSection />
        </Layout>
    )
}

export default DashboardPage