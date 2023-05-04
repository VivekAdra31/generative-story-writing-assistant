# Generative-Story-Writing-Assistant
An application that allows users to create Illustrated Children's Story Books using Generative AI features.
This tool creates a split-screen view for artists to illustrate pages as they write the story. 

The user can generate suggested text to continue the story based on the current writing, and can also prompt the Image Generation Model to generate relevant illustrations for the page.

The application currently uses GPT-3.5 Turbo for text generation and DALL-E 2 for Image Generation.

## How to Run Frontend:
```
  cd frontend
  npm install 
  npm start
```

## How to Run Backend:
```
  cd backend
  souce venv/bin/activate
  pip3.8 install -r requirements.txt
  python3.8 server.py
```


