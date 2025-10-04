// Déclarations pour CSS/SCSS globaux (imports sans bindings)
declare module "*.css";
declare module "*.scss";

// Déclaration pour CSS Modules (ex: styles.module.scss)
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}
