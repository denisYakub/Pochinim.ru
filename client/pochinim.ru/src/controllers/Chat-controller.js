class ChatController{
    /*async sendMessageUser(text, id_companion, id_topic){
        const body = {'email_sender': localStorage.getItem('mail'),
         'message_text': text, 'id_companion': id_companion, 'id_topic': id_topic
        };

        const result = await fetch(`http://localhost:4000/api/chats/users`,{
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        });

        if(result.ok){

        }else{
            console.log('pls refresh');
        }
    }*/

    /*async getMessagesUser(id_topic, id_companion){
        const result = await fetch(`http://localhost:4000/api/chats/users/${localStorage.getItem('mail')}/${id_topic}/${id_companion}`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
           
        if(result.ok){
            return result.json();
        }else{
            console.log('pls refresh');
        }
    }*/

    async getChatID(id_user, id_master, id_topic){

        const body = { 'id_user': id_user, 'id_master': id_master, 'id_topic': id_topic };

        const result = await fetch(`http://localhost:4000/api/chats`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        });

        if(result.ok){
            return result.json();
        }else{
            console.log('pls refresh');
        } 
    }
    async getMessages(id_chat){
        const result = await fetch(`http://localhost:4000/api/messages/${id_chat}`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
           
        if(result.ok){
            return result.json();
        }else{
            console.log('pls refresh');
        } 
    }
    async sendMessage(text, id_chat){
        const body = {'text': text, 'sender_email': localStorage.getItem('mail')};

        const result = await fetch(`http://localhost:4000/api/messages/${id_chat}`,{
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        });

        if(result.ok){
            return;
        }else{
            console.log('pls refresh');
        }
    }

    async getChatsUserByIdTopic(id_topic){
        const result = await fetch(`http://localhost:4000/api/chats/users/${localStorage.getItem('mail')}/${id_topic}`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
           
        if(result.ok){
            return result.json();
        }else{
            console.log('pls refresh');
        }
    }
}

const chatController = new ChatController();

export default chatController;