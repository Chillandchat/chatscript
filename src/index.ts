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

    await getUser(username)
      .then((data: AuthType | {}): void => {
        // @ts-ignore
        if (Object.keys(data).length !== 0 && data?.bot) this.userInfo = data;
        else throw new Error("Error: Invalid user.");
      })
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public signOut(): void {
    this.authenticated = false;
  }

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

  public async deleteMessage(id: string, room: string): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    await deleteMessage(id, room)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

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

  public async getMessages(room: string): Promise<Array<MessageType>> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

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

  public async removeRoom(room: string): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    // @ts-ignore
    await removeRoom(room, this.userInfo?.username)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async reportRoom(room: string): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    // @ts-ignore
    await reportRoom(room)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

  public async sendMessage(message: MessageType): Promise<void> {
    if (!this.authenticated)
      throw new Error(
        "Error: Not authenticated, please authenticate using the login method first."
      );

    await sendMessage(message)
      .then((): void => {})
      .catch((err: unknown): void => {
        throw new Error(`${err}`);
      });
  }

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
}

export default ChillAndChatBotInstance;
