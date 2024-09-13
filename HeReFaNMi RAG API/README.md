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
├── Backend/                   # Backend logic for data retrieval and generation
|    ├── retriever.py          # Handles document retrieval from external sources
|    ├── generator.py          # Manages text generation using the RAG model
|    ├── server.py             # Hosts the Flask API and manages incoming requests
|    └── api/
|         └── rag_api.py       # Main API endpoints for RAG interactions
└── models/                    # Contains model definitions and training scripts
     ├── rag_model.py          # RAG model architecture
     └── training.py           # Script for fine-tuning the model on new data

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
    git clone https://github.com/your-username/rag-api.git
    cd rag-api
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
To start the API server, run the following command from the `Backend/` directory:
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
      "query": "What are the symptoms of COVID-19?"
    }
    ```
- **Response:**
    ```json
    {
      "retrieved_documents": [
        {
          "source": "CDC",
          "text": "The symptoms of COVID-19 include..."
        },
        {
          "source": "NHS",
          "text": "COVID-19 symptoms may present as..."
        }
      ]
    }
    ```

### POST /api/generate
- **Description:** Generates a response using retrieved documents.
- **Request Body:**
    ```json
    {
      "query": "What are the symptoms of COVID-19?",
      "retrieved_documents": [
        {
          "source": "CDC",
          "text": "The symptoms of COVID-19 include..."
        },
        {
          "source": "NHS",
          "text": "COVID-19 symptoms may present as..."
        }
      ]
    }
    ```
- **Response:**
    ```json
    {
      "generated_response": "According to the CDC and NHS, COVID-19 symptoms include fever, cough, and shortness of breath."
    }
    ```

### POST /api/detect_fake_news
- **Description:** Detects whether a query contains misinformation.
- **Request Body:**
    ```json
    {
      "query": "Drinking bleach cures COVID-19."
    }
    ```
- **Response:**
    ```json
    {
      "is_fake_news": true,
      "confidence_score": 0.97
    }
    ```

## How It Works
- **Document Retrieval:** The `/api/retrieve` endpoint fetches relevant documents from reliable health sources based on the input query.
- **Answer Generation:** The `/api/generate` endpoint combines retrieved documents with a pre-trained model to generate a coherent and factually accurate response.
- **Fake News Detection:** The `/api/detect_fake_news` endpoint classifies the input query and assesses the likelihood of it being fake news.

## Contributions
We welcome contributions from the community! Whether it's improving retrieval methods, enhancing model accuracy, or fixing bugs, feel free to submit a pull request.

## Authors 🚀
The HeReFaNMi RAG API was developed by:

- Walid Taib
- Marouane Tliba
- Mohamed Amine Kerkouri
- Bruno Alessandro
- Aladine Chetouani
- Pierluigi Mazzeo

For inquiries or feedback, please open an issue in this repository.


