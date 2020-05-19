import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
    return (
        <MDBFooter color="blue-grey" className="page-footer font-small lighten-5 pt-0">
            <div style={{ backgroundColor: '#507642' }}>
                <MDBContainer>
                    <MDBRow className="py-4 d-flex align-items-center">
                        <MDBCol md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
                            <h6 className="mb-0 white-text">
                                Get connected with us on social networks!
              </h6>
                        </MDBCol>
                        <MDBCol md="6" lg="7" className="text-center text-md-right">
                            <a className="fb-ic ml-0" href="https://www.facebook.com/">
                                <i className="fab fa-facebook-f white-text mr-lg-4"> </i>
                            </a>
                            <a className="tw-ic" href="https://twitter.com/explore">
                                <i className="fab fa-twitter white-text mr-lg-4"> </i>
                            </a>
                            <a className="li-ic" href="https://gr.linkedin.com/">
                                <i className="fab fa-linkedin-in white-text mr-lg-4"> </i>
                            </a>
                            <a className="ins-ic" href="https://www.instagram.com/">
                                <i className="fab fa-instagram white-text mr-lg-4"> </i>
                            </a>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
            <MDBContainer className="mt-5 mb-4 text-center text-md-left">
                <MDBRow className="mt-3">
                    <MDBCol md="3" lg="4" xl="3" className="mb-4 ">
                        <h6 className="text-uppercase font-weight-bold">
                            <strong>pharmacy4all</strong>
                        </h6>
                        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                        <p>
                            We're passionate about keeping you and your family feeling great. That's why pharmacy4all offers the smartest, easiest way to look after your health with the finest selection of health, skin and toiletry brands at everyday low prices.
            </p>
                    </MDBCol>
                    <MDBCol md="2" lg="2" xl="2" className="mb-4">
                        <h6 className="text-uppercase font-weight-bold">
                            <strong>Products</strong>
                        </h6>
                        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                        <p>
                            <a href="/products" >
                                Women
              </a>
                        </p>
                        <p>
                            <a href="#!" className="dark-grey-text">
                                Men
              </a>
                        </p>
                        <p>
                            <a href="#!" className="dark-grey-text">
                                Kid
              </a>
                        </p>
                        <p>
                            <a href="#!" className="dark-grey-text">
                                Pharmacy
              </a>
                        </p>
                    </MDBCol>
                    <MDBCol md="3" lg="2" xl="2" className="mb-4 dark-grey-text">
                        <h6 className="text-uppercase font-weight-bold">
                            <strong>Useful links</strong>
                        </h6>
                        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                        <p>
                            <a href="/profile" className="dark-grey-text">
                                Your Account
              </a>
                        </p>
                        <p>
                            <a href="#!" className="dark-grey-text">
                                Terms of use
              </a>
                        </p>
                        <p>
                            <a href="#!" className="dark-grey-text">
                                Shipping Rates
              </a>
                        </p>
                        <p>
                            <a href="#!" className="dark-grey-text">
                                Help
              </a>
                        </p>
                    </MDBCol>
                    <MDBCol md="4" lg="3" xl="3" className="mb-4 dark-grey-text">
                        <h6 className="text-uppercase font-weight-bold">
                            <strong>Contact</strong>
                        </h6>
                        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                        <p>
                            <i className="fa fa-home mr-3" /> Ioulianou 95-93, Athina 104 39, Greece
            </p>
                        <p>
                            <i className="fa fa-envelope mr-3" /> info@pharmacy4all.com
            </p>
                        <p>
                            <i className="fa fa-phone mr-3" /> + 30 210 1234567
            </p>
                        <p>
                            <i className="fa fa-print mr-3" /> + 30 210 1234569
            </p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer >
            <div className="footer-copyright text-center py-3" style={{ backgroundColor: '#507642' }} >
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright:{" "}
                    <a href="https://www.WebPages.com"> WebPages.com </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default Footer;