import Layout from "@/components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <AuthProvider>
            <Layout>
              <h1>Teste</h1>
            </Layout>
          </AuthProvider>
        </ModalProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
