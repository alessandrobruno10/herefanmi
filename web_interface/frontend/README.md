# Ai-text-validator and Health Information Checker

## Overview
This application allows users to check the trustworthiness of health-related information by entering text and receiving an analysis based on an external API response.

## Functionality
- **Input Section**: Users can input text related to health information.
- **Analyze Button**: Clicking the "Analyze" button triggers an analysis of the provided text.
- **Response Display**:
  - If the health information is trustworthy, a green response is displayed with related details from the API.
  - If the information is doubtful, a yellow response is shown with alternative references from the API.
  - For fake information, a red response is displayed with links to the referenced content from the API.
  - If no text is entered, a generic response displays the opinion of the LARGE LANGUAGE MODEL.
- **Result Section**: Different colored buttons indicate the analysis result in case we havn't entred anything yet.

## Code Structure
The `App.js` file comprises the main logic for handling user input, API calls, and rendering different responses based on the received data. Here's a breakdown of the sections:
- `useState`: Manages state variables for input text and result.
- `handleSubmit`: Responsible for sending the input text to the API and updating the result state.
- `handleSubmitTest`: Simulates different responses for testing purposes.
- `handleTextChange`: Updates the inputText state when there's a change in the input.
- Conditional rendering based on the 'result' state variable, displaying different response sections and buttons accordingly.

## Setup
1. Ensure all dependencies are installed using `npm install`.
2. Run the application using `npm run start`.

## Usage
1. Enter health-related information in the input field.
2. Click the "Analyze" button to trigger the analysis.
3. Observe the displayed response and buttons indicating the trustworthiness of the information.

Feel free to check the CSS file and structure of components for better understading.
