import { Layout } from "@/components/Layout";
import { useModal } from "./contexts/ModalContext";
import { Button } from "./components/ui/button";
import { ClipboardSignature } from "lucide-react";
import { useAuth } from "./hooks/useAuth";
import imageHomeCV from "./assets/homeCV.svg";
import { BrowserRouter } from "react-router";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import "dayjs/locale/pt-br";
import { AppRoutes } from "./components/AppRoutes";

dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.locale("pt-br");

export function App() {
  const { openModal } = useModal();
  const { currentUser } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Layout>
          {currentUser ? (
            <>
              <div className="flex-1 space-y-2 md:space-y-8">
                <AppRoutes/>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col flex-1 justify-center items-center lg:flex-row-reverse lg:justify-between gap-5">
                <img src={imageHomeCV} className="size-9/12 lg:size-1/2" />
                <div className="flex flex-col gap-4 lg:size-2/5">
                  <h2>Gerencie seu currículo com facilidade</h2>
                  <p className="text-justify">
                    Cadastre-se agora para criar, atualizar e organizar seus
                    dados de forma simples e segura. Tenha controle total sobre
                    suas informações e personalize seu perfil sempre que quiser.
                  </p>
                  <Button
                    onClick={() => openModal("cadastreUser")}
                    className="w-full"
                  >
                    Cadastrar <ClipboardSignature />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Layout>
      </BrowserRouter>
    </>
  );
}
