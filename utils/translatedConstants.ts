export const getYearsOfProduction = (t: (key: string) => string) => [
    { title: t('filters.year'), value: "" },
    { title: "2025", value: "2025" },
    { title: "2024", value: "2024" },
    { title: "2023", value: "2023" },
    { title: "2022", value: "2022" },
    { title: "2021", value: "2021" },
    { title: "2020", value: "2020" },
    { title: "2019", value: "2019" },
    { title: "2018", value: "2018" },
    { title: "2017", value: "2017" },
    { title: "2016", value: "2016" },
    { title: "2015", value: "2015" },
    { title: "2014", value: "2014" },
    { title: "2013", value: "2013" },
    { title: "2012", value: "2012" },
    { title: "2011", value: "2011" },
    { title: "2010", value: "2010" },
    { title: "2009", value: "2009" },
    { title: "2008", value: "2008" },
    { title: "2007", value: "2007" },
    { title: "2006", value: "2006" },
    { title: "2005", value: "2005" },
    { title: "2004", value: "2004" },
    { title: "2003", value: "2003" },
    { title: "2002", value: "2002" },
];

export const getFuels = (t: (key: string) => string) => [
    {
        title: t('filters.fuel'),
        value: "",
    },
    {
        title: t('filters.gas'),
        value: "Gas",
    },
    {
        title: t('filters.electricity'),
        value: "Electricity",
    },
];

export const getFooterLinks = (t: (key: string) => string) => [
    {
        title: t('footer.about'),
        links: [
            { title: t('footer.howItWorks'), url: "/" },
            { title: t('footer.featured'), url: "/" },
            { title: t('footer.partnership'), url: "/" },
            { title: t('footer.businessRelation'), url: "/" },
        ],
    },
    {
        title: t('footer.company'),
        links: [
            { title: t('footer.events'), url: "/" },
            { title: t('footer.blog'), url: "/" },
            { title: t('footer.podcast'), url: "/" },
            { title: t('footer.inviteAFriend'), url: "/" },
        ],
    },
    {
        title: t('footer.socials'),
        links: [
            { title: "Discord", url: "/" },
            { title: "Instagram", url: "/" },
            { title: "Twitter", url: "/" },
            { title: "Facebook", url: "/" },
        ],
    },
]; 