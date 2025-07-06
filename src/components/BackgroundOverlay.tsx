import background from '../assets/background1.jpg';

export default function BackgroundOverlay() {
  return (
    <div
      className="absolute inset-0 z-0 w-full h-full bg-black/70"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
}
