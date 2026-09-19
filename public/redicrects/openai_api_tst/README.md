# OpenAI Image Processing App

A simple web application that uses the OpenAI API to process images using the GPT-4o mini model.

## Features

- Upload an image for processing
- Enter your own OpenAI API key securely
- Provide custom prompts for GPT-4o mini model
- View the results directly in the application

## How to Use

1. Open `index.html` in your web browser
2. Enter your OpenAI API key (this is stored locally and not sent anywhere except to OpenAI)
3. Upload an image you want to process
4. Enter a prompt for the model (e.g., "Describe this image in detail" or "What objects can you see in this image?")
5. Click "Process Image" and wait for the results

## Requirements

- A valid OpenAI API key with access to the GPT-4o mini model
- A modern web browser
- Internet connection

## Technical Details

This application uses:
- HTML/CSS for the user interface
- JavaScript for client-side functionality
- OpenAI's Chat Completions API to process the images
- Base64 encoding to send images to the OpenAI API

## Notes

- Your API key is only used for making requests to OpenAI and is not stored or transmitted elsewhere
- Image processing happens through the OpenAI API, and the results depend on the capabilities of the GPT-4o mini model 