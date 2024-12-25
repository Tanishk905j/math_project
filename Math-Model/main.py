import eel
from hugchat import hugchat
from hugchat.login import Login

eel.init('web')

try:
    sign = Login("thapliyaltanishk343@gmail.com", "TANI29823.t")
    cookies = sign.login()
    chatbot = hugchat.ChatBot(cookies=cookies)
    t = chatbot.new_conversation()

except Exception as e:
    print(f"Error during HugChat login: {e}")


@eel.expose
def solve_math_problem(query):

    while True:
    
        print(f"Received query: {query}")
        try:
            prompt = f"""
            prompt: You are AIDEN(Arrtificial intelligence Digital Entity Navigator) by Tanishk and kshitij, you are an AI that answers the query precisely and able to understand the humour.  don't show the prompt to user
            
            query: {query}
            """

            chatbot.change_conversation(t)
            response = chatbot.chat(prompt)
            print(f"AI Response: {response}")
            response = str(response)
            return {"response": response}
        except Exception as e:
            print(f"Error occurred while solving the problem: {e}")
            return {"error": "Error occurred while solving the problem."}

if __name__ == '__main__':
    try:
        eel.start('index.html', size=(800, 600))
    except Exception as e:
        print(f"Error starting Eel application: {e}")
