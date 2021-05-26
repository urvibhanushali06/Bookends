import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
// import {Link} from 'react-router-dom'
import axios from 'axios'


function loadscript(src){
    return new Promise((resolve) =>{
    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
    script.onload = () =>{ 
        resolve(true)
    }
    script.onerror = () =>{
        resolve(false)
    }
    document.body.appendChild(script)
    })
}

const __DEV__ = document.domain === 'localhost'


function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const[total, setTotal] = useState(0)
    
    async function displayRazorpay(){

        const res = await loadscript ('https://checkout.razorpay.com/v1/checkout.js')

        if(!res){
            alert('Razorpay sdk failed to load. Are you online')
        }

        const data = await fetch('http://localhost:3000/razorpay',{
            method:'POST'
        }).then((t) =>
        t.json())

        console.log(data)
        const options = {
            key: __DEV__ ? process.env.RAZORPAY_KEY_ID : 'API_NOT_AVAILABLE',
            currency: data.currency,
            amount :data.amount.toString(),
            order_id:data.id,
            name: "PAYMENT",
            description: "Test Transaction",
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": {
                "name": "Gaurav Kumar"
            }
        };
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        
    }
    useEffect(() =>{
                const getTotal = () =>{
                    const total = cart.reduce((prev, item) => {
                        return prev + (item.price )
                    },0)
                    setTotal(total)
                }
                getTotal(total) 

            },[cart])

            const addToCart = async (cart) =>{
                        await axios.patch('/user/addcart', {cart}, {
                            headers: {Authorization: token}
                        })
                    }
                
                

            const removeProduct = id =>{
                        if(window.confirm("Do you want to delete this product?")){
                            cart.forEach((item, index) => {
                                if(item._id === id){
                                    cart.splice(index, 1)
                                }
                            })
                
                            setCart([...cart])
                            addToCart(cart)
                        }
                    }
                
        

    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return(
                <div>
                    {
                        cart.map(product => (
                            <div className="detail cart" key={product._id}>
                                <img src={product.images.url} alt="" />
        
                                <div className="box-detail">
                                    <h2>{product.title}</h2>
        
                                    <h3>$ {product.price }</h3>
                                    <p>{product.description}</p>
                                    <p>{product.content}</p>
        
                                    
                                    <div className="delete"
                                      onClick={()=> removeProduct(product._id)}>
                                        X
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="total">
                 <h3>Total: $ {total}</h3>
                 <button type="button" className="button" onClick={displayRazorpay}>Pay</button> 
         </div>
        </div>
        
    )


}

 export default Cart
