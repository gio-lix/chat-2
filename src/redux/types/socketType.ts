import {Socket} from "socket.io-client";

export const SOCKET = "SOCKET"

export interface SocketAction {
    type: typeof SOCKET
    payload: Socket
}