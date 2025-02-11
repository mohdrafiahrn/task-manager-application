
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { ThemeProviderWrapper } from "@/context/ThemeContext";


export default function Home() {
  return (
    <ThemeProviderWrapper>
      <div>
        <Header />
        
      
        
        <TaskList />
      </div>
    </ThemeProviderWrapper>
  );
}
