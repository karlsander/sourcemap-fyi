/** @jsx jsx */
import { jsx } from "@theme-ui/core";
import { useState } from "react";
import Link from "next/link";

function Index() {
  const [url, setURL] = useState("");
  return (
    <div sx={{ alignItems: "center" }}>
      <main sx={{ maxWidth: 500, p: 4 }}>
        <h1>Source Map</h1>
        <form>
          <label htmlFor="urlInput">JS File URL</label>
          <input
            value={url}
            onChange={({ target: { value } }) => setURL(value)}
            sx={{ minWidth: 240 }}
            id="urlInput"
          />
          <Link href={"/url/" + encodeURIComponent(url)}>
            <a
              href={"/url/" + encodeURIComponent(url)}
              sx={{
                bg: "rebeccapurple",
                my: 2,
                borderRadius: 8,
                textDecoration: "none",
                p: 2,
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Explore Sourcemap
            </a>
          </Link>
        </form>
      </main>
    </div>
  );
}

export default Index;
