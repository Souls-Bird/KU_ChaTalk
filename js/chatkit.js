const tokenProvider = new Chatkit.TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/21dcfba5-1cd3-4698-9901-3c0d01b5ebb2/token"
      });
      const chatManager = new Chatkit.ChatManager({
        instanceLocator: "v1:us1:21dcfba5-1cd3-4698-9901-3c0d01b5ebb2",
        userId: "User1",
        tokenProvider: tokenProvider
      });

      chatManager
        .connect()
        .then(currentUser => {
          currentUser.subscribeToRoomMultipart({
            roomId: currentUser.rooms[0].id,
            hooks: {
              onMessage: message => {
                const ul = document.getElementById("message-list");
                const li = document.createElement("li");
                li.appendChild(
                  document.createTextNode(`${message.senderId}: ${
                    // We know our message will have a single part with
                    // a plain text content because we used
                    // sendSimpleMessage. In general we'd have to check
                    // the partType here.
                    message.parts[0].payload.content
                  }`)
                );
                ul.appendChild(li);
              }
            }
          });

          const form = document.getElementById("message-form");
          form.addEventListener("submit", e => {
            e.preventDefault();
            const input = document.getElementById("message-text");
            currentUser.sendSimpleMessage({
              text: input.value,
              roomId: currentUser.rooms[0].id
            });
            input.value = "";
          });
        })
        .catch(error => {
          console.error("error:", error);
        });
