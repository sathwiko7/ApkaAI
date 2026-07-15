import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import UploadSection from "../components/UploadSection";
import ChatBox from "../components/ChatBox";
import TicketClassifier from "../components/TicketClassifier";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <UploadSection />
      <ChatBox />
      <TicketClassifier />
      <Dashboard />
      <Footer />
    </>
  );
}

export default Home;