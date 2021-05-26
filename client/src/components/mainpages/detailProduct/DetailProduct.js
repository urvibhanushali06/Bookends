import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'


 function DetailProduct() {
    const params= useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])
    
    if(detailProduct.length === 0) return null;
    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                
                    </div>
                    
                    <p><strong> Description: </strong>{detailProduct.description}</p>
                    <p><strong>Author: </strong>{detailProduct.author}</p>
                    <p><strong>Category:</strong> {detailProduct.category}</p>
                    <p><strong>Language: </strong>{detailProduct.language}</p>
                    <p><strong>Publication :</strong>{detailProduct.publication}</p>
                    <p><strong>ISBN: </strong>{detailProduct.ISBN}</p>
                    
                    <Link to="/cart" className="cart">
                   
                        Buy Now
                    </Link>
                </div>
            </div>

            <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category 
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct