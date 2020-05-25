import React, { Component } from 'react';
import "./products.css";
import ProductService from '../../services/productService';
import ReviewService from '../../services/reviewService';
import RatingStar from './RatingStar';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


class ProductPage extends Component {



    constructor(props) {
        super(props)
        this.state = {
            product: {},
            cart: [],
            review: {
                comment: '',
                rating: 0,
                username: 'null'
            },
            reviews: [],
            canPostReview: false,

        }
    }



    componentDidMount() {

        let user = localStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
            this.setState({
                review: {
                    ...this.state.review,
                    username: user.username
                },
                canPostReview: true
            })
        }
        this.getReviews(user ? user.username : null)


        ProductService.getById(
            this.props.match.params.productId
        ).then(result => {
            this.setState({
                product: result
            });
        }
        ).catch(error =>
            console.error("Error from product", error)
        )
    }

    getReviews = (username) => {
        ReviewService.getByProduct(this.props.match.params.productId)
            .then(result => {
                let canpostRev = username ? true : false;
                result.map(item => {
                    if (item.username === username) {
                        canpostRev = false;
                    }
                })
                this.setState({
                    reviews: result,
                    canPostReview: canpostRev
                });
            })
            .catch(err => { console.error("Error from product", err) })
    }

    addToCard = (product) => {
        let cartItems = [];
        let cart = localStorage.getItem("cart");
        if (cart) {
            cartItems = JSON.parse(cart);
        }
        let productExists = cartItems.filter(item => item.productId === product.productId);
        product.quantity = 1;
        if (productExists.length > 0) {
            productExists[0].quantity++;
        } else {
            cartItems.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cartItems))
    }

    postReview = (event) => {
        event.preventDefault();
        ProductService.postReview(this.state.review, this.state.product.productId)
            .then(console.log("review posted"))
            .catch(error =>
                console.error("Error from product", error)
            )
        this.getReviews(this.state.review.username);
    }


    render() {

        let saleBadge = this.state.product.discount ? <span className="notify-badge badge-big">-{this.state.product.discount}%</span> : '';
        let startPrice = this.state.product.discount ? <span className="product-price-discount">  {this.state.product.price}€</span> : '';
        let prescripted = this.state.product.prescripted ? <p><em>Prescription required</em></p> : '';
        let stock = this.state.product.stock ? <span className="badge badge-success">  {"In stock"}</span> : <span className="badge badge-danger">  {"Out of stock "}</span>;

        return (


            <div className="container" id="product-section">
                <div className="row">
                    <div className="col-md-6">
                        {saleBadge}
                        <img style={{ 'max-width': '512px' }}
                            src={this.state.product.image}
                            alt={this.state.product.name}
                            className="image-responsive"
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>{this.state.product.name} </h3>
                                {stock}
                                <p>Product number: {this.state.product.productId}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                               
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <h5>Description</h5>
                                <p className="description">
                                    {this.state.product.description}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <span className="product-price">Price: </span>    {startPrice}
                                <span className="product-price">  {this.state.product.finalPrice}€</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button  disabled= {!this.state.product.stock} style={{ 'margin-top': '20px' }} className="btn btn-submit" onClick={() => this.props.addToCart(this.state.product)}>Add to cart</button> {prescripted}
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="row" >

                    <div className="col-md-6 offset-md-3 pb-2">
                        <h4>Reviews <RatingStar  value={3} /></h4>
                        {this.state.reviews.map(review => {
                            return <div className="col-md-12 pb-2">
                                <div className="card card-inner">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" />
                                            </div>
                                            <div className="col-md-10">
                                                <p><strong>{review.username}</strong> <RatingStar value={review.rating} /></p>
                                                <p>{review.comment}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

                <div className="row" >
                    <div className="col-md-6 offset-md-3">
                        {this.state.canPostReview ? <div className="well well-sm">
                            <div className="row" id="post-review-box">
                                <div className="col-md-12">
                                    <form accept-charset="UTF-8" onSubmit={this.postReview}>
                                        <div className="col-md-12">
                                            <Box component="fieldset" mb={3} borderColor="transparent">
                                                <Typography component="legend">Post review</Typography>
                                                <Rating
                                                    name="rating"
                                                    value={this.state.review.rating}
                                                    onChange={(event, newValue) => {
                                                        this.setState({
                                                            review: {
                                                                ...this.state.review,
                                                                rating: newValue
                                                            }
                                                        })
                                                    }}
                                                />
                                            </Box>
                                        </div>
                                        <textarea className="form-control animated" cols="50" id="new-review"
                                            name="comment"
                                            placeholder="Enter your review here..." rows="5"
                                            value={this.state.review.comment}
                                            onChange={(event) => {
                                                this.setState({
                                                    review: {
                                                        ...this.state.review,
                                                        comment: event.target.value
                                                    }
                                                })
                                            }}
                                        >

                                        </textarea>

                                        <div className="col-md-12 my-2 text-right">
                                            <button className="btn btn-outline-secondary btn-md" type="submit">Post</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> : ''}
                    </div>
                </div>
            </div>


        );
    }
}

export default ProductPage;