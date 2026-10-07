import { HeroClient } from "./hero-client";

/** Server wrapper: all motion lives in HeroClient. */
export default function Hero() {
  return <HeroClient />;
}
