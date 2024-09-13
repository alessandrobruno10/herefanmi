import requests
from bs4 import BeautifulSoup

# Send a GET request to the webpage
url = "https://www.medscape.com/index/list_13470_219"
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content
    soup = BeautifulSoup(response.content, "html.parser")

    # Find the <ul> element with id "archives"
    archives_ul = soup.find("div", id="archives").ul

    # Find all <a> elements within the <ul>
    links = archives_ul.find_all("a", class_="title")

    # Extract the href attribute from each <a> element
    print(len(links))
    for link in links:
        print(link['href'])
else:
    print("Failed to retrieve the webpage")
