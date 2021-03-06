import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase.js';
import PrepOrders from '../../Components/PrepOrders';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';


const styleContent = {
    display:'flex', 
    flexDirection:'column', 
    justifyContent:'space-between',
    height:'100vh'
}

const Prep = () => {

    const [ordersToPrep, setOrdersToPrep] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection('Orders')
            .orderBy('timeOfOrder', 'asc')
            .onSnapshot((snapshot) => {
                let itensOrders = [];
                snapshot.docs.forEach(item => itensOrders.push({...item.data(), id:item.id}))
                const orderlist = itensOrders.filter(item => item.status !== 'Pronto' && item.status !== 'Finalizado')
                setOrdersToPrep(orderlist);
            })
    }, [])
    
    return(
        <>
        <Header />
        <div style={styleContent}>
        {(ordersToPrep.length > 0)
            ? <PrepOrders ordersToPrep={ordersToPrep} />
            : 'Não há pedidos para preparação...'}
        <Footer />
        </div>
        </>
    )
}

export default Prep;
