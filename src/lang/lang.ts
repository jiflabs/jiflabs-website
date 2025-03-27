export type LangRegistry = {
    [key: string]: LangDefinition,
}

export type LangDefinition = {
    label: string,
    warning: string,
    page: {
        home: {
            title: string,
            description: string,
        },
        about: {
            title: string,
            description: string,
        },
        blog: {
            title: string,
            description: string,
            by: string,
            subtitle: string,
            readmore: string,
        },
        login: {
            title: string,
            description: string,
        },
        imprint: {
            title: string,
            description: string,
        },
        privacy: {
            title: string,
            description: string,
        },
        editor: {
            title: string,
            description: string,
        }
    },
    footer: {
        essentials: string,
    }
}

export const Strings: LangRegistry = {
    "de": {
        label: "Deutsch",
        warning: "Diese Seite ist noch in aktiver Entwicklung - Wichtige Informationen wie Datenschutz und Impressum sind unter Umständen noch nicht vollständing!",
        page: {
            home: {
                title: "Startseite",
                description: "TODO",
            },
            blog: {
                title: "Blog",
                description: "TODO",
                by: "von",
                subtitle: "Projekte, Gedanken und Informationen",
                readmore: "Weiterlesen",
            },
            about: {
                title: "Über JIF",
                description: "TODO",
            },
            imprint: {
                title: "Impressum",
                description: "TODO",
            },
            privacy: {
                title: "Datenschutzerklärung",
                description: "TODO",
            },
            login: {
                title: "Login",
                description: "TODO",
            },
            editor: {
                title: "Markdown-Editor",
                description: "TODO",
            },
        },
        footer: {
            essentials: "Essenziell",
        },
    },
    "en": {
        label: "English",
        warning: "This website is still active work in progress - some information like privacy and imprint are maybe incomplete!",
        page: {
            imprint: {
                title: "Imprint",
                description: "TODO",
            },
            privacy: {
                title: "Privacy",
                description: "TODO",
            },
            about: {
                title: "About JIF",
                description: "TODO",
            },
            blog: {
                title: "Blog",
                description: "TODO",
                by: "by",
                subtitle: "Projects, thoughts and information",
                readmore: "Read more",
            },
            login: {
                title: "Login",
                description: "TODO",
            },
            home: {
                title: "Home",
                description: "TODO",
            },
            editor: {
                title: "Markdown Editor",
                description: "TODO",
            },
        },
        footer: {
            essentials: "Essential",
        },
    },
};

export const DefaultStrings = Strings[navigator.language.slice(0, 2)];
