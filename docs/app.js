const button = document.getElementById('downloadButton');
// A working direct link remains available if GitHub's API is unavailable.
(async () => {
  try {
    const response = await fetch('https://api.github.com/repos/iminger23-ship-it/server-wizzard-releases/releases/latest', {signal: AbortSignal.timeout(8000)});
    if (!response.ok) return;
    const release = await response.json();
    const asset = release.assets?.find(item => /^Server-Wizzard-[\d.]+-Setup\.exe$/.test(item.name));
    if (!asset || release.draft || release.prerelease) return;
    const url = new URL(asset.browser_download_url);
    if (url.origin !== 'https://github.com' || !url.pathname.startsWith('/iminger23-ship-it/server-wizzard-releases/releases/download/')) return;
    button.href = url.href;
    document.querySelectorAll('.version').forEach(item => item.textContent = release.tag_name);
    document.getElementById('downloadStatus').textContent = `Windows x64 · EXE installer · ${release.tag_name} · ${Math.round(asset.size / 1024 / 1024)} MB`;
  } catch { /* The direct installer link still works. */ }
})();