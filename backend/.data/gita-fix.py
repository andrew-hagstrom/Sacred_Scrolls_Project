import json


def process_gita_verses(json_data):
    """
    This is a script for taking the wonderful work completed by Kashish Khullar here https://github.com/kashishkhullar/gita_json/blob/master/dataset_english.json and utilizing it in our sacred scrolls app"""
    processed_verses = []

    for chapter_number, chapter in json_data["verses"].items():
        for verse_number, verse_data in chapter.items():
            # Entry for English
            english_entry = {
                "language": "English",
                "book": "Bhagavad Gita",
                "chapter": int(chapter_number),
                "verse": verse_number,  # Keeping verse as string
                "text": verse_data["meaning"]
            }
            processed_verses.append(english_entry)

            # Entry for Sanskrit
            sanskrit_entry = {
                "language": "Sanskrit",
                "book": "Bhagavad Gita",
                "chapter": int(chapter_number),
                "verse": verse_number,  # Keeping verse as string
                "text": verse_data["text"]
            }
            processed_verses.append(sanskrit_entry)

            # Entry for Sanskrit Learning (word meaning)

            sanskrit_learning_entry = {
                "language": "Sanskrit_Learning",
                "book": "Bhagavad Gita",
                "chapter": int(chapter_number),
                "verse": verse_number,  # Keeping verse as string
                "text": verse_data["word_meanings"]
            }
            processed_verses.append(sanskrit_learning_entry)

            sanskrit_transliteration_entry = {
                "language": "Sanskrit_Learning",
                "book": "Bhagavad Gita",
                "chapter": int(chapter_number),
                "verse": verse_number,  # Keeping verse as string
                "text": verse_data["transliteration"]

            }

    return processed_verses

# Load the JSON file
with open("<gita source>", 'r') as file:
    gita_json = json.load(file)

# Process the data
processed_data = process_gita_verses(gita_json)

# Convert to Django fixture format
fixture_data = []
for idx, entry in enumerate(processed_data, start=1):
    fixture_entry = {
        "model": "user_app.Passages", 
        "pk": idx,
        "fields": entry
    }
    fixture_data.append(fixture_entry)

# Write to fixture file
with open('gita_fixture.json', 'w') as file:
    json.dump(fixture_data, file, indent=4)


