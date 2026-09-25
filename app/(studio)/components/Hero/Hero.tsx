import { Headline } from "./Headline";
import "./hero.css";

export function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hl">
      <div className="eyebrow mono"><span className="dot" aria-hidden="true"></span>Web design &amp; development studio</div>
      <Headline id="hl" text="Websites worth talking about." />
      <div className="hero-foot">
        <p>We design and build internet-native websites for startups, apps, and creators launching something new. <span>Made by the people behind Esc8pe, a media page with 60M+ monthly views.</span></p>
        <div>
          <div className="cta-row">
            <a className="pill solid" href="#apply">Apply for a project <span aria-hidden="true">→</span></a>
            <a className="pill ghost" href="#work">See the work</a>
          </div>
          <div className="esc-hint mono">Press <kbd>Esc</kbd> to see how this page is built</div>
        </div>
      </div>
    </section>
  );
}
