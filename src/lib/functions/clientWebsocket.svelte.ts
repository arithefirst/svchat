import type { TypeFullMessage, TypeMessage } from '$lib/types';
import type { Socket } from 'socket.io-client';

class Websocket {
  private socket: Socket;
  public messages: TypeMessage[] = $state([]);
  private channel: string = '';

  constructor(socket: Socket) {
    this.socket = socket;
  }

  connect() {
    this.socket.on('message', (data: TypeFullMessage) => {
      console.log('[ws] message received', data);
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
  loadMessage(newMsg: TypeMessage) {
    this.messages = [
      {
        message: newMsg.message,
        imageSrc: newMsg.imageSrc,
        user: newMsg.user,
      },
      ...this.messages,
    ];
  }

  // Send a message
  sendMessage(user: string, msg: string) {
    if (this.socket && msg.length <= 2000) {
      this.socket.emit('message', { id: user, content: msg, channel: this.channel });
    }
  }
}

export default Websocket;
