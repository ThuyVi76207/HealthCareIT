
const getUrlDynamic = (roleId) => {
    let userUrl;

    if (roleId && roleId === 'R1') {
        userUrl = 'admin';
    } else if (roleId && roleId === 'R2') {
        userUrl = 'doctor';
    } else if (roleId && roleId === 'R4') {
        userUrl = 'healthstaff';
    } else {
        userUrl = 'user'
    }
    return userUrl;
}

export {
    getUrlDynamic,
}