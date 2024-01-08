import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

function TextsPage() {
  
  return (
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>The Bible</Accordion.Header>
        <Accordion.Body>
        The Bible is a collection of religious texts or scriptures sacred to Christians, Jews, Samaritans, and others. It consists of two primary sections - the Old Testament or Hebrew Bible (39 books by Protestants' reckoning), and the New Testament (27 books) - that is 66 books in all. The Bible is further divided into chapters and verses, which are arbitrary units of meaning later assigned to the text. <br></br> <br></br> Originally composed in Hebrew and Aramaic, the Hebrew Bible has many authors and is the story of the Jewish people over tumultuous centuries from the 8th century BC into the 3rd century BC. The New Testament, originally composed in Greek, was written much later - between the first century AD and second century AD, and its central theme is the life and theology of Jesus of Nazareth and his followers. Like the Hebrew Bible, the New Testament has many authors. The oldest known fragment of the New Testament is a credit card-sized scrap of papyrus called P52, dating to the early second century AD. It is worth noting that the Bible we have today is a reconstructed version of copies of copies of manuscripts. <br></br><br></br>The Biblical texts (English, Greek, and Hebrew) used in the Sacred Scrolls app are drawn from the API.Bible API (https://scripture.api.bible/). A new English translation based on the best manuscrupts, the Berean Standard Bible, is the source for the English text. The Text-Critical Greek New Testament provides the Greek text for the New Testament, and the Westminster Leningrad Codex (the oldest complete manuscript of the Hebrew Bible in Hebrew) gives the ancient Hebrew text used in the Sacred Scrolls app.  
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>The Quran</Accordion.Header>
        <Accordion.Body>
        The Quran, or "Recitation", is the central religious text of Muslims, the practitioners of Islam. Muslims believe that the Quran was revealed to the prophet Muhammad directly from God over a period of 22-23 years from 610 AD to his death in 632 AD. As such it is highly revered and forms the basis of Islamic law still observed today in many places. The original language of the Quran is Arabic, and book is widely regarded for its literary qualities. 
        <br></br><br></br>The Quran is not only much later in date than the Bible but it is also much smaller. It is shorter than the New Testament, much less the Bible, and consists of 114 units of varying length called "surahs," which are the equivalent of chapters. These surahs are arranged generally by decreasing length and are known by names that were assigned after Muhammad's death. The names of the surahs, such as "The Cow" or "Al Baqarah" in Arabic(the name of the second surah), are derived from prominent words in the surah. Like the Bible, the Quran is further divided into verses, or "ayat," which means "signs." 
        <br></br><br></br>The theme of the Quran is largely eschatological - that is, dealing with the final judgment of humanity by God - a theme that also figures prominently in the New Testament. The Quran acknowledges many of the same characters found in the Bible, such as Adam, Noah, Moses, Jesus, and Mary. But Jesus is portrayed as a prophet of God rather than the son of God, as he is presented in the New Testament. <br></br><br></br>
        Sacred Scrolls draws the text of the Quran from the alquran.cloud API (https://alquran.cloud/api) where it can be viewed in both English and Arabic. Both the Arabic text and the English translation are integrated into the Sacred Scrolls app.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>The Bhagavad Gita</Accordion.Header>
        <Accordion.Body>
        The Bhagavad Gita, otherwise known as the "Gita" or the "Song of God", is a 700-verse Hindu scripture that forms part (18 chapters) of a larger Indian epic called the Mahabharata recounting the conflict between the Pandava brothers and their cousins the Kauravas. While small, the Bhagavad Gita is one of the principal religious texts of the Hindus.  According to Hindu tradition, the author of the Mahabharata and the Gita was a holy man named Vyasa, or Veda-Vyasa. But more likely the Gita was the work of several authors and compilers. Its composition is dated between the 5th century and 2nd century BC. The Bhagavad Gita is a poem of 700 verses originally written in the Sanskrit language. The basic unit of the text is called a "shloka." The subject of the Bhagavad Gita is a dialogue between the Hindu god Krishna and Arjuna, one of the five Pandavas (or sons of King Pandu), on the eve of a great battle. Arjuna has doubts about the rationale for the bloodshed at hand and asks his charioteer Krishna for guidance. The ensuing conversation touches on philophical and religious themes such as the ethics of killing, the afterlife, karma. duty, and self-realization. <br></br><br></br>
        The Sacred Scrolls app uses a JSON file of the Bhagavad Gita from github (https://github.com/kashishkhullar/gita_json/tree/master) which contains both Sanskrit and the English translation. 
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default TextsPage;


  



