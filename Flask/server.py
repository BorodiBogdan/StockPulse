from flask import Flask, request, jsonify
import requests
import datetime
import os 

app = Flask(__name__)

@app.route('/api/home', methods=['GET'])
def api():
    #get username 
    username = request.args.get('username')
    #get user data
    user_data = requests.get(os.getenv("API_CALL_URL")  + "/api/stocks?username=" + username).json()
    
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
    
    modified_user_data['stocks'] = sorted(modified_user_data['stocks'], key=lambda x: (x['createdAt'], x['symbol']))
    
    #convert to ISO-8601 DateTime.
    
    modified_user_data['createdAt'] = modified_user_data['createdAt'].isoformat()
    modified_user_data['updatedAt'] = modified_user_data['updatedAt'].isoformat()
    
    #return the user data
    return modified_user_data

@app.route('/api/posts', methods=['GET'])
def posts():
    #get the data
    data = requests.get('https://eodhd.com/api/news?s=AAPL.US&offset=0&limit=10&api_token=' + os.getenv("EODHD_API_KEY") + '&fmt=json').json()
    
    modified_data = []
    
    for post in data:
        modified_data.append({
            'title': post['title'],
            'content': post['content'],
            'date': post['date'],
            'symbols': post['symbols'],
            'link': post['link']
        })
    
    #get the user stocks and display first the stocks that have the same symbols as the posts
    
    username = request.args.get('username')
    
    if(username == None or username == ""):
        return modified_data
    
    user_data = requests.get(os.getenv("API_CALL_URL") + "/api/stocks?username=" + username).json()
    
    #get the symbols of the user stocks
    user_symbols = []
    
    for stock in user_data:
        user_symbols.append(stock['symbol'])
        
    #sort the posts by the symbols
    
    sorted_data = sorted(modified_data, key=lambda x: x['symbols'] in user_symbols)
    
    return sorted_data

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    