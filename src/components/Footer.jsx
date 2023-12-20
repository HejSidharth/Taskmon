import React from "react";

export default function Footer() {
  return (
    <footer className="footer footer-center p-4 text-base-content bottom-0 fixed backdrop:blur">
      <aside>
        <p className="bg-base-100">
          Made with ❤️ by{" "}
          <a href="https://hejamadi.com">
            <span className="font-bold hover:underline">Hejamadi</span>
          </a>
        </p>
      </aside>
    </footer>
  );
}
