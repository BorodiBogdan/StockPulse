
# StockPulse

StockPulse is a web application for filtering and displaying stock-related news based on user preferences. You can add custom stocks to your portfolio, track them and share the portfolio with other users to discuss about your stocks. It is built using Next.js, Tailwind CSS for styling, and Flask for backend functionalities such as filtering news.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Stock News**: Display the latest stock-related news.
- **User-Based Filtering**: Personalized news filtering based on user preferences using Flask.
- **Responsive Design**: Optimized for both mobile and desktop using Tailwind CSS.
- **Fast and Scalable**: Powered by Next.js for server-side rendering and optimized performance.
- **Custom portfolio design**: Add your prefered stocks to your portfolio
- **Portfolio sharing**: Share your portfolio with other users and discuss in the comments section with them
## Installation

### Prerequisites

- Node.js
- Python (for Flask backend)
- Flask and related dependencies
- Vercel account (optional for deployment)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/stockpulse.git
   cd stockpulse
   ```

2. **Install frontend dependencies**:

   ```bash
   npm install
   ```

3. **Install Flask dependencies**:

   ```bash
   cd flask-backend
   pip install -r requirements.txt
   ```

4. **Run the Flask backend**:

   ```bash
   cd flask-backend
   flask run
   ```

5. **Run the Next.js frontend**:

   ```bash
   cd ..
   npm run dev
   ```

6. **Open the app**:

   Open `http://localhost:3000` in your browser to view the app.

## Usage

- Navigate to the homepage to see the latest stock news.
- Use the filtering functionality to personalize news results based on your preferences.

## Technologies

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Flask (Python), Next.js
- **Deployment**: Vercel (for frontend), Render to host the Flask server (auxiliar API server)

## Contributing

Feel free to fork the project and submit a pull request if you have suggestions or improvements. 

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
