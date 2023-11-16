"use client";

import { useState } from "react";
import { ChatWindow } from "@/components/ChatWindow";
import ChooseModel from "@/components/ChooseModel";

export default function Home() {

  const [model, setModel] = useState('');

  if(model === '') {
    return (
      <ChooseModel setModel={setModel} />
    );
  }


  return (
    <ChatWindow
      model={model}
      emoji="🏠"
      titleText="Fully Client-Side Chat"
      placeholder="Try asking something about the document you just uploaded!"
    ></ChatWindow>
  );
}
