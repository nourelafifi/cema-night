/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      // TMDB Media CDN (for actor face headshots)
      {
        protocol: 'https',
        hostname: 'media.themoviedb.org',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      // Amazon / IMDb Poster CDN
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      // YouTube Thumbnails (if displaying trailer previews)
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
};

if (process.env.NODE_ENV !== "production") {
  import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev();
  });
}

export default nextConfig;