<p align="center">
  <img src="https://github.com/Walid-Taib/web-scraping-framework/blob/main/NGISearch_Sticler.png" widh="200" height="200" />
</p>
<h2 align="center">HeReFaNMi NGI Search project</h2>
<p align="center">
    Health-Related Fake News Mitigation
    <br />
    <a href="https://github.com/Walid-Taib/web-scraping-framework/blob/main/documentation.pdf"><strong>Explore the docs </strong></a>
    <br />
    <br />
    <a href="http://localhost:3000/">View Demo</a>

 
</p>


## HeReFaNMi 🚀
HeReFaNMi  is one of ten <a href="https://www.zdnet.fr/blogs/l-esprit-libre/ngi-search-la-commission-europeenne-finance-dix-logiciels-open-source-de-recherche-39960000.htm"> NGI search</a> project stands for Health-Related Fake News Mitigation. It's an AI-beased system designed to detect and identify fake news related healthcare.
The proposed system will use continuous learning to distinguish between fake news and real news. Current NLP techniques for detecting fake news have limitations, as most rely on supervised learning. The proposed system aims to overcome these limitations by continuously updating the knowledge base with emerging events.

## Automatic web scraping framework 🚀
<p>As part of this project, we developed an automatic web scraping framework that will automatically scrape data from various online sources. Currently, we are utilizing 8 credible platforms:
  <li><a href="https://www.cdc.gov/">  CDC (Centers for Disease Control and Prevention)</a>:  The CDC is the national public
health agency of the United States, operating under <B> the Department of Health and Human
Services </B>. Headquartered in Atlanta, Georgia and it provides authoritative information on various
health-related topics.
</li>
<li><a href="https://www.nhs.uk/">NHS (National Health Service) </a>: The NHS is a <B> government-funded healthcare platform in the United Kingdom </B>. Established in 1948, it provides comprehensive medical services to residents, primarily financed through taxation and It operates under the oversight of government health departments in England, Scotland, Wales, and Northern Ireland, offering healthcare that is largely free at the point of use.</li>

  <li>
   <a href="https://medlineplus.gov/"> MedlinePlus </a>: It is a government-operated online health information platform provided by the National Library of Medicine, a division of the National Institutes of Health (NIH) in the United States. It offers a vast array of reliable and up-to-date health information to empower individuals in making informed decisions about their well-being.
  </li>

  <li><a href="https://www.statnews.com/ ">STAT News</a>: It is a credible source of health and medical news due to its commitment to accuracy, thorough reporting, and transparency. With seasoned professionals in health journalism, the company ensures expertise in covering complex topics. Rigorous fact-checking and in-depth analysis further enhance credibility, while transparent sourcing allows readers to verify information. Recognition and awards within the healthcare industry also validate STAT News' reputation for quality journalism.</li>

  <li><a href="https://www.medpagetoday.com/">MedPage Today </a>: It is a reputable online news source dedicated to providing healthcare professionals with up-to-date medical news and information. It covers a wide range of topics, including clinical research, medical guidelines, healthcare policy, and professional development. MedPage Today is known for its rigorous reporting, evidence-based content, and contributions from experts in the field. It is considered credible due to its commitment to accuracy, transparency, and adherence to journalistic standards.</li>

  <li><a href="https://www.webmd.com/">WebMD </a>: It is a leading source for trustworthy and timely health and medical news and information providing credible health information. The Medical Team collaborates with over 100 doctors and health experts nationwide, ensuring that its content is accurate, up-to-date, and promotes healthier living.</li>
  <li ><a href="https://www.news-medical.net/">News Medical </a> : It is a trusted online platform focused on life sciences, medical, and healthcare news. It provides reliable information, articles, and resources covering various aspects of life sciences, including research, developments, and innovations in the field. News Medical is considered credible due to its commitment to accuracy, evidence-based reporting, and contributions from experts in the life sciences community. The platform aims to educate and inform readers about the latest advancements and discoveries in life sciences and healthcare.</li>
</p>

This repository houses the codebase for Automatic web scraping to scrape news related to healthcare from online sources.

## Code structure:



```
 web-scraping-framework/
 ├── Backend/ --- Holds the backend code responsible for server-side logic and data interactions.
 |    ├── server.py  --- handle request from the interface, manage the database and the dataset.
 |    ├── visualize.py --- handle the visualization of the dataset
 |    └── router / --- Holds the scrappers.
 |         └─ scraper_1.py --- script for scraping data from external source.        
 ├── Frontend/ --- Holds the code for the user interface
 |    ├── App.js --- It runs the front-end server  
 ├──  components/ --- Holds the frontend components
 └──       └── Main.js  --- The main component.
```


## Built With

This section  list frameworks/libraries used to bootstrap the automatic web scraping framework:

* [![React][React.js]][React-url]
* [![Flask][Flask]][Flask-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![BeautifulSoup][BeautifulSoup]][BeautifulSoup-url]

## Data Collection and Availability 🚀

As part of the HeReFaNMi project, we have successfully collected an extensive dataset of around **800,000 data points** related to healthcare news using our automatic web scraping framework. This dataset is aimed at improving the system's ability to distinguish between fake and real healthcare news through continuous learning.

The collected dataset is **publicly available** and can be accessed via the following [link](https://github.com/Walid-Taib/web-scraping-framework/blob/main/dataset.pdf). We encourage the community to explore and utilize the dataset for further research and advancements in mitigating health-related fake news.

<p align="center">
  <img src="https://github.com/Walid-Taib/web-scraping-framework/blob/main/NGISearch_Sticler.png" width="200" height="200" />
</p>




## Development Setup

1. **Clone the repository:**

   Use Git to clone this repository from your GitHub account.

2. **Navigate to the project directory:**

   Use your terminal or command prompt to navigate to the newly cloned repository directory.

3. **Install frontend dependencies:**

   Go to the `frontend` directory and run the appropriate command (e.g., `npm install` or `yarn install`) to install the necessary frontend libraries.

4. **Set up backend environment:**

   Go to the `Backend` directory and run the appropriate command `pip install requirements.txt` to install the necessary backend libraries.

## Running the Application

### Frontend

1. **Start the development server:**

   This typically involves running a command `npm start` in the `frontend` directory. The server will launch the frontend application in your web browser, usually accessible at `http://localhost:3000` (or a different port depending on your setup).

### Backend

1. **Start the backend server:**

   This typically involves running a specific file by `python server.py` in the `backend` directory. The backend server will typically listen on a specific port (e.g., `http://localhost:3001`). Consult the  backend framework's documentation for details.

## Authors 🚀
Autmatic web scraping framework has been developed by Walid Taib, Marouane Tliba , Mohamed Amine KERKOURI, Bruno Alessandro, Aladine Chetouani and Pierluigi Mazzeo.

You can contact us by opening a new issue in the repository.



[React.js]: https://shields.io/badge/react-black?logo=react&style=for-the-badge
[React-url]: https://reactjs.org/](https://fr.legacy.reactjs.org/
[Flask]: https://img.shields.io/badge/flask-3.0.0%2B-blue?logo=flask
[Flask-url]: https://vuejs.org](https://flask.palletsprojects.com/en/3.0.x/
[MongoDB]: https://img.shields.io/badge/-MongoDB-4DB33D?style=flat&logo=mongodb&logoColor=FFFFFF
[MongoDB-url]: https://shields.io/badge/BeautifulSoup-4-green
[BeautifulSoup]: https://shields.io/badge/BeautifulSoup-4-green
[BeautifulSoup-url]: https://shields.io/badge/BeautifulSoup-4-green


