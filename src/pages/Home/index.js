import React, { Component } from 'react'
import { IconContext } from 'react-icons';
import { GiBleedingEye } from 'react-icons/gi';
import { BsFillBagFill } from "react-icons/bs";
import { AiOutlineRead } from 'react-icons/ai';

import api from '../../services/api';
import { 
    Container, 
    ProfileContainer,
    ImgContainer,
    TxtContainer,
    BtnContainer,
    LearnMacrame,
    LearnTxtContainer,
    IconsContainer,
    GetSTartedTxtContainer,
    Border,
    GetStarted,
    SmallTips
} from './styles';
import profile from '../../assets/japa.jpg';
import beginner from '../../assets/macrame-beginner.jpeg';
import wall from '../../assets/macrame-wall.jpeg';
import hanger from '../../assets/macrame-hanger.jpeg';
import cords from '../../assets/macrame-cords.jpeg';
import Footer from '../../components/Footer'

class Home extends Component {
    state = {
        text: []
    };
    componentDidMount() {
        const response = api.get('homePage');

        this.setState({ text: response.data })
    }
    render() {
        const { text } = this.state;

        return (
        <>
        <Container>
            {text.map(txt => (
            <li key={txt.id}>
            <ProfileContainer>
                
                <ImgContainer>
                    <img src={profile} alt="Profile" />
                </ImgContainer>

                <TxtContainer>
                    <h2>Hi, I'm {txt.name}</h2>
                    <p>{txt.profile}</p>
                    <BtnContainer>
                        <button type="button">Macrame Tips</button>
                        <button type= "button">Uplevel Your Hobby</button>
                    </BtnContainer>
                </TxtContainer>
            </ProfileContainer>

            <LearnMacrame>
                <LearnTxtContainer>
                  <h2>{txt.question}</h2>
                  <h3>{txt.question2}</h3>
                  <h3>{txt.paragraph}</h3>
                </LearnTxtContainer>
                <IconContext.Provider value={{ color: "#474547", size: "5.5rem" }}>
                <IconsContainer>
                    <div>
                    <button type="button">Watch Video Tutorials</button>
                    <GiBleedingEye />
                    </div>
                    <div>
                    <button type="button">Shop Supplies</button>
                    <BsFillBagFill />
                    </div>
                    <div>
                    <button type="button">Read The Blog</button>
                    <AiOutlineRead />
                    </div>
                </IconsContainer>
                </IconContext.Provider>
            </LearnMacrame>

                <GetSTartedTxtContainer>
                    <h2>{txt.getstarted}</h2>
                    <h3>{txt.smalltip}</h3>
                </GetSTartedTxtContainer>
                <Border />
                <GetStarted>
                    <SmallTips>
                        <h3>{txt.tiptopic}</h3>
                        <img src={beginner} alt="Beginner"/>
                        <p>{txt.tiptext}</p>
                        <button type="button">Read More</button>
                    </SmallTips>

                    <SmallTips>
                        <h3>{txt.tiptopic}</h3>
                        <img src={wall} alt ="Beginner" />
                        <p>{txt.tiptext}</p>
                        <button type="button">Read More</button>
                    </SmallTips>

                    <SmallTips>
                        <h3>{txt.tiptopic}</h3>
                        <img src={hanger} alt="Beginner"/>
                        <p>{txt.tiptext}</p>
                        <button type="button">Read More</button>
                    </SmallTips>

                    <SmallTips>
                        <h3>{txt.tiptopic}</h3>
                        <img src={cords} alt="Beginner"/>
                        <p>{txt.tiptext}</p>
                        <button type="button">Read More</button>
                    </SmallTips>
                </GetStarted>
                </li>
                ))}
        </Container>  
            <Footer />
            </>
        )
    }
}

export default Home ; 
