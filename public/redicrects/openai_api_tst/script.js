document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('api-key');
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const promptInput = document.getElementById('prompt-input');
    const processButton = document.getElementById('process-button');
    const resultOutput = document.getElementById('result-output');

    // Show image preview when file is selected
    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Process image when button is clicked
    processButton.addEventListener('click', async () => {
        const apiKey = apiKeyInput.value.trim();
        const prompt = promptInput.value.trim();
        const file = imageUpload.files[0];

        // Validate inputs
        if (!apiKey) {
            alert('Please enter your OpenAI API key');
            return;
        }

        if (!file) {
            alert('Please upload an image');
            return;
        }

        if (!prompt) {
            alert('Please enter a prompt');
            return;
        }

        // Show loading state
        resultOutput.textContent = 'Processing...';
        resultOutput.classList.add('loading');
        processButton.disabled = true;

        try {
            const result = await processImageWithOpenAI(apiKey, file, prompt);
            resultOutput.textContent = result;
        } catch (error) {
            resultOutput.textContent = `Error: ${error.message}`;
        } finally {
            resultOutput.classList.remove('loading');
            processButton.disabled = false;
        }
    });

    // Function to process image with OpenAI API
    async function processImageWithOpenAI(apiKey, imageFile, prompt) {
        // Convert image to base64
        const base64Image = await convertImageToBase64(imageFile);

        // Prepare the request to OpenAI API
        const requestBody = {
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        {
                            type: "image_url",
                            image_url: {
                                url: base64Image
                            }
                        }
                    ]
                }
            ],
            max_tokens: 1000
        };

        // Make the API request
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        // Parse the response
        const data = await response.json();

        // Check for errors
        if (!response.ok) {
            const errorMessage = data.error?.message || 'Unknown error occurred';
            throw new Error(errorMessage);
        }

        // Return the response text
        return data.choices[0].message.content;
    }

    // Helper function to convert image to base64
    function convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }
}); 