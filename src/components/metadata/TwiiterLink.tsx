interface ITwitterLink {
  page?: string;
  title: string;
  description: string;
}

const TwitterLink: React.FC<ITwitterLink> = ({
  page = '',
  title,
  description,
}) => {
  const url = `https://jays-collection.vercel.app${page}`;
  return (
    <>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://jays-collection.vercel.app/icons/android-icon-192x192.png"
      />
      <meta name="twitter:creator" content="@YamaWantPUC" />
    </>
  );
};

export default TwitterLink;
