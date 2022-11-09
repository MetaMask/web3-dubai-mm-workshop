import { Hello__factory } from "blockchain";

export default function Web() {
  const helloContract = new Hello__factory();
  return (
    <div>
      <h1>Web</h1>
    </div>
  );
}
