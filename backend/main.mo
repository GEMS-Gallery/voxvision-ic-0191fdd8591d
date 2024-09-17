import Bool "mo:base/Bool";
import Func "mo:base/Func";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";

actor {
  // Types
  type VoiceCommand = {
    command: Text;
    action: Text;
  };

  type Message = {
    role: Text;
    content: Text;
    timestamp: Int;
  };

  // Stable variables
  stable var voiceCommands : [VoiceCommand] = [
    { command = "exit voice mode"; action = "exit_voice_mode" },
    { command = "save chat"; action = "save_chat" },
    { command = "reset conversation"; action = "reset_conversation" }
  ];

  stable var conversationHistory : [Message] = [];
  stable var ttsEnabled : Bool = true;
  stable var useTTS : Bool = false;

  // Environment variables (replace with actual values)
  let CLAUDE_API_KEY : Text = "YOUR_CLAUDE_API_KEY";
  let CLAUDE_API_URL : Text = "https://api.anthropic.com/v1/messages";

  // Functions
  public func addVoiceCommand(command: Text, action: Text) : async () {
    voiceCommands := Array.append(voiceCommands, [{ command = command; action = action }]);
  };

  public query func getVoiceCommands() : async [VoiceCommand] {
    voiceCommands
  };

  public func addMessage(role: Text, content: Text) : async () {
    let newMessage : Message = {
      role = role;
      content = content;
      timestamp = Time.now();
    };
    conversationHistory := Array.append(conversationHistory, [newMessage]);
  };

  public query func getConversationHistory() : async [Message] {
    conversationHistory
  };

  public func resetConversation() : async () {
    conversationHistory := [];
  };

  public func setTTSEnabled(enabled: Bool) : async () {
    ttsEnabled := enabled;
  };

  public query func isTTSEnabled() : async Bool {
    ttsEnabled
  };

  public func setUseTTS(use: Bool) : async () {
    useTTS := use;
  };

  public query func getUseTTS() : async Bool {
    useTTS
  };

  // Helper function to convert conversation history to markdown format
  public func saveChat() : async Text {
    var markdown = "# Claude-3-Sonnet Engineer Chat Log\n\n";
    for (message in conversationHistory.vals()) {
      let roleTitle = if (message.role == "user") "## User" else "## Claude";
      markdown #= roleTitle # "\n\n" # message.content # "\n\n";
    };
    markdown
  };

  // New function to chat with Claude
  public func chatWithClaude(message: Text) : async Text {
    // Note: This is a placeholder implementation as we can't make HTTP requests directly from Motoko
    // In a real implementation, you would need to use the Internet Computer's HTTP outcalls feature
    // or an intermediary canister that can make HTTP requests

    Debug.print("Simulating chat with Claude: " # message);

    // Simulate a response
    let simulatedResponse = "This is a simulated response from Claude. Your message was: " # message;

    // Add the simulated interaction to the conversation history
    ignore addMessage("user", message);
    ignore addMessage("assistant", simulatedResponse);

    simulatedResponse
  };

  // System functions
  system func preupgrade() {
    // The stable variables will automatically persist
    Debug.print("Preparing to upgrade. Stable variables will persist.");
  };

  system func postupgrade() {
    Debug.print("Upgrade complete. Stable variables have been restored.");
  };
}
