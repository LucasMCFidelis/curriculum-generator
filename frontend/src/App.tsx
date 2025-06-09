import Layout from "@/components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";

function App() {
  return (
    <>
      <ModalProvider>
        <AuthProvider>
          <Layout>
            <h1>Teste</h1>
          </Layout>
        </AuthProvider>
      </ModalProvider>
    </>
  );
}

export default App;
