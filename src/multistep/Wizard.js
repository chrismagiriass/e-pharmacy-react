<<<<<<< HEAD
import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

export default class Wizard extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }
    static Page = ({ children }) => children
=======
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

class Wizard extends Component {
>>>>>>> 200c8dd18bad2ab35ce9d8118a81714f9df8a226

    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            values: props.initialValues || {}
        }
<<<<<<< HEAD
    }
=======
        this.next.bind(this);
        this.previous.bind(this);
        this.validate.bind(this);
        this.handleSubmit.bind(this);
    }

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }
    static Page = ({ children }) => children


>>>>>>> 200c8dd18bad2ab35ce9d8118a81714f9df8a226
    next = values =>
        this.setState(state => ({
            page: Math.min(state.page + 1, this.props.children.length - 1),
            values
        }))

    previous = () =>
        this.setState(state => ({
            page: Math.max(state.page - 1, 0)
        }))

    /**
     * NOTE: Both validate and handleSubmit switching are implemented
     * here because 🏁 Redux Final Form does not accept changes to those
     * functions once the form has been defined.
     */

    validate = values => {
        const activePage = React.Children.toArray(this.props.children)[
            this.state.page
        ]
        return activePage.props.validate ? activePage.props.validate(values) : {}
    }

    handleSubmit = values => {
        const { children, onSubmit } = this.props
        const { page } = this.state
        const isLastPage = page === React.Children.count(children) - 1
        if (isLastPage) {
            return onSubmit(values)
        } else {
            this.next(values)
        }
    }

    render() {
        const { children } = this.props
        const { page, values } = this.state
        const activePage = React.Children.toArray(children)[page]
        const isLastPage = page === React.Children.count(children) - 1
        return (
            <Form
                initialValues={values}
                validate={this.validate}
                onSubmit={this.handleSubmit}
            >
                {({ handleSubmit, submitting, values }) => (
                    <form onSubmit={handleSubmit}>
                        {activePage}
                        <div className="buttons">
                            {page > 0 && (
                                <button className="btn-sm" type="button" onClick={this.previous}>
                                    « Previous
                                </button>
                            )}
                            {!isLastPage && <button className="btn-sm" type="submit">Next »</button>}
                            {isLastPage && (
                                <button className="btn-sm" type="submit" disabled={submitting}>
                                    Submit
                                </button>
                            )}
                        </div>

                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </form>
                )}
            </Form>
        )
    }
}
<<<<<<< HEAD
=======
export default Wizard;
>>>>>>> 200c8dd18bad2ab35ce9d8118a81714f9df8a226
