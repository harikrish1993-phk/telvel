/**
 * Logo — uses the actual TELVEL IT Solutions logo.
 * The image is in /public/logo.jpeg
 */
export default function Logo({ color = 'dark', size = 'default' }) {
  const heights = { sm: 'h-8', default: 'h-10', lg: 'h-12' };
  const isDark = color === 'dark';

  return (
    <div className={`flex items-center ${!isDark ? 'brightness-0 invert' : ''}`}>
      <img
        src="/logo.jpeg"
        alt="TELVEL IT Solutions Pvt. Ltd."
        className={`${heights[size]} w-auto object-contain`}
      />
    </div>
  );
}
