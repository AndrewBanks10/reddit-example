import fetch from 'isomorphic-fetch';

export default (subreddit, callback) => {
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(json => callback(json));
};