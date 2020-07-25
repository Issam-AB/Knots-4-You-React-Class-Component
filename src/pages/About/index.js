import React, { Component } from 'react'

import {
    Container,
    MacrameHistory
} from './styles';
import macrame from '../../assets/History/macrame-history.jpg';
import macrame2 from '../../assets/History/macrame-history2.jpg';
import api from '../../services/api';
import Footer from '../../components/Footer';

class About extends Component {
    state = {
        text: []
    };
    async componentDidMount(){
        const response = await api.get('history');

        this.setState({ text: response.data });
    };

    render() {
        const { text } = this.sta
        return (
            <>
            <Container>
                <MacrameHistory>
                    {text.map(txt => (
                        <li key={txt.id}>
                           <h2>{txt.header}</h2>
                           <p>{txt.firsttext}</p>
                           <p>{txt.secondtext}</p>
                           <img src={macrame} alt ="Macram.jpg" />
                           <p>{txt.thirdtext}</p>
                           <img src={macrame2} alt="Macrame.jpg"/>
                           <p>{txt.fourthtext}</p>
                           <small>Reference: {txt.ref}</small>
                           <small>Reference: {txt.reftwo}</small>
                        </li>
                    ))}
                </MacrameHistory>
            </Container>
            <Footer />
            </>
        )
    }
}
export default About;