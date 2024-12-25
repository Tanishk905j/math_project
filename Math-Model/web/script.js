document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const userInput = document.getElementById('userInput');
    const messageScreen = document.getElementById('messageScreen');

    
    function parseMarkdown(inputText) {

        
        inputText = inputText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

        
        inputText = inputText.replace(/^(#{3})\s*(.*?)$/gm, '<h3>$2</h3>');

        
        inputText = inputText.replace(/\n/g, '<br>');
        
        

        return inputText;
    }

    
    function displayMessage(message, isUser = true, isLoader = false) {

        const messageContainer = document.createElement('div');

        messageContainer.classList.add('message');
        
        if (isUser) {
            messageContainer.classList.add('user');
        }

        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        if (isLoader) {
            bubble.classList.add('loader'); // Add a loader class
            bubble.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
        } else {
            
            const formattedMessage = parseMarkdown(message);
            bubble.innerHTML = formattedMessage; 
            
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, bubble]);
        }

        messageContainer.appendChild(bubble);
        messageScreen.appendChild(messageContainer);

        
        messageScreen.scrollTop = messageScreen.scrollHeight;

        return bubble; 
    }

    sendButton.addEventListener('click', async () => {
        const message = userInput.value.trim();
        if (message) {
            displayMessage(message); 
            userInput.value = '';
            const loaderBubble = displayMessage('', false, true); 
    
            try {
                console.log("Sending message to Python:", message);
                const response = await eel.solve_math_problem(message)();
                console.log("Received response from Python:", response);
                
                loaderBubble.classList.remove('loader'); 
                if (response.error) {
                    loaderBubble.textContent = response.error;
                } else {
                    loaderBubble.innerHTML = parseMarkdown(response.response); 
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, loaderBubble]);
                }
            } catch (error) {
                console.error("Error fetching response:", error);
                loaderBubble.classList.remove('loader'); 
                loaderBubble.textContent = "Error occurred. Please try again.";
            }
        }
    });


    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendButton.click();
        }
    });
});
