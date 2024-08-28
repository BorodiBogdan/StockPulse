from flask import Flask, request, jsonify
import requests
import datetime

app = Flask(__name__)

@app.route('/api/home', methods=['GET'])
def api():
    #get username 
    username = request.args.get('username')
    #get user data
    user_data = requests.get("http://localhost:3000/api/stocks?username=" + username).json()
    
    #we can do some processing here
    #we need to add comments to the user data
    #we already know the username
    
    
    modified_user_data = {
        'user': username,
        'stocks': user_data,
        'comments': [],
        'createdAt': datetime.datetime.now(),
        'updatedAt': datetime.datetime.now()
    }
    
    #sort the stocks by the date and if the date is the same by stock name
    
    modified_user_data['stocks'] = sorted(modified_user_data['stocks'], key=lambda x: (x['date'], x['symbol']))
    
    #convert to ISO-8601 DateTime.
    
    modified_user_data['createdAt'] = modified_user_data['createdAt'].isoformat()
    modified_user_data['updatedAt'] = modified_user_data['updatedAt'].isoformat()
    
    #return the user data
    return modified_user_data

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    