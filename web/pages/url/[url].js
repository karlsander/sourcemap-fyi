/** @jsx jsx */
import { jsx } from "@theme-ui/core";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { explore } from "source-map-explorer";
import { useScript } from "web/util/useScript";

export async function getServerSideProps({ params }) {
  try {
    const code = await fetch(params.url).then((r) => r.text());
    const map = await fetch(params.url + ".map").then((r) => r.text());

    const bundles = [{ code: Buffer.from(code), map: Buffer.from(map) }];

    const data = await explore(bundles, { output: { format: "treemap" } });

    return {
      props: { treemap: data.output },
    };
  } catch (e) {
    console.log("got error", e);
    return {
      props: {},
    };
  }
}

function URLPage({ treemap }) {
  const router = useRouter();
  const { url } = router.query;

  const [loaded, error] = useScript("/webtreemap.js");
  useEffect(() => {
    if (loaded) {
      const container = document.getElementById("mapTarget");
      // @ts-ignore
      appendTreemap(container, JSON.parse(treemap)["0"].data);
    }
  }, [loaded, treemap]);

  return (
    <div>
      <h1>Bundle for {url}</h1>
      <div id="mapTarget" sx={{ width: "100vw", height: "80vh" }} />
    </div>
  );
}

export default URLPage;
