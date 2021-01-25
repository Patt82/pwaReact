import React from "react"
import { Link } from "react-router-dom"
import {Card, Button} from 'react-bootstrap';
import {Sale} from '../Services/SalesServices'; //clase 18 p1 25'
import NetContext from "../Context/NetContext";


function ProductComponents({product, seeDetail}){
    const handleClick = async (e)=>{
        e.preventDefault();
        let result = await Sale({
            "products":[product._id]
        })
        console.log(result)
        if(result["data"]["efectivo"]){
            window.open(result["data"]["mp"]["body"]["init_point"],'_blank');
        }
    }
    return(
        <NetContext.Consumer>
            {context=>(
                <Card style={{ width: '50rem', margin:"auto" }}>
                    <Card.Img variant="top" src={product.image_path} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            {product.price}
                        </Card.Text>
                        {
                            seeDetail &&
                            <Link to={"/products/" + product._id}><Button variant="primary">Details</Button></Link>
                        }
                        {context.login &&
                            <Button variant="primary" onClick={handleClick}>Buy</Button>
                        }
                    
                        
                    </Card.Body>
                </Card>
            )}
        </NetContext.Consumer>
    )    
}

export default ProductComponents;