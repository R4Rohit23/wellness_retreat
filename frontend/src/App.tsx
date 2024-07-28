import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Retreats from "./pages/Retreats";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Retreats />
			<Toaster />
		</QueryClientProvider>
	);
}

export default App;
