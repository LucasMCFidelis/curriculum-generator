import { Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

function Footer() {
  return (
    <footer className="flex justify-between items-end ">
      <div>
        <div>
          Desenvolvido por
          <a
            href="https://portfolio-lucasfidelis.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant={"link"} className="px-2">
              <strong>Lucas Fidelis</strong>
            </Button>
          </a>
        </div>
        <div>
          Código do projeto disponível
          <Button variant={"link"} className="px-2">
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
        <a
          href="https://www.linkedin.com/in/lucas-fidelis-778705149/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant={"outline"} size={"icon"}>
            <Linkedin></Linkedin>
          </Button>
        </a>
        <a
          href="https://github.com/LucasMCFidelis"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant={"outline"} size={"icon"}>
            <Github></Github>
          </Button>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
