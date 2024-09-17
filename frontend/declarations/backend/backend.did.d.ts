import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Message {
  'content' : string,
  'role' : string,
  'timestamp' : bigint,
}
export interface VoiceCommand { 'action' : string, 'command' : string }
export interface _SERVICE {
  'addMessage' : ActorMethod<[string, string], undefined>,
  'addVoiceCommand' : ActorMethod<[string, string], undefined>,
  'getConversationHistory' : ActorMethod<[], Array<Message>>,
  'getUseTTS' : ActorMethod<[], boolean>,
  'getVoiceCommands' : ActorMethod<[], Array<VoiceCommand>>,
  'isTTSEnabled' : ActorMethod<[], boolean>,
  'resetConversation' : ActorMethod<[], undefined>,
  'saveChat' : ActorMethod<[], string>,
  'setTTSEnabled' : ActorMethod<[boolean], undefined>,
  'setUseTTS' : ActorMethod<[boolean], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
