import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import io, { Socket } from "socket.io-client";

import { AuthType, MessageType, RoomType } from "./script";
import createRoom from "./script/createRoom";
import deleteMessage from "./script/deleteMessage";
import followUser from "./script/followUser";
import getMessages from "./script/getMessages";
import getRooms from "./script/getRooms";
import getUser from "./script/getUser";
import joinRoom from "./script/joinRoom";
import login from "./script/login";
import removeRoom from "./script/removeRoom";
import reportRoom from "./script/reportRoom";
import sendMessage from "./script/sendMessage";
import unfollowUser from "./script/unfollowUser";
import updateDescription from "./script/updateDescription";

dotenv.config();

class ChillAndChatBotInstance {
  private authenticated: boolean = false;
  private userInfo: AuthType | undefined;
  private socket: Socket = io(process.env.SOCKET_URL);

  public rooms: Array<string> = [];

  /**
   * This is the rooms exists function this function will return a boolean value, if the room exists.
   *
   * @param {string} room The room to search
   */

  public roomExists(room: string): boolean {
    return this.rooms.includes(room);
  }

  /**
   * This is the login function, this function will authenticate the bot,
   *
   * @param {string} username The username of the bot.
   * @param {string} passcode The passcode of the bot.
   * @note Remember it must be unencrypted password!!
   */

  public async login(username: string, passcode: string): Promise<void> {
    if (this.authenticated) throw new Error("Error: Already authenticated.");

    await login(username, passcode)
      .then((): void => {
        this.authenticated = true;
      })
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });

    if (!this.authenticated) return;

    await this.getUser(username)
      .then((data: AuthType | {}): void => {
        // @ts-ignore
        if (Object.keys(data).length !== 0 && data?.bot) this.userInfo = data;
        else throw new Error("Error: Invalid user.");
      })
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });

    await this.getRooms()
      .then((rooms: Array<RoomType>): void => {
        rooms.forEach((room: RoomType): void => {
          this.rooms.push(room.id);
        });
      })
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  /**
   * This is the signout function, this function will sign out and terminate the bot.
   */

  public signOut(): void {
    this.authenticated = false;
    this.socket.disconnect();

    process.exit(0);
  }

  /**
   * This is the create room function, this function will create a room.
   *
   * @param {string} name The name of the room.
   * @param {string} password The password of the room.
   * @note Remember it must be unencrypted password!!
   */

  public async createRoom(name: string, password: string): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    await createRoom(name, password, this.userInfo?.username as string)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  /**
   * This is the delete message function, as the name suggests this function will delete a message.
   *
   * @param {string} id The id of the message being deleted.
   * @param {string} room The room of the message being deleted.
   */

  public async deleteMessage(id: string, room: string): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    if (!this.roomExists(room)) throw new Error("Error: Invalid room.");

    await deleteMessage(id, room)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  /**
   * This is the follow user, this function will follow a user. Hence the name.
   *
   * @param {string} targetUser The user to follow.
   */

  public async followUser(targetUser: string): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    await followUser(targetUser, this.userInfo?.username as string)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  /**
   * This is the get message function this function will return all the messages from a room.
   *
   * @param {string} room The room to fetch messages from.
   */

  public async getMessages(room: string): Promise<Array<MessageType>> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    if (!this.roomExists(room)) throw new Error("Error: Invalid room.");

    let messageList: Array<MessageType>;

    await getMessages(room)
      .then((messages: Array<MessageType>): void => {
        messageList = messages;
      })
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });

    return messageList;
  }

  /**
   * This is the get rooms function this function will return all rooms that the bot belongs in.
   */

  public async getRooms(): Promise<Array<RoomType>> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    let roomList: Array<RoomType>;

    // @ts-ignore
    await getRooms(this.userInfo?.username)
      .then((rooms: Array<RoomType>): void => {
        roomList = rooms;
      })
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });

    return roomList;
  }

  /**
   * This is the get user function, this function will fetch the user info from the server.
   *
   * @param {string} user The username of the user to search/fetch information.
   */

  public async getUser(user: string): Promise<AuthType | {}> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    let userInfoReturnValue: AuthType | {};
    await getUser(user)
      .then((userInfo: AuthType | {}): void => {
        userInfoReturnValue = userInfo;
      })
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });

    return userInfoReturnValue;
  }

  /**
   * This is the join room function, this function will add the bot to a room.
   *
   * @param {string} roomId The id of the room.
   * @param {string} roomPassword The password of the
   */

  public async joinRoom(roomId: string, roomPassword: string): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    // @ts-ignore
    await joinRoom(this.userInfo?.username, roomId, roomPassword)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  /**
   * This is the remove room function, this function remove a room from the bot's room list.
   *
   * @param {string} room The room to leave/remove.
   */

  public async removeRoom(room: string): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    if (!this.roomExists(room)) throw new Error("Error: Invalid room.");

    // @ts-ignore
    await removeRoom(room, this.userInfo?.username)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  /**
   * This is the report room function, this function will report a room by logging this report to the Chill&chat team.
   *
   * @param {string} room The room to report.
   */

  public async reportRoom(room: string): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    if (!this.roomExists(room)) throw new Error("Error: Invalid room.");

    // @ts-ignore
    await reportRoom(room)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  /**
   * This is the send message function, this message sends a message in the selected room. Hence the name.
   *
   * @param {string} content The content/text of the message.
   * @param {string} room The room to send the message in.
   */

  public async sendMessage(content: string, room: string): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    if (!this.roomExists(room)) throw new Error("Error: Invalid room.");

    const message: MessageType = {
      id: uuid(),
      user: this.userInfo?.username,
      content: content,
      room: room,
    };

    await sendMessage(message)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  /**
   * This is the unfollow user function. This function will unfollow a user.
   *
   * @param {string} user The user to unfollow.
   */

  public async unfollowUser(user: string): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    // @ts-ignore
    await unfollowUser(user, this.userInfo?.username)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  /**
   * This is the update description function, this function will update the bot's description in the remote server.
   *
   * @param {string} description The new description.
   */

  public async updateDescription(description: string): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    // @ts-ignore
    await updateDescription(this.userInfo?.username, description)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  /**
   * This is the on message function, this function acts as a event caller/listener thing.
   *
   * @param {string} room The room to listen for.
   * @param {(message:MessageType) => void} event The function to run when a message is sent.
   */

  public async onMessage(
    room: string,
    event: (message: MessageType) => void
  ): Promise<void> {
    if (!this.roomExists(room)) throw new Error("Error: Invalid room.");

    this.socket.on(
      `client-message:room(${room})`,
      (messageResponse: MessageType): void => {
        event(messageResponse);
      }
    );
  }
}

export default ChillAndChatBotInstance;
