import { sendMessage } from '../config/sms-gateway';

function sendMessageToUser(mobileNumber: string, message: string) {
  return sendMessage({ mobileNumber, message });
}

export { sendMessageToUser };
