import {Link, useOutletContext} from "react-router-dom"


function HomePage() {
    const {user} = useOutletContext()
    return (
        <>
        {/* Image temporary until styled */}
        <div id='welcome-header'>
            Embrace the richness of diverse <strong>cultures</strong>, explore the depths of <strong>spirituality</strong>, and delve into the profound <strong>wisdom</strong> encapsulated 
            in three of the {"world's"} most revered religious texts - the <strong>Bible, Quran, and Bhagavad Gita</strong>.   
        </div>

        <div id='home-text-container'>
        <div className='home-text'>
            <div className='home-text-headers'>
                Embark on a Journey
            </div>
            {"Sacred Scrolls is not just a website; it is a journey into the heart of sacred knowledge. We understand that approaching ancient texts can be a formidable task, and that is why we have created a user-friendly interface to help you effortlessly navigate the intricate pathways of ancient sacred texts."}
        </div>
        <div className='home-text'>
            <div className='home-text-headers'>
               Broaden your horizons
            </div>
            {"Embark on your exploration by navigating seamlessly through three texts sacred to Christians, Muslims, Jewish people, Hindus, and more - the Bible, Quran, and Bhagavad Gita. Use our intuitive search feature to find passages that resonate with your interests or study themes across multiple scriptures. Uncover hidden gems of wisdom that transcend cultural and religious boundaries."}
        </div>
        <div className='home-text'>
            <div className='home-text-headers'>
                Compare sacred texts side by side
            </div>
            {"Sacred Scrolls empowers you to read these timeless texts side by side in English and in their original language, providing a unique opportunity for comparative study. Witness the interconnectedness of different faiths and deepen your understanding of the common threads that bind humanity together."}
        </div>
        <div className='home-text'>
            <div className='home-text-headers'>
               Reflect and Ponder
            </div>
            {"Our journal and post features allow you not only to record your valuable observations and insights on the various passages that you will encounter in your use of Sacred Scrolls but also to engage with the impressions of other users of the application."}
        </div>
        <div style={{flexBasis:'100%', fontSize:'24px'}}>
            {"Sacred Scrolls invites persons of faith, students of religion, and those seeking spiritual enlightenment to embark on a transformative experience. Embrace the diversity of sacred wisdom, and unlock the profound insights that lie within the pages of the Bible, Quran, and Bhagavad Gita."}
            {" Start your exploration now, and let the Sacred Scrolls be your guide to a deeper understanding of the spiritual tapestry that unites us all."}
        { user ? 
            null
            :
            <div>
                Begin Your Journey ⟶ <Link to={'/register/'}>Get Started</Link>
            </div>
        }
        </div>
        </div>
        </>
    )
}

export default HomePage