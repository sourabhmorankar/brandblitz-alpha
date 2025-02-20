import ChatContainer from "@/components/ChatContainer";
import I18nProvider from "@/components/I18nProvider";

export default function Home() {
  return (
    <I18nProvider>
      <ChatContainer />
    </I18nProvider>
  );
}