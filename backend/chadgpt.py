import openai
import os

openai.api_key = os.environ['OPENAI_API_KEY']

def return_response(prompt):
  system_prompt = " You are writing a children's story book. Complete the following text by adding 100 words to it :  "
  completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", 
    messages=[{"role": "user", "content": system_prompt + prompt}]
  )

  context = completion['choices'][0]["message"]["content"]
  return context

