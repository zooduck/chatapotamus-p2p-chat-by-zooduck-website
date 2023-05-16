import './modules/@zooduck/chatapotamus-p2p-chat-by-zooduck/index.module.js';
import './components/command-line-prompt/index.js';
import './components/outline-box/index.js';
import './scripts/project-dependency-previews.script.js';

const meteredResponse = await fetch('https://chatapotamus.metered.live/api/v1/turn/credentials?apiKey=9c15fa927374251156c4b8c0198d02d33e01');
const iceServers = await meteredResponse.json();

document.querySelector('chatapotamus-p2p-chat-by-zooduck').iceServers = iceServers;
