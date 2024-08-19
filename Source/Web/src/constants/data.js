

// calls.status
export const CALL_STATUS_CATCH = 0; // call accepted
export const CALL_STATUS_STOP = 1; // guest stops call
export const CALL_STATUS_NO_REPLY = 2; // no reply. host in rooms
export const CALL_STATUS_NO_ONE_AVAILABLE = 3; // no reply. no host in rooms
export const CALL_STATUS_FINISHED = 4; // call finished


// roomChangeLogs.newValue.status, roomChangeLogs.prevValue.status
export const ROOM_OFFLINE = 0; // offline , no new call
export const ROOM_ONLINE = 1; // online, accept new call
export const ROOM_AFK = 2; // away from keyboard, no new call
export const ROOM_CALLING = 3; // recieving call request, no new call
export const ROOM_TALKING = 4; // talking, no new call
export const ROOM_MEMO_EDIT = 5; // editting memo, no new call
export const ROOM_MEETING = 6; // meeting, no new call
export const ROOM_SUPPORT = 7; // supporting, no new call
export const ROOM_APPOINTMENT = 8; // waiting appointment call, only accept appointment call

// languages
export const ENGLISH = 'english';
export const CHINESE = 'chinese';
export const KOREAN = 'korean';
export const SPAIN = 'spain';
export const PORTUGAL = 'portugal';
