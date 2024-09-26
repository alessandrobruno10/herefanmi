# HeReFaNMi RAG API 🚀

**HeReFaNMi (Health-Related Fake News Mitigation)** is an AI-powered system developed to identify and mitigate fake news in the healthcare sector. This repository contains the API implementation of **RAG (Retrieval-Augmented Generation)**, which facilitates real-time detection of health-related misinformation by combining document retrieval with natural language generation.

## RAG Overview
**RAG (Retrieval-Augmented Generation)** is a hybrid model that enhances traditional NLP systems by:
- **Retrieving relevant data** from credible health sources in real-time.
- **Generating contextually accurate responses** based on retrieved information.
- **Continuously learning** from new data to remain up-to-date on emerging health trends.

### Data Sources
The RAG API pulls health-related data from the following trusted sources:
- **CDC (Centers for Disease Control and Prevention)**
- **NHS (National Health Service)**
- **MedlinePlus**
- **STAT News**
- **MedPage Today**
- **WebMD**
- **News Medical**

## Code Structure
The API is modular, ensuring separation of concerns between retrieval, generation, and API routing.

```plaintext
rag-api/
├── Server/                   # Backend logic for data retrieval and generation
|    ├── server.py          # Handles document retrieval from external sources
|    ├── generator.py          # Manages text generation using the RAG model
└─   └── server.py             # Hosts the Flask API and manages incoming requests

```
## Built With
The following frameworks and libraries power the API:

- **Flask** - Web framework for hosting the API
- **MongoDB** - Database for storing retrieved documents and metadata
- **Hugging Face Transformers** - Pre-trained models for NLP tasks
- **ElasticSearch** - Fast, scalable document retrieval

## Installation
To run the API locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/alessandrobruno10//herefanmi/edit/main/HeReFaNMi
    cd HeReFaNMi
    cd HeReFaNMi RAG API

    ```

2. Set up the backend:
   Navigate to the `Backend/` directory and install the required dependencies:
    ```bash
    cd Backend
    pip install -r requirements.txt
    ```

3. Set up the model:
   Either download a pre-trained RAG model or fine-tune one using the provided scripts in the `models/` directory.

## Running the API
To start the API server, run the following command from the `Server/` directory:
bash
python server.py


The API will run by default at `http://localhost:5000`.

## API Endpoints
The RAG API exposes the following key endpoints:

### POST /api/retrieve
- **Description:** Retrieves relevant documents based on the query.
- **Request Body:**
    ```json
    {
      "query": "Is cancer good?"
    }
    ```
- **Response:**
    ```json
    {
      "retrieved_documents": [
        {
          "source": "CDC",
          "text": "...."
        },
        {
          "source": "NHS",
          "text": ",..."
        }
      ]
    }
    ```



## How It Works
- **Document Retrieval:** The `/api/retrieve` endpoint fetches relevant documents from reliable health sources based on the input query.
## Contributions
We welcome contributions from the community! Whether it's improving retrieval methods, enhancing model accuracy, or fixing bugs, feel free to submit a pull request.

## Authors 🚀
The HeReFaNMi RAG API was developed by:


- Bruno Alessandro
- Aladine Chetouani
- Pierluigi Mazzeo
- Walid Taib
- Marouane Tliba
- Mohamed Amine Kerkouri

For inquiries or feedback, please open an issue in this repository.


