
import BioCard from "../components/BioCard"

import BryanHeadshot from '../Images/bryan-headshot.png';

import AndrewsPhoto from '../Images/AndrewsPhoto.png';
import JoshsPhoto from "../Images/JoshsPhoto.png"
// import JoshsPhoto from '../Images'
function AboutPage() {

    const developers = [
        {
          imageSrc: BryanHeadshot,
          name: 'Bryan Bartell',
          description: "I'm a full-stack software engineer with a passion for creating meaningful educational software. I find immense joy in bridging the worlds of technology and spirituality, which is why I'm thrilled to be part of this project that brings together sacred texts like the Quran, the Bible, and the Bhagavad Gita. It's an opportunity to facilitate open discussions and connections among people who seek to explore these profound texts.\n\ When I'm not immersed in web development, I love to longboard by the Houston Bayou, play boardgames with my family, make delicious vegitarian food, and write music. If you ever want to jam, collaborate on a software project, or simply go for a skate, feel free to shoot me an email.",
          email: 'bryan.t.bartell@gmail.com',
          githubLink: "https://github.com/BDubOne",
          linkedinLink: "https://www.linkedin.com/in/bryan-bartell-1657b646/"
        },
        {
          imageSrc: AndrewsPhoto,
          name: 'Andrew Hagstrom',
          description: 'Andrew is a full-stack software engineer and Marine Corps Reserve Officer who holds Master of Arts degrees in Greek and Latin and New Testament and has a reading knoweldge of Hebrew and Coptic. In graduate school, his particular area of interest was the intersection of early Christian and Greco-Roman pagan practice and belief. This pursuit led to a broader interest in comparative mythology and religion viz-a-viz the archetypes of Carl Jung or monomyth of Joseph Campbell that unite human imaginations across cultures. He has a passion for ancient languages and texts and for making them accessible to a wider audience through the power of technology. Hence the inspiration for the Sacred Scrolls application, which brings together in one place three of the most revered religious texts in the world (the Bible, Quran, and Bhagavad Gita) and allows the user to dynamically engage with them for comparative study and reflection. On the more active side, Andrew enjoys hiking, skateboarding, blues dancing, and playing guitar.',
          email: 'andrew.hagstrom1@gmail.com',
          githubLink:'https://github.com/andrew-hagstrom',
          linkedinLink: 'https://www.linkedin.com/in/andrew-hagstrom1/'
        },
        {
          imageSrc:JoshsPhoto,
          name:'Joshua Minchew',
          description:"Hey, I'm Joshua, a full-stack software engineer. Three years back, I jumped into coding and completed my first program - a text RPG game using Python. That got me hooked on the idea of bringing my ideas to life through code and I havent stopped coding since. Fast forward to 2024, I decided to work on Sacred Scrolls because I knew it would be a challenge for me and also because I have a passion for studying Christianity and Islam. When I'm not doing software engineering you'll probably find me reading or doing game development. Thanks for visiting Sacred Scrolls, I hope you enjoy using it as much as we enjoyed making it!",
          email:"jminchew97@gmail.com",
          githubLink:"https://github.com/jminchew97",
          linkedinLink:"https://www.linkedin.com/in/joshuaminchew/",
        }

        // Add information for other developers here
      ];
    
      return (
        <>
          <h2>About Us</h2>
          {developers.map((developer, index) => (
            <BioCard
              key={index}
              imageSrc={developer.imageSrc}
              name={developer.name}
              description={developer.description}
              email={developer.email}
              githubLink={developer.githubLink}
              linkedinLink={developer.linkedinLink}
            />
          ))}
        </>
      );
    };

export default AboutPage