import csv
import json

# Function to remove duplicates from the CSV file
def remove_duplicates(input_file, output_csv_file, output_json_file):
    seen = set()
    unique_rows = []

    with open(input_file, 'r', encoding='utf-8') as csvfile:
        csvreader = csv.reader(csvfile)
        for row in csvreader:
            if tuple(row) not in seen:
                seen.add(tuple(row))
                unique_rows.append(row)

    with open(output_csv_file, 'w', newline='', encoding='utf-8') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerows(unique_rows)

    json_data = [{"originalStr": row[0], "encryptedStr": row[1]} for row in unique_rows]
    print(f'Length of JSON data: {len(json_data)}') 

    with open(output_json_file, 'w', encoding='utf-8') as jsonfile:
        json.dump(json_data, jsonfile, indent=4)

# File paths
input_file = '/Users/misbah/Downloads/FacultyInitial.csv'  # Replace with your input CSV file path
output_csv_file = '/Users/misbah/Downloads/FacultyInitialOutput.csv'
output_json_file = '/Users/misbah/Downloads/FacultyInitialOutput.json'

# Remove duplicates and generate updated CSV and JSON files
remove_duplicates(input_file, output_csv_file, output_json_file)

print(f'Duplicates removed and data saved to {output_csv_file} and {output_json_file}')
