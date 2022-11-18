import {SOCKET, SocketAction} from "../types/socketType";


const SocketReducer = (state: any = null, action: SocketAction): any => {
    switch (action.type) {
        case SOCKET:
            return action.payload
        default:
            return  state
    }
}
export default SocketReducer