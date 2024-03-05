const generateImageUrl = (path: string): string => {
  const urlPattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})(\/\S*)?$/i;
  if (urlPattern.test(path)) {
    return path;
  } else {
    return `${
      process.env.NEXT_PUBLIC_BASE_URL?.slice(0, -1) ??
      "https://intalent.rixotech.com/api/v1"
    }${path?.startsWith(".") ? path?.substring(1) : path}`;
  }
};

export default generateImageUrl;
