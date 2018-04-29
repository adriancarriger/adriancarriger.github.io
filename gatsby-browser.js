exports.shouldUpdateScroll = ({ pathname }) => {
  return pathname !== '/' && !pathname.split('/')[1].includes('blog');
};
