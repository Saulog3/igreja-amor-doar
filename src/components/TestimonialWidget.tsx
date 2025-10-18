import { useEffect } from "react";

const ELFSIGHT_SRC = "https://elfsightcdn.com/platform.js";

export default function TestimonialWidget() {
  useEffect(() => {
    // Load Elfsight script once
    if (typeof window === "undefined") return;

    const existing = document.querySelector(
      `script[src="${ELFSIGHT_SRC}"]`
    ) as HTMLScriptElement | null;

    if (!existing) {
      const script = document.createElement("script");
      script.src = ELFSIGHT_SRC;
      script.async = true;
      // give it an id so it's easier to detect in DOM
      script.id = "elfsight-platform-script";
      document.body.appendChild(script);
    }

    // No cleanup - Elfsight script can remain for entire app lifecycle
  }, []);

  // Replace the app id below with your Elfsight app id if different
  return (
    <div className="elfsight-app-9bb966d0-8b04-4b29-b93a-ac0cab54ec4c" data-elfsight-app-lazy></div>
  );
}
