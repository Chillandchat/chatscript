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

class ChillAndChatBotInstance {
  private authenticated: boolean;
  private userInfo: AuthType | undefined;

  constructor() {
    this.authenticated = false;
  }

  public async login(username: string, passcode: string) {
    if (this.authenticated) throw new Error("Error: Already authenticated.");

    login(username, passcode)
      .then((): void => {
        getUser(username)
          .then((data: AuthType | {}): void => {
            // @ts-ignore
            if (Object.keys(data).length !== 0) this.userInfo = data;
            this.authenticated = true;
          })
          .catch((err: unknown): void => {
            throw new Error(`${err}`);
          });
      })
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public signOut() {
    this.authenticated = false;
  }

  public async createRoom(name: string, password: string) {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    createRoom(name, password, this.userInfo?.username as string)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async deleteMessage(id: string, room: string) {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    deleteMessage(id, room)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async followUser(targetUser: string) {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    followUser(targetUser, this.userInfo?.username as string)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async getMessages(room: string) {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    getMessages(room)
      .then((messages: Array<MessageType>): typeof messages => messages)
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async getRooms() {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    // @ts-ignore
    getRooms(this.userInfo?.username)
      .then((rooms: Array<RoomType>): typeof rooms => rooms)
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async getUser(user: string) {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    getUser(user)
      .then((userInfo: AuthType | {}): typeof userInfo => userInfo)
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async joinRoom(roomId: string, roomPassword: string) {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    // @ts-ignore
    joinRoom(this.userInfo?.username, roomId, roomPassword)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async removeRoom(room: string) {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    // @ts-ignore
    removeRoom(room, this.userInfo?.username)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async reportRoom(room: string) {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    // @ts-ignore
    reportRoom(room)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async sendMessage(message: MessageType) {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    sendMessage(message)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async unfollowUser(user: string) {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    // @ts-ignore
    unfollowUser(user, this.userInfo?.username)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async updateDescription(description: string) {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    // @ts-ignore
    updateDescription(this.userInfo?.username, description)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }
}

export default ChillAndChatBotInstance;
