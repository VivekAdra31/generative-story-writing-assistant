import openai
import os

openai.api_key = os.environ['OPENAI_API_KEY']

def return_response(prompt):
  completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", 
    messages=[{"role": "user", "content": prompt}]
  )

  context = completion['choices'][0]["message"]["content"]
  return context

