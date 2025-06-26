import { Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <div>
          Desenvolvido por
          <Button asChild variant={"link"} className="px-2">
            <a
              href="https://portfolio-lucasfidelis.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Lucas Fidelis</strong>
            </a>
          </Button>
        </div>
        <div>
          Código do projeto disponível
          <Button asChild variant={"link"} className="px-2">
            <a
              href="https://github.com/LucasMCFidelis/curriculum-generator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>aqui</strong>
            </a>
          </Button>
        </div>
      </div>
      <div className="space-x-2">
        <Button asChild variant={"outline"} size={"icon"}>
          <a
            href="https://www.linkedin.com/in/lucas-fidelis-778705149/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin></Linkedin>
          </a>
        </Button>
        <Button asChild variant={"outline"} size={"icon"}>
          <a
            href="https://github.com/LucasMCFidelis"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github></Github>
          </a>
        </Button>
      </div>
    </footer>
  );
}

export default Footer;
