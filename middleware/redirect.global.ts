import redirects from "../public/redirects.json";

export default function (to: any, from: any): any {
  const redirect = redirects.find((r) => r.link === to.path);
  if (redirect) {
    return navigateTo(redirect.redirect, { redirectCode: 301 });
  }
}
