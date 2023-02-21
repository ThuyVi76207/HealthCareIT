export const adminMenu = [
    { icon: 'grid-outline', name: 'menu.usermanager', link: '/manager/system-admin/usermanager' },
    { icon: 'fitness-outline', name: 'menu.doctormanager', link: '/manager/system-admin/doctormanager' },
    { icon: 'layers-outline', name: 'menu.specialtymanager', link: '/manager/system-admin/specialtymanager' },
    { icon: 'newspaper-outline', name: 'menu.newsmanager', link: '/manager/system-admin/newsmanager' },

];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //quan ly ke hoach 
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            { //quan ly nguoi benh
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            }
        ]
    },
    { //quan ly phong kham
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.doctor.manage-clinic', link: '/room'
            }
        ]
    },
    { //quan ly cam nang (bai dang)
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            }
        ]
    },
];