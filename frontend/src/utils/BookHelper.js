export const createBook = (volume) => {
  const id = volume.id;
  const image = volume.volumeInfo.imageLinks.thumbnail;
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
  try {
    volume.volumeInfo.authors.forEach((author) => {
      authorString = authorString + " " + author;
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
  };
  return book;
};
