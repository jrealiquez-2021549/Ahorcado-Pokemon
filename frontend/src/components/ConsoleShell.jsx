export default function ConsoleShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video de fondo (mismo asset del proyecto original) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/bg/background.mp4" type="video/mp4" />
      </video>

      {/* Marco de Poké Ball (imagen original), superpuesto sobre el video */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg/pokeball-frame.png')" }}
        aria-hidden="true"
      />

      {/* Contenido del juego, centrado sobre el fondo */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
