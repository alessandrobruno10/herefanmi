import csv
import re

def remove_special_characters(text):
    # Define a regular expression to match special characters
    pattern = re.compile(r'[^a-zA-Z0-9\s]')
    
    # Use the regular expression to remove special characters from the text
    cleaned_text = pattern.sub('', text)
    
    return cleaned_text

def text_cleaning_pipeline(text):
    # Convert the text to lowercase
    text = text.lower()

    # Remove punctuation
    text = re.sub(r'[^\w\s]', '', text)

    # Remove numbers
    text = re.sub(r'\d', '', text)

    # Remove extra spaces
    text = ' '.join(text.split())

    # Replace repetitions of punctuations
    text = re.sub(r'(\!)+', '!', text)
    text = re.sub(r'(\?)+', '?', text)
    text = re.sub(r'(\.)+', '.', text)

    # Remove emojis and emoticons
    text = re.sub(r'[\U0001F600-\U0001F650]|[\U0001F300-\U0001F5FF]', '', text)
    text = re.sub(r'[:;=-]?[DpP3\{\}@|\\/@\]\\\[]]+', '', text)

    # Remove contractions
    contractions = {"isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not", "haven't": "have not", "hasn't": "has not"}
    for contraction, expansion in contractions.items():
        text = text.replace(contraction, expansion)

    return text

def clean_csv(input_file, output_file):
    try:
        with open(input_file, 'r', newline='', encoding='utf-8') as csv_file:
            # Create a CSV reader
            reader = csv.reader(csv_file)
            
            # Read the header row
            header = next(reader)
            
            # Create a list to store cleaned rows
            cleaned_rows = []
            
            # Iterate through each row in the CSV file
            for row in reader:
                cleaned_row = [text_cleaning_pipeline(cell) for cell in row]
                cleaned_rows.append(cleaned_row)
                
            # Write the cleaned data to a new CSV file
            with open(output_file, 'w', newline='', encoding='utf-8') as cleaned_csv_file:
                writer = csv.writer(cleaned_csv_file)
                
                # Write the header
                writer.writerow(header)
                
                # Write the cleaned rows
                writer.writerows(cleaned_rows)
                
            print(f"Cleaning completed. Cleaned data saved to {output_file}")

    except FileNotFoundError:
        print(f"Error: File '{input_file}' not found.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Replace 'input.csv' and 'output_cleaned.csv' with your file names
