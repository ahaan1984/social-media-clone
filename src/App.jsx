import { useState } from 'react';
import './App.css';

function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Create a new tweet
  const addTweet = () => {
    if (!tweet) return;
    setTweets([...tweets, { id: Date.now(), text: tweet }]);
    setTweet('');
  };

  // Delete a tweet
  const deleteTweet = (id) => {
    setTweets(tweets.filter(tweet => tweet.id !== id));
  };

  // Prepare a tweet for editing
  const editTweet = (id) => {
    const toEdit = tweets.find(tweet => tweet.id === id);
    setEditingId(id);
    setEditText(toEdit.text);
  };

  // Update a tweet with new text
  const updateTweet = (id) => {
    setTweets(tweets.map(tweet => tweet.id === id ? { ...tweet, text: editText } : tweet));
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="app">
      <h1>Mini Twitter Clone</h1>
      <div className="tweetInput">
        <input
          type="text"
          placeholder="What's happening?"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        />
        <button onClick={addTweet}>Tweet</button>
      </div>
      <ul className="tweetsList">
        {tweets.map(tweet => (
          <li key={tweet.id}>
            {editingId === tweet.id ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => updateTweet(tweet.id)}>Update</button>
              </div>
            ) : (
              <div>
                {tweet.text}
                <button onClick={() => editTweet(tweet.id)}>Edit</button>
                <button onClick={() => deleteTweet(tweet.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
