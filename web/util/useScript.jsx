import { useEffect, useState } from "react";

let cachedScripts = new Map();
export const useScript = (src) => {
  const [state, setState] = useState({
    loaded: false,
    error: false,
  });
  useEffect(() => {
    const onScriptLoad = () => {
      setState({
        loaded: true,
        error: false,
      });
    };
    const onScriptError = () => {
      // Remove from cachedScripts we can try loading again
      cachedScripts.delete(src);
      setState({
        loaded: true,
        error: true,
      });
    };
    let scriptNode;
    if (cachedScripts.has(src)) {
      scriptNode = cachedScripts.get(src);
    } else {
      let newScript = document.createElement("script");
      newScript.src = src;
      newScript.async = true;
      document.body.appendChild(newScript);
      cachedScripts.set(src, newScript);
      scriptNode = newScript;
    }
    scriptNode.addEventListener("load", onScriptLoad);
    scriptNode.addEventListener("error", onScriptError);
    // Remove event listeners on cleanup
    return () => {
      scriptNode.removeEventListener("load", onScriptLoad);
      scriptNode.removeEventListener("error", onScriptError);
    };
  }, [src]);
  return [state.loaded, state.error];
};
