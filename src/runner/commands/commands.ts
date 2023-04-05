import { Command } from "../../utils/index.d";
import call from "./call";
import compare from "./compare";
import removeVariable from "./remove";
import exit from "./exit";
import _function from "./function";
import _if from "./if";
import calculate from "./math/calculate";
import cos from "./math/cos";
import pi from "./math/pi";
import rand from "./math/rand";
import round from "./math/round";
import sin from "./math/sin";
import sqrt from "./math/sqrt";
import tan from "./math/tan";
import print from "./print";
import prompt from "./prompt";
import set from "./set";
import repeat from "./repeat";
import read from "./read";
import clear from "./clear";
import delay from "./delay";
import write from "./write";
import append from "./append";
import create from "./create";
import _import from "./import";
import _export from "./export";
import loadString from "./loadstring";
import length from "./length";
import array from "./array";
import concat from "./concat";
import get from "./get";
import object from "./object";
import fetch from "./fetch";
import post from "./post";
import roomExists from "./bot-api/roomExists";
import _login from "./bot-api/login";
import _getRooms from "./bot-api/getRooms";
import signout from "./bot-api/signout";
import _getPublicRooms from "./bot-api/getPublicRooms";
import _deleteMessage from "./bot-api/deleteMessage";
import _followUser from "./bot-api/followUser";
import _getMessages from "./bot-api/getMessages";
import _joinRoom from "./bot-api/joinRoom";
import _removeRoom from "./bot-api/removeRoom";
import _reportRoom from "./bot-api/reportRoom";
import _sendMessage from "./bot-api/sendMessage";
import _unfollowUser from "./bot-api/unfollowUser";
import onMessage from "./bot-api/onMessage";
import deleteFile from "./delete";

namespace Commands {
  export const commands: Array<Command> = [
    // IO commands:
    { name: "print", method: print },
    { name: "prompt", method: prompt },
    { name: "clear", method: clear },

    // Variable and function operators:
    { name: "set", method: set },
    { name: "remove", method: removeVariable },
    { name: "call", method: call },
    { name: "compare", method: compare },
    { name: "function", method: _function },
    { name: "if", method: _if },
    { name: "exit", method: exit },
    { name: "repeat", method: repeat },
    { name: "delay", method: delay },
    { name: "length", method: length },
    { name: "concat", method: concat },
    { name: "get", method: get },
    { name: "array", method: array },
    { name: "object", method: object },

    // External code loading handlers:
    { name: "import", method: _import },
    { name: "export", method: _export },
    { name: "load_string", method: loadString },

    // Maths utilities:
    { name: "sin", method: sin },
    { name: "calculate", method: calculate },
    { name: "cos", method: cos },
    { name: "rand", method: rand },
    { name: "sqrt", method: sqrt },
    { name: "tan", method: tan },
    { name: "round", method: round },
    { name: "pi", method: pi },

    // File system handler:
    { name: "read", method: read },
    { name: "write", method: write },
    { name: "append", method: append },
    { name: "create", method: create },
    { name: "delete", method: deleteFile },

    // Network handler:
    { name: "fetch", method: fetch },
    { name: "post", method: post },

    // Bot functions:
    { name: "room_exists", method: roomExists },
    { name: "login", method: _login },
    { name: "signout", method: signout },
    { name: "get_public_rooms", method: _getPublicRooms },
    { name: "delete_message", method: _deleteMessage },
    { name: "follow", method: _followUser },
    { name: "get_messages", method: _getMessages },
    { name: "get_rooms", method: _getRooms },
    { name: "join", method: _joinRoom },
    { name: "remove", method: _removeRoom },
    { name: "report", method: _reportRoom },
    { name: "send", method: _sendMessage },
    { name: "unfollow", method: _unfollowUser },
    { name: "on_message", method: onMessage },
  ];
}

export default Commands;
