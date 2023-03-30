import React, {Component} from "react";
import Carousel from "react-bootstrap/Carousel";
import RemedyImg from "../../img/Remedy.jpeg";
import ShampooImg from "../../img/organicals-shampoo-moringa-1.jpg";
import SectionImg from "../../img/organicals-section-home.jpg"
import EcologigalImg from "../../img/organic-ecologigal.jpg";

class CarouselBox extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={RemedyImg}
                        alt="Remedy"
                    />
                    <Carousel.Caption>
                        {/*<h3>Remedy image</h3>
                        <p>Siandien skaniai pavalgiau</p>*/}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={ShampooImg}
                        alt="Shampoo"
                    />
                    <Carousel.Caption>
                        {/*<h3>Remedy image</h3>
                        <p>Labai skaunus steikas su darzovemis</p>*/}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={SectionImg}
                        alt="Section"
                    />
                    <Carousel.Caption>
                        {/*<h3>Remedy image</h3>
                        <p>Labai skaunus steikas su darzovemis</p>*/}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={EcologigalImg}
                        alt="Ecologigal"
                    />
                    <Carousel.Caption>
                        <h3>Remedy image</h3>
                        <p>Raudonas vynas labai tinka prie mesos</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default CarouselBox;