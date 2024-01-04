
import BioCard from "../components/BioCard"

import BryanHeadshot from '../Images/bryan-headshot.jpg';

function AboutPage() {

    const developers = [
        {
          imageSrc: BryanHeadshot,
          name: 'Bryan Bartell',
          description: "I'm a full-stack software engineer with a passion for creating meaningful educational software. I find immense joy in bridging the worlds of technology and spirituality, which is why I'm thrilled to be part of this project that brings together sacred texts like the Quran, the Bible, and the Bhagavad Gita. It's an opportunity to facilitate open discussions and connections among people who seek to explore these profound texts.\n\ When I'm not immersed in web development, I love to longboard by the Houston Bayou, play boardgames with my family, make delicious vegitarian food, and write music. If you ever want to jam, collaborate on a software project, or simply go for a skate, feel free to shoot me an email.",
          email: 'bryan.t.bartell@gmail.com',
        },
        {
          imageSrc: 'image2.jpg',
          name: 'Developer 2',
          description: 'Description of Developer 2.',
          email: 'developer2@example.com',
        },
        // Add information for other developers here
      ];
    
      return (
        <>
          <h2>About Page</h2>
          {developers.map((developer, index) => (
            <BioCard
              key={index}
              imageSrc={developer.imageSrc}
              name={developer.name}
              description={developer.description}
              email={developer.email}
            />
          ))}
        </>
      );
    };

export default AboutPage