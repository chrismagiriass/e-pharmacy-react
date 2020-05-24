import { Nav } from 'react-bootstrap';
import React, { Component } from 'react';
import MultiSelect from "react-multi-select-component";
import CategoryService from "../../services/categoryService";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { Form } from 'react-bootstrap';



export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategories: []
        }

    }


    changeCategory = (value) => {
        this.setState({
            selectedCategories: value
        })

    }



    componentDidMount() {
        this.getCategories()
    }


    search=()=>{
       let categoryIds = this.state.selectedCategories?this.state.selectedCategories.map(function (row) {
        return row.value  }):[];
        this.props.searchProducts(categoryIds)
    }

    getCategories = () => {
        CategoryService.get().then(result => {
            this.setState({
                categories: result
            });
        }
        ).catch(error =>
            this.setState({
                error: error.message,
                success: ''
            })
        )
    }
    render() {

        const options = this.state.categories.map(function (row) {
            return { value: row.categoryId, label: row.nameCategory }
        })
        return (
            <>



                <div class="card" id="filters">
                    <div class="card-header">Filters</div>
                    <div class="card-body">
                        <div class="mb-3 col-md-12">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Product name" name="productName"
                                    value={this.props.searchFilters.productName}
                                    onChange={this.props.changeHandler} />
                            </Form.Group>
                        </div>
                        <div class="mb-3 col-md-12">
                            <MultiSelect
                                options={options}
                                value={this.state.selectedCategories}
                                onChange={this.changeCategory}
                                labelledBy={"Select"}
                            />
                        </div>
                        <hr></hr>
                        <div class="mb-3 col-md-12">
                            <Form.Group controlId="stock">
                                <Form.Check type="checkbox" label="In stock"
                                    value={this.props.searchFilters.stock}
                                    name="stock" onChange={this.props.checkboxHandler} />
                            </Form.Group>
                        </div>
                        <div class="mb-3 col-md-12">
                            <Form.Group controlId="prescripted">
                                <Form.Check type="checkbox" label="Prescripted"
                                    value={this.props.searchFilters.prescripted}
                                    name="prescripted" onChange={this.props.checkboxHandler} />
                            </Form.Group>
                        </div>
                        <div class="mb-3 col-md-12">
                            <Form.Group controlId="discount">
                                <Form.Check type="checkbox" label="Offers"
                                    value={this.props.searchFilters.discount}
                                    name="discount" onChange={this.props.checkboxHandler} />
                            </Form.Group>
                        </div>

                        <hr></hr>

                        <div class="col-md-12">
                            <label>Price</label>
                            <RangeSlider
                                name="maxPrice"
                                value={this.props.searchFilters.maxPrice}
                                tooltip={"on"}
                                size={'lg'}
                                min={0}
                                max={200}
                                inputProps={{ name: 'maxPrice' }}
                                tooltipPlacement={"bottom"}
                                onChange={this.props.changeHandler}
                            />
                        </div>


                        <div class="col-md-12" style={{ 'margin-top': '30px' }}>
                            <button className="btn  btn-outline-primary " onClick={this.search}>Search</button>

                        </div>



                    </div>
                </div>

            </>
        );
    }
}