import { Github, Linkedin, Dribbble, Mail } from "lucide-react";
import DaisyMark from "@/components/ui/DaisyMark";
import { ADDRESS } from "@/data/villa";
import styles from "./Footer.module.scss";

const SOCIALS = [
  { href: "https://github.com/arthurelmalawi", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/arthur-el-malawi/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.behance.net/arthurelmalawi", label: "Behance", Icon: Dribbble },
  { href: "mailto:elmalawia@gmail.com", label: "E-mail", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <DaisyMark size={64} />
          <p className="display">
            Villa <em>Marguerite</em>
          </p>
        </div>
        <address>
          {ADDRESS.street}
          <br />
          {ADDRESS.city}
        </address>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {new Date().getFullYear()} Villa Marguerite · Site conçu et développé par Arthur El Malawi
        </p>
        <ul>
          {SOCIALS.map(({ href, label, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
