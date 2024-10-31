export function setToStorage(propLabel, data) {
    const name = `${process.env.REACT_APP_WEBSITE_NAME} - ${propLabel}`;
    const elabData = JSON.stringify(data);

    sessionStorage.setItem(name, elabData);
}

export function getFromStorage(propLabel) {
    const name = `${process.env.REACT_APP_WEBSITE_NAME} - ${propLabel}`;

    return JSON.parse(sessionStorage.getItem(name));
}
