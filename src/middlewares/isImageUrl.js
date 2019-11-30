import Response from '../helpers/Response';

const isImage = (req, res, next) => {
  const { imageURL } = req.body;
  const extension = imageURL.substring(
    imageURL.lastIndexOf('.') + 1
  ).toLowerCase();
  if (extension === 'gif' || extension === 'png' || extension === 'bmp'
    || extension === 'jpeg' || extension === 'jpg') {
    next();
  } else {
    return Response.errorMessage(req, res, 'Invalid image url', 400);
  }
};

export default isImage;
