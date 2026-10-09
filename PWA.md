# PWA deployment

Serve this directory as the site's root or as a subdirectory. The manifest, icon, stylesheet, script, and Service Worker URLs are relative to this directory; no hosting base path is assumed.

Service Workers and install prompts require HTTPS, except on `localhost` and other browser-defined secure contexts. Opening `index.html` with `file://` still runs the game, but cannot register the Service Worker or install the PWA. Browser support and install UI vary; some browsers expose installation through their own menu instead of a prompt.

The Service Worker precaches the app shell, then caches same-origin game assets after their first successful request. It checks the network first for the app shell and uses cached resources when offline. When changing the cache policy or shell resources, increment `CACHE_NAME` in `sw.js` so the previous cache is replaced on activation.

The 192 px and 512 px square icons are resized from the existing Nekopin Games PNG. The same 192 px icon is linked for iOS home-screen shortcuts.