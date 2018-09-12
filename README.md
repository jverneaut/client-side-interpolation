![Imgur](https://i.imgur.com/nIhGLDz.gif)

# Client-Side Interpolation

For real-time games, an authoritative server controls the game state. Clients are only responsible for sending commands ('Left', 'Right', etc.) and rendering the state.

While this approach prevents cheating and allows lower-end machines to run the game, it introduces some delay between clients. Furthermore, the server can't send 60fps updates to every player in the room.

As such, clients rely on interpolation to render a fluid game experience: instead of rendering immediately every new state, the client buffers them and then performs linear interpolation between the last 2.

In this demo, some delay is introduced to simulate a real client-server communication.
