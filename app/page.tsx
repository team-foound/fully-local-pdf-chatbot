import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  return (
    <ChatWindow
      emoji="🏠"
      titleText="Fully Client-Side Chat"
      placeholder="Try asking something about the document you just uploaded!"
    ></ChatWindow>
  );
}
