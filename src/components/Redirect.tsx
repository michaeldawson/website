export default function Redirect({ url }) {
  window.location.href = url;
  return null;
}
