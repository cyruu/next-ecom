# Reload the content of the file
file_path = 'asdf.txt'

with open(file_path, 'r') as file:
    content = file.read()

# Simplified function to fix syntax issues in the word list
def fix_word_list(content):
    # Split the content by commas
    words = content.split(',')
    # Ensure each word is properly enclosed in single quotes and stripped of whitespace
    corrected_words = ["'" + word.strip().strip('"').strip("'") + "'" for word in words if word.strip()]
    # Join corrected words with a comma and a space
    return ', '.join(corrected_words)

# Apply the fix to the content
corrected_content = fix_word_list(content)

# Save the corrected content to a new file for the user to verify
corrected_file_path = 'asdf_corrected.txt'
with open(corrected_file_path, 'w') as corrected_file:
    corrected_file.write(corrected_content)


