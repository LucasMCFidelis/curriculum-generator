import Layout from "@/components/Layout";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Layout>
          <h1>Teste</h1>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default App;
