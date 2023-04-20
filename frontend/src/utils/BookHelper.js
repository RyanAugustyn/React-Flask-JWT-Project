export const createBook = (volume) => {
  const id = volume.id;
  let image = null;
  try {
    image = volume.volumeInfo.imageLinks.thumbnail;
  } catch {}

  const title = volume.volumeInfo.title;
  let subTitle = "";
  try {
    subTitle = volume.volumeInfo.subTitle;
  } catch {}
  let pageCount = null;
  try {
    pageCount = volume.volumeInfo.pageCount;
  } catch {}
  let priceCurrency = null;
  let priceAmount = null;
  try {
    if (volume.saleInfo.saleability === "FOR_SALE") {
      if (volume.saleInfo.country === "US") {
        priceCurrency = "$";
        priceAmount = volume.saleInfo.listPrice.amount;
      }
    }
  } catch {}
  let authorString = "";
  let author_count = 0;
  try {
    volume.volumeInfo.authors.forEach((author) => {
      authorString = authorString + " " + author;
      author_count++;
    });
    authorString = authorString.trim();
  } catch {
    authorString = "";
  }
  const description = volume.volumeInfo.description;

  const book = {
    id: id,
    image: image,
    title: title,
    pageCount: pageCount,
    subTitle: subTitle,
    priceCurrency: priceCurrency,
    priceAmount: priceAmount,
    author: authorString,
    description: description,
    author_count: author_count,
  };
  return book;
};
