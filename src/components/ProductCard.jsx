import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
    return (
        <>
            <Card className='my-3 p-3 rounded'>
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} className='h-[200px]' variant='top'/>
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as='div' className='product-title'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as='h3'>${product.price}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}
export default ProductCard;