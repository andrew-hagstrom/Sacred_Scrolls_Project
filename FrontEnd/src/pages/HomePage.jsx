import SacredScrollsLogo from '../Images/SacredScrollsBlackBackground.png'
import {Link} from "react-router-dom"
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function HomePage() {
    return (
        <>
        <h2>
            HomePage
        </h2>
        <IntroCarousel />
        {/* Image temporary until styled */}
        {/* <img style={{width:'400px', height:'250px'}} src={SacredScrollsLogo}/> */}
        <div className='home-text'>
            Embrace the richness of diverse cultures, explore the depths of spirituality, and delve into the profound wisdom encapsulated 
            in three of the {"world's"} most revered religious texts - the Bible, Quran, and Bhagavad Gita.   
        </div>
        <div className='home-text'>
            {"Sacred Scrolls is not just a website; it's a journey into the heart of sacred knowledge. We understand that approaching ancient texts can be a formidable task, and that's why we've created a user-friendly interface to help you navigate the intricate tapestry of the Bible, Quran, and Bhagavad Gita effortlessly."}
        </div>
        <div className='home-text'>
            {"Embark on your exploration by navigating seamlessly through the sacred texts. Use our intuitive search feature to find passages that resonate with your interests or study themes across multiple scriptures. Uncover hidden gems of wisdom that transcend cultural and religious boundaries."}
        </div>
        <div className='home-text'>
            {"Sacred Scrolls empowers you to read these timeless texts side by side, providing a unique opportunity for comparative study. Witness the interconnectedness of different faiths and deepen your understanding of the common threads that bind humanity together."}
        </div>
        <div className='home-text'>
            {"Sacred Scrolls invites persons of faith, students of culture, and those seeking spiritual enlightenment to embark on a transformative experience. Embrace the diversity of sacred wisdom and unlock the profound insights that lie within the pages of the Bible, Quran, and Bhagavad Gita."}
            {"Start your exploration now and let the Sacred Scrolls be your guide to a deeper understanding of the spiritual tapestry that unites us all. Welcome to a world where knowledge transcends borders and wisdom knows no limits."}
        </div>
        <div className='home-text'>
            Begin Your Journey ⟶ <Link to={'/register/'}>Get Started</Link>
        </div>
        </>
    )
}

export default HomePage