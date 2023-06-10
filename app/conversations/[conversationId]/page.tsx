// import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";

import Header from "./components/Header";
import Body from "./components/Body";
import FormChat from "./components/FormChat";
import EmptyState from "@/app/components/EmptyState";
import getConversationById from "@/app/actions/getConvervasationById";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return ( 
    <div className="lg:pl-80 h-full flex flex-col">
      <div className=" flex flex-col h-full">
        <Header conversation={conversation} />
        <Body initialMessages={messages}/>
        <FormChat />
        
      </div>
    </div>
  );
}

export default ChatId;