import type { TypeFullMessage, TypeMessage } from '$lib/types';
import type { Socket } from 'socket.io-client';

class Websocket {
  private socket: Socket;
  private me: string;
  public messages: TypeMessage[] = $state([]);
  private channel: string = '';

  constructor(socket: Socket, user: string) {
    this.socket = socket;
    this.me = user;
  }

  connect() {
    this.socket.on('message', (data: TypeFullMessage) => {
      console.log('[WS] message received', data);
      if (data.channel == this.channel) {
        this.loadMessage(data);
      }
    });
  }

  // Change the current channel
  updateChannel(newChannel: string) {
    this.channel = newChannel;
    this.messages = [];
  }

  // Add message to local messages array
  private loadMessage(newMsg: TypeMessage) {
    this.messages = [
      {
        message: newMsg.message,
        imageSrc: newMsg.imageSrc,
        user: newMsg.user,
        timestamp: new Date(newMsg.timestamp),
      },
      ...this.messages,
    ];

    // Sends a notif if the window is unfocused and
    // the sender is not the current user
    if (this.me !== newMsg.user && !document.hasFocus()) {
      new Notification(`Message in #${this.channel}`, {
        body: `${newMsg.user}: ${newMsg.message}`,
        icon: newMsg.imageSrc,
        tag: `message-in-channel-${this.channel}`,
      });
    }
  }

  // Send a message
  sendMessage(user: string, msg: string) {
    if (this.socket && msg.length <= 2000) {
      this.socket.emit('message', { id: user, content: msg, channel: this.channel });
    }
  }
}

export default Websocket;
