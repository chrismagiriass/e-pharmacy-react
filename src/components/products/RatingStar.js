import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default class SimpleRating extends Component {

    render() {
        return (
            <div>
                {/* <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Controlled</Typography>
                    <Rating
                        name="simple-controlled"
                        value={this.props.value}
                    // onChange={(event, newValue) => {
                    //     setValue(newValue);
                    // }}
                    />
                </Box> */}
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Ratings</Typography>
                    <Rating name="read-only" value={this.props.value} readOnly />
                </Box>
            </div >
        );
    }
}