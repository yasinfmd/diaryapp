export const menu = [
    {
        id: 1,
        text: "Profilim",
        to: "/profile",
        icon: "fa fa-user text-primary"
    },
    {
        id: 2,
        text: "Günlüklerim",
        to: "/my-diar",
        icon: "fa fa-calendar text-success"
    },
    {
        id: 3,
        text: "Parola Değiştir",
        to: "/change-password",
        icon: "fa fa-lock text-warning"
    },
    {
        id: 4,
        text: "Çıkış Yap",
        to: "/",
        icon: "fa fa-times text-danger"
    },

]

export const adminmenu=[
    {
        id:1,
        text:"Günlükler",
        to:"/admin-dashboard",
        icon: "fa fa-book text-primary"
    }
]

export const sidemenu = [
        {
            id: 1,
            text: "AnaSayfa",
            to: "/",
            icon: "fa fa-home text-primary"
        },
        {
            id: 2,
            text: "Günlüklerim",
            to: "/my-diar",
            icon: "fa fa-calendar text-success"
        },
        {
            id: 3,
            text: "Günlük Yaz",
            to: "/create-diar",
            icon: "fa fa-lock text-warning"
        },
]
