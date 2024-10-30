export function setPageTitle(partialTitle) {
    document.title = `${process.env.REACT_APP_WEBSITE_NAME} - ${partialTitle}`;
}
