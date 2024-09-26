from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM

# Initialize FastAPI app
app = FastAPI()

# Load custom model and tokenizer

model = AutoModelForCausalLM.from_pretrained("a-hamdi/NGILlama3-merged")
tokenizer = AutoTokenizer.from_pretrained("a-hamdi/NGILlama3-merged")

# Define the request body structure
class TextGenerationRequest(BaseModel):
    prompt: str
    max_length: int = 50

# Define the text generation endpoint
@app.post("/generate")
def generate_text(request: TextGenerationRequest):
    inputs = tokenizer.encode(request.prompt, return_tensors="pt")
    outputs = model.generate(inputs, max_length=request.max_length, num_return_sequences=1)
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"generated_text": generated_text}

# Run the server using `uvicorn main:app --reload` (if file is named main.py)


