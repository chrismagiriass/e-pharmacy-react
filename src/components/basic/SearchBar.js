import { Nav } from 'react-bootstrap';
import React, { Component } from 'react';
import MultiSelect from "react-multi-select-component";



export default class SearchBar extends Component {


    render() {
        const options = [
            { label: "Grapes 🍇", value: "grapes" },
            { label: "Mango 🥭", value: "mango" },
            { label: "Strawberry 🍓", value: "strawberry", disabled: true },
        ];
        return (
            <>



                <div class="card" id="filters">
                    <div class="card-header">Filters</div>
                    <div class="card-body">
                        <div class="col-md-12">
                            <input class="custom-range" type="range" id="price" min="50" max="3000" value="3000" />
                            <label for="price">Price: <span id="selected_price">3000</span></label>
                        </div>
                        <div class="mb-12 col-md-12">
                            <MultiSelect
                                options={options}
                                // value={selected}
                                // onChange={setSelected}
                                labelledBy={"Select"}
                            />
                        </div>
                        <div class="mb-3 col-md-12">
                            <select id="hotelStars" class="browser-default custom-select">
                                <option value="" selected>Select property type </option>
                                <option value="1">One star</option>
                                <option value="2">Two stars</option>
                                <option value="3">Three stars</option>
                                <option value="4">Four stars</option>
                                <option value="5">Five stars</option>
                            </select>
                        </div>
                        <div class="mb-3 col-md-12">
                            <select id="customerRating" class="browser-default custom-select">
                                <option value="" selected>Select by customer rating</option>
                                <option value="3">1 to 3</option>
                                <option value="5">3 to 5</option>
                                <option value="7">5 to 7</option>
                                <option value="10">7 to 10</option>
                            </select>
                        </div>


                    </div>
                </div>

            </>
        );
    }
}