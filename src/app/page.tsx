import dynamic from "next/dynamic";

const Calculator = dynamic(() => import("./calculator"), { ssr: !!false });

export default function Page() {
  return <Calculator />;
}
