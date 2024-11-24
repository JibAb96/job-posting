import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import The_Navbar from './components/Navbar/The_Navbar';
import Hero from './components/Hero/Hero';
import JobPostingSection from './components/JobPostingSection/JobPostingSection';
import { ShowModalProvider } from './context/ShowModal';
import CreateJobPostModal from './components/CreateJobPostModal/CreateJobPostModal';
const App = () => {
  return(
    <ShowModalProvider>
      <The_Navbar/>
      <Hero/>
      <JobPostingSection/>
      <CreateJobPostModal/>
    </ShowModalProvider>
  )
}

export default App;
