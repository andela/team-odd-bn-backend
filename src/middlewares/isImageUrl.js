import Customize from '../helpers/Customize';

const isImage = (req, res, next) => {
  const { imageURL } = req.body;
  const extension = imageURL.substring(
    imageURL.lastIndexOf('.') + 1
  ).toLowerCase();
  if (extension === 'gif' || extension === 'png' || extension === 'bmp'
    || extension === 'jpeg' || extension === 'jpg') {
    next();
  } else {
    return Customize.errorMessage(req, res, 'Invalid image url', 400);
  }
};

export default isImage;
