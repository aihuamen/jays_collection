interface IOGLink {
  page?: string;
  title: string;
  description: string;
}

const OGLink: React.FC<IOGLink> = ({ page = '', title, description }) => {
  const url = `https://jays-collection.vercel.app${page}`;
  return (
    <>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content="https://jays-collection.vercel.app/icons/android-icon-192x192.png"
      />
    </>
  );
};

export default OGLink;
