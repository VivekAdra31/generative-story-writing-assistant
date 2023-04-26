import openai
import os

openai.api_key = os.environ['OPENAI_API_KEY']

def return_response(prompt):
  system_prompt = "You are a tool that writers use to generate a few sentences to continue their stories for children's books. Given a piece of text, suggest a few sentences that continues the story"
  completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", 
    messages=[{"role": "system", "content": system_prompt},
    {"role": "user", "content": prompt}]
  )

  context = completion['choices'][0]["message"]["content"]
  return context

