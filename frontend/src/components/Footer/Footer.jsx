import "./Footer.css";

const currentYear = () => {
  const d = new Date();
  return d.getFullYear();
};

const Footer = () => {
  return (
    <footer>
      <p>Copyright © 2022 - {currentYear()}</p>{" "}
    </footer>
  );
};

export default Footer;
