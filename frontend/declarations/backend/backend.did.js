export const idlFactory = ({ IDL }) => {
  const Message = IDL.Record({
    'content' : IDL.Text,
    'role' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  const VoiceCommand = IDL.Record({
    'action' : IDL.Text,
    'command' : IDL.Text,
  });
  return IDL.Service({
    'addMessage' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'addVoiceCommand' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'getConversationHistory' : IDL.Func([], [IDL.Vec(Message)], ['query']),
    'getUseTTS' : IDL.Func([], [IDL.Bool], ['query']),
    'getVoiceCommands' : IDL.Func([], [IDL.Vec(VoiceCommand)], ['query']),
    'isTTSEnabled' : IDL.Func([], [IDL.Bool], ['query']),
    'resetConversation' : IDL.Func([], [], []),
    'saveChat' : IDL.Func([], [IDL.Text], []),
    'setTTSEnabled' : IDL.Func([IDL.Bool], [], []),
    'setUseTTS' : IDL.Func([IDL.Bool], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
