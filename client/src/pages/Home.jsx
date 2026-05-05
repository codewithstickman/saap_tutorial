import React from 'react'
import "../assets/css/home.css"
import How from '../components/home/How'
import Header from '../components/home/Header'
function Home() {
    return (
        <div className="home">
            <Header />
            <How />
        </div>
    )
}

export default Home