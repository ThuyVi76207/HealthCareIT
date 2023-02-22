
const getUrlDynamic = (roleId) => {
    let userUrl;

    if (roleId && roleId === 'R1') {
        userUrl = 'admin';
    } else if (roleId && roleId === 'R2') {
        userUrl = 'doctor';
    } else {
        userUrl = 'healthstaff';
    }
    return userUrl;
}

export {
    getUrlDynamic,
}