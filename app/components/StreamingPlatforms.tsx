import { siApple, siDeezer, siPandora, siSpotify, type SimpleIcon } from "simple-icons";

type Platform = { name: string; href: string; icon?: SimpleIcon; monogram?: string };

const platforms: Platform[] = [
  { name: "Spotify", href: "https://open.spotify.com/artist/7zK9hcVbswawtVXa3lqEO9", icon: siSpotify },
  { name: "Apple Music", href: "https://music.apple.com/us/artist/taylon-james/6786917415", icon: siApple },
  { name: "Amazon Music", href: "https://music.amazon.com/artists/B0BKD9B1TK/taylon-james?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_WMbBWS9V6oZroBq9PshlsZnFT", monogram: "a" },
  { name: "Deezer", href: "https://www.deezer.com/us/artist/187737787", icon: siDeezer },
  { name: "Pandora", href: "https://www.pandora.com/artist/taylon-james/ARtjpqPPX3rnr5g", icon: siPandora },
];

export function StreamingPlatforms() {
  return (
    <div className="platform-panel" aria-label="Listen to Taylon James">
      <p className="platform-label">Listen on</p>
      <div className="platform-list">
        {platforms.map(({ name, href, icon, monogram }) => (
          <a key={name} className="platform-link" href={href} target="_blank" rel="noreferrer" aria-label={`Listen to Taylon James on ${name}`}>
            {icon ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg> : <b className="platform-monogram" aria-hidden="true">{monogram}</b>}
            <span>{name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
