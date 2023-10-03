import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
// import App from './App'

import StarRating from './StarRating'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StarRating
      maxRating={5}
      defaultRating="1"
    />
    <StarRating
      maxRating={5}
      color="red"
      size={24}
      className="test"
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
      defaultRating="1"
    />
  </React.StrictMode>
)
