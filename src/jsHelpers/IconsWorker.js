export default class IconsWorker {
  assetLink = '../assets/icons';

  getBlackIcon = function (iconName) {
    const assetLink = `../../assets/icons/b/${iconName}.png`;
    alert(assetLink);
    /* eslint-disable global-require */
    // eslint-disable-next-line import/no-dynamic-require
    return require(assetLink);
  }
}
